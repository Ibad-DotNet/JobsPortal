using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;
using ApplicationLayer.Interfaces;
using DomainLayer.Entities.JobEntities;
using DomainLayer.Enums;
using InfrastructureLayer.Context;
using Microsoft.EntityFrameworkCore;

namespace InfrastructureLayer.Services
{
    public class JobServices:IJob
    {
        private readonly AppDbContext _context;

        public JobServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseVM> AddJob(AddJobRequest request)
        {
            var job = new JobEntity
            {
                JobName = request.JobName,
                JobDescription = request.JobDescription,
                JobResponsibilities = request.JobResponsibilities,
                JobQualifications = request.JobQualifications,
                MinimumSalary = request.MinimumSalary,
                MaximumSalary = request.MaximumSalary,
                InterviewStages = request.InterviewStages,
                StartDate = request.StartDate,
                LastDate = request.LastDate,
                IsActive = true,
                IsDeleted = false,
                AddedDate = DateTime.UtcNow
            };

            await _context.JobEntity.AddAsync(job);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = ResponseValues.Saved
            };
        }

        public async Task<ResponseVM> GetAllJobs()
        {
            var jobs = await _context.JobEntity
                .Where(j => !j.IsDeleted)
                .ToListAsync();

            var response = jobs.Select(job => new GetJobResponse
            {
                Id = job.Id,
                JobName = job.JobName,
                JobDescription = job.JobDescription,
                MinimumSalary = job.MinimumSalary,
                MaximumSalary = job.MaximumSalary,
                IsActive = job.IsActive
            });

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Data = response,
                Message = ResponseValues.Success
            };
        }

        public async Task<ResponseVM> GetJobById(long id)
        {
            var job = await _context.JobEntity.FindAsync(id);

            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = ResponseValues.NotFound
                };
            }

            var response = new GetJobResponse
            {
                Id = job.Id,
                JobName = job.JobName,
                JobDescription = job.JobDescription,
                MinimumSalary = job.MinimumSalary,
                MaximumSalary = job.MaximumSalary,
                IsActive = job.IsActive
            };

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Data = response,
                Message = ResponseValues.Success
            };
        }

        public async Task<ResponseVM> UpdateJob(UpdateJobRequest request)
        {
            var job = await _context.JobEntity.FindAsync(request.Id);

            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = ResponseValues.NotFound
                };
            }

            job.JobName = request.JobName;
            job.JobDescription = request.JobDescription;
            job.JobResponsibilities = request.JobResponsibilities;
            job.JobQualifications = request.JobQualifications;
            job.MinimumSalary = request.MinimumSalary;
            job.MaximumSalary = request.MaximumSalary;
            job.InterviewStages = request.InterviewStages;
            job.StartDate = request.StartDate;
            job.LastDate = request.LastDate;

            _context.JobEntity.Update(job);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = ResponseValues.Updated
            };
        }

        public async Task<ResponseVM> DeleteJob(long id)
        {
            var job = await _context.JobEntity.FindAsync(id);

            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = ResponseValues.NotFound
                };
            }

            job.IsDeleted = true;
            _context.JobEntity.Update(job);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = ResponseValues.Deleted
            };
        }

        public async Task<ResponseVM> UpdateJobStatus(UpdateJobStatusRequest request)
        {
            var job = await _context.JobEntity.FindAsync(request.Id);

            if (job == null || job.IsDeleted)
            {
                return new ResponseVM
                {
                    Code = StatusCodeEnum.BadRequest,
                    Message = ResponseValues.NotFound
                };
            }

            job.IsActive = request.IsActive;
            _context.JobEntity.Update(job);
            await _context.SaveChangesAsync();

            return new ResponseVM
            {
                Code = StatusCodeEnum.Success,
                Message = request.IsActive ? ResponseValues.JobActivated : ResponseValues.JobDeactivated
            };
        }
        public async Task<ResponseVM> PatchJobAsync(PatchJobRequest request)
        {
            var response = new ResponseVM();
            var job = await _context.JobEntity.FindAsync(request.Id);

            if (job == null || job.IsDeleted)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.NotFound;
                return response;
            }

            // Apply only non-null changes
            if (!string.IsNullOrWhiteSpace(request.JobName))
                job.JobName = request.JobName;

            if (!string.IsNullOrWhiteSpace(request.JobDescription))
                job.JobDescription = request.JobDescription;

            if (!string.IsNullOrWhiteSpace(request.JobResponsibilities))
                job.JobResponsibilities = request.JobResponsibilities;

            if (!string.IsNullOrWhiteSpace(request.JobQualifications))
                job.JobQualifications = request.JobQualifications;

            if (request.MinimumSalary.HasValue)
                job.MinimumSalary = request.MinimumSalary.Value;

            if (request.MaximumSalary.HasValue)
                job.MaximumSalary = request.MaximumSalary.Value;

            if (request.InterviewStages.HasValue)
                job.InterviewStages = request.InterviewStages.Value;

            if (request.StartDate.HasValue)
                job.StartDate = request.StartDate.Value;

            if (request.LastDate.HasValue)
                job.LastDate = request.LastDate.Value;

            _context.JobEntity.Update(job);
            await _context.SaveChangesAsync();

            response.Code = StatusCodeEnum.Success;
            response.Message = ResponseValues.PartialUpdate;
            return response;
        }
    }
}
