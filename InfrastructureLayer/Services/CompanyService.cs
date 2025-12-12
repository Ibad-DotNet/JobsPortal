using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.JobDTO;
using ApplicationLayer.Interfaces;

namespace InfrastructureLayer.Services
{
    public class CompanyService : ICompany
    {
        public Task<ResponseVM> AddCompany(AddJobRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> DeleteCompany(long id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> GetCompanyById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> PatchCompanyAsync(PatchJobRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> UpdateCompany(UpdateJobRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseVM> UpdateCompanyStatus(UpdateJobStatusRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
