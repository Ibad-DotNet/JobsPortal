using ApplicationLayer.DTOs.CandidateDTO;
using ApplicationLayer.DTOs.CommonDTOs;

namespace ApplicationLayer.Interfaces
{
    public interface ICandidate
    {
        Task<ResponseVM> AddCandidate(AddCandidateRequest request);
        Task<ResponseVM> GetAllCandidates(long jobId);
        Task<ResponseVM> GetCandidateById(long id);
        Task<ResponseVM> UpdateCandidate(UpdateCandidateRequest request);
        Task<ResponseVM> DeleteCandidate(long id);
        Task<ResponseVM> PatchCandidateAsync(PatchCandidateRequest request);
        Task<ResponseVM> PromoteCandidateStage(long candidateId);
        Task<ResponseVM> RejectCandidateAsync(RejectCandidateRequest request);
    }
}
