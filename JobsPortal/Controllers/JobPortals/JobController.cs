using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobsPortal.Controllers.JobPortals
{
    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJob _job;

        public JobController(IJob job)
        {
            _job = job;
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPost("add")]
        public async Task<ActionResult<ResponseVM>> AddJob(  AddJobRequest request)
        {
            try
            {
                var result = await _job.AddJob(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpGet("get-all")]
        public async Task<ActionResult<ResponseVM>> GetAllJobs()
        {
            var result = await _job.GetAllJobs();
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpGet("get/{id}")]
        public async Task<ActionResult<ResponseVM>> GetJobById(long id)
        {
            var result = await _job.GetJobById(id);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPut("update")]
        public async Task<ActionResult<ResponseVM>> UpdateJob(  UpdateJobRequest request)
        {
            var result = await _job.UpdateJob(request);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ResponseVM>> DeleteJob(long id)
        {
            var result = await _job.DeleteJob(id);
            return Ok(result);
        }

        [Authorize(Policy = "RecuriterOnly")]
        [HttpPatch("update-status")]
        public async Task<ActionResult<ResponseVM>> UpdateJobStatus(  UpdateJobStatusRequest request)
        {
            try
            {
                var result = await _job.UpdateJobStatus(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }
        [Authorize(Policy = "RecuriterOnly")]
        [HttpPatch("patch")]
        public async Task<ActionResult<ResponseVM>> PatchJob(  PatchJobRequest request)
        {
            try
            {
                var result = await _job.PatchJobAsync(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }
    }
}
