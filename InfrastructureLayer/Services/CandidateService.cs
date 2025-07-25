using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.Interfaces;
using DomainLayer.Entities.CandidateEntities;
using DomainLayer.Enums;
using InfrastructureLayer.Context;
using Microsoft.EntityFrameworkCore;
using ApplicationLayer.DTOs.CandidateDTO;
using InfrastructureLayer.Utilities;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Azure.Core;

namespace InfrastructureLayer.Services
{
    public class CandidateService : ICandidate
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public CandidateService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<ResponseVM> AddCandidate(AddCandidateRequest request)
        {
            var job = await _context.JobEntity.FindAsync(request.JobId);
            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = "Assigned job not found."
                };
            }
            var candidate = new CandidateEntity();
            candidate.JobId = request.JobId;
            candidate.Name = request.Name;
            candidate.Email = request.Email;
            candidate.InterviewStage = JobStageEnum.Screening;
            candidate.AddedDate = DateTime.UtcNow;
            string fileName = $"{candidate.Name.Replace(" ", "")}.pdf";
            candidate.ResumeURL = await AWS_StorageUtility.UploadBase64PdfAsync(request.ResumeBase64, fileName);
            await _context.CandidateEntity.AddAsync(candidate);
            await _context.SaveChangesAsync();

            return new ResponseVM { Code = StatusCodeEnum.Success, Message = ResponseValues.Saved };
        }

        public async Task<ResponseVM> GetAllCandidates(long jobId)
        {
            var candidates = await _context.CandidateEntity.Where(c => c.JobId == jobId).ToListAsync();

            var result = candidates.Select(c => new GetCandidateResponse
            {
                Id = c.Id,
                JobId = c.JobId,
                Name = c.Name,
                Email = c.Email,
                ResumeURL = c.ResumeURL,
                InterviewStage = JobStageEnum.Stages[c.InterviewStage].Stage,
            });

            return new ResponseVM { Code = StatusCodeEnum.Success, Data = result, Message = ResponseValues.Success };
        }

        public async Task<ResponseVM> GetCandidateById(long id)
        {
            var candidate = await _context.CandidateEntity.FindAsync(id);
            var response = new GetCandidateResponse
            {
                Id = candidate.Id,
                JobId = candidate.JobId,
                Name = candidate.Name,
                Email = candidate.Email,
                ResumeURL = candidate.ResumeURL,
                InterviewStage = JobStageEnum.Stages[candidate.InterviewStage].Stage
            };

            return new ResponseVM { Code = StatusCodeEnum.Success, Data = response, Message = ResponseValues.Success };
        }

        public async Task<ResponseVM> UpdateCandidate(UpdateCandidateRequest request)
        {
            var candidate = await _context.CandidateEntity.FindAsync(request.Id);
            if (await AWS_StorageUtility.DeleteFileAsync($"{candidate.Name.Replace(" ", "")}.pdf"))
                candidate.ResumeURL = await AWS_StorageUtility.UploadBase64PdfAsync(request.ResumeBase64, $"{request.Name.Replace(" ", "")}.pdf");
            else
                return new ResponseVM { Code = StatusCodeEnum.InternalServerError, Message = ResponseValues.InternalServer };
            candidate.Name = request.Name;
            candidate.Email = request.Email;
            _context.CandidateEntity.Update(candidate);
            await _context.SaveChangesAsync();
            return new ResponseVM { Code = StatusCodeEnum.Success, Message = ResponseValues.Updated };
        }

        public async Task<ResponseVM> DeleteCandidate(long id)
        {
            var candidate = await _context.CandidateEntity.FindAsync(id);
            _context.CandidateEntity.Remove(candidate);
            await _context.SaveChangesAsync();
            await AWS_StorageUtility.DeleteFileAsync($"{candidate.Name.Replace(" ", "")}.pdf");
            return new ResponseVM { Code = StatusCodeEnum.Success, Message = ResponseValues.Deleted };
        }

        public async Task<ResponseVM> PatchCandidateAsync(PatchCandidateRequest request)
        {
            var candidate = await _context.CandidateEntity.FindAsync(request.Id);
            string fileName = $"{candidate.Name.Replace(" ", "")}.pdf";
            if (!string.IsNullOrWhiteSpace(request.Name))
                candidate.Name = request.Name;

            if (!string.IsNullOrWhiteSpace(request.Email))
                candidate.Email = request.Email;

            if (!string.IsNullOrWhiteSpace(request.ResumeBase64))
            {
                if (await AWS_StorageUtility.DeleteFileAsync(fileName))
                    candidate.ResumeURL = await AWS_StorageUtility.UploadBase64PdfAsync(request.ResumeBase64, $"{candidate.Name.Replace(" ", "")}.pdf");
                else
                    return new ResponseVM { Code = StatusCodeEnum.InternalServerError, Message = ResponseValues.InternalServer };
            }
            if (request.InterviewStage.HasValue)
                candidate.InterviewStage = request.InterviewStage.Value;

            _context.CandidateEntity.Update(candidate);
            await _context.SaveChangesAsync();

            return new ResponseVM { Code = StatusCodeEnum.Success, Message = ResponseValues.PartialUpdate };
        }

        public async Task<ResponseVM> PromoteCandidateStage(long candidateId)
        {
            var candidate = await _context.CandidateEntity.FindAsync(candidateId);
            var job = await _context.JobEntity.FindAsync(candidate.JobId);

            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = "Assigned job not found."
                };
            }

            if (candidate.InterviewStage < job.InterviewStages)
            {
                candidate.InterviewStage += 1;
            }
            else
            {
                candidate.InterviewStage = 4;
            }
            _context.CandidateEntity.Update(candidate);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = $"Candidate promoted to stage {JobStageEnum.Stages[candidate.InterviewStage]}."
            };
        }
        public async Task<ResponseVM> RejectCandidateAsync(RejectCandidateRequest request)
        {
            var candidate = await _context.CandidateEntity.FindAsync(request.Id);

            if (candidate == null)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.NotFound,
                    Message = "Candidate not found."
                };
            }

            if (candidate.IsRejected)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = "Candidate is already rejected."
                };
            }

            candidate.IsRejected = true;
            candidate.ReasonForRejection = request.ReasonForRejection;
            _context.CandidateEntity.Update(candidate);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = "Candidate rejected successfully."
            };
        }


    }
}
