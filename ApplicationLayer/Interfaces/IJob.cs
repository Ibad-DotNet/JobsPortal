using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;

namespace ApplicationLayer.Interfaces
{
    public interface IJob
    {
        Task<ResponseVM> AddJob(AddJobRequest request);
        Task<ResponseVM> GetAllJobs();
        Task<ResponseVM> GetJobById(long id);
        Task<ResponseVM> UpdateJob(UpdateJobRequest request);
        Task<ResponseVM> DeleteJob(long id);
        Task<ResponseVM> UpdateJobStatus(UpdateJobStatusRequest request);
        Task<ResponseVM> PatchJobAsync(PatchJobRequest request);

    }
}
