using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;

namespace ApplicationLayer.Interfaces
{
    public interface ICompany
    {

        Task<ResponseVM> AddCompany(AddJobRequest request);
        Task<ResponseVM> GetAll();
        Task<ResponseVM> GetCompanyById(long id);
        Task<ResponseVM> UpdateCompany(UpdateJobRequest request);
        Task<ResponseVM> DeleteCompany(long id);
        Task<ResponseVM> UpdateCompanyStatus(UpdateJobStatusRequest request);
        Task<ResponseVM> PatchCompanyAsync(PatchJobRequest request);
    }
}
