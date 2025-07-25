using ApplicationLayer.DTOs.CandidateDTO;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobsPortal.Controllers.UserControllers
{
    [Route("api/candidate")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidate _candidate;

        public CandidateController(ICandidate candidate)
        {
            _candidate = candidate;
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPost("add")]
        public async Task<ActionResult<ResponseVM>> AddCandidate(AddCandidateRequest request)
        {
            try
            {
                var result = await _candidate.AddCandidate(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM { Message = "Internal Server Error" });
            }
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpGet("get-all/{jobId}")]
        public async Task<ActionResult<ResponseVM>> GetAllCandidates(long jobId)
        {
            var result = await _candidate.GetAllCandidates(jobId);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpGet("get/{id}")]
        public async Task<ActionResult<ResponseVM>> GetCandidateById(long id)
        {
            var result = await _candidate.GetCandidateById(id);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPut("update")]
        public async Task<ActionResult<ResponseVM>> UpdateCandidate(UpdateCandidateRequest request)
        {
            var result = await _candidate.UpdateCandidate(request);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ResponseVM>> DeleteCandidate(long id)
        {
            var result = await _candidate.DeleteCandidate(id);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPatch("patch")]
        public async Task<ActionResult<ResponseVM>> PatchCandidate(PatchCandidateRequest request)
        {
            try
            {
                var result = await _candidate.PatchCandidateAsync(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM { Message = "Internal Server Error" });
            }
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPatch("promote/{candidateId}")]
        public async Task<ActionResult<ResponseVM>> PromoteCandidate(long candidateId)
        {
            var result = await _candidate.PromoteCandidateStage(candidateId);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPatch("reject")]
        public async Task<ActionResult<ResponseVM>> RejectCandidate(RejectCandidateRequest request)
        {
            var result = await _candidate.RejectCandidateAsync(request);
            return Ok(result);
        }
    }
}
