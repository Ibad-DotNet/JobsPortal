using MediatR;
using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.JobDTO;

namespace ApplicationLayer.Queries
{
    public class GetJobsByCompanyQuery : IRequest<IEnumerable<GetJobResponse>>
    {
        public int CompanyId { get; set; }

        public GetJobsByCompanyQuery(int companyId)
        {
            CompanyId = companyId;
        }
    }
}