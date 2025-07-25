using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobsPortal.Controllers.UserControllers
{
    [Authorize(Policy = "RecuriterOnly")]
    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJob _job;

        public JobController(IJob job)
        {
            _job = job;
        }

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
        [HttpGet("get-all")]
        public async Task<ActionResult<ResponseVM>> GetAllJobs()
        {
            var result = await _job.GetAllJobs();
            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<ResponseVM>> GetJobById(long id)
        {
            var result = await _job.GetJobById(id);
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<ActionResult<ResponseVM>> UpdateJob(  UpdateJobRequest request)
        {
            var result = await _job.UpdateJob(request);
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ResponseVM>> DeleteJob(long id)
        {
            var result = await _job.DeleteJob(id);
            return Ok(result);
        }

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
