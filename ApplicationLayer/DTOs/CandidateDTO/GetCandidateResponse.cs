using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.CandidateDTO
{
    public class GetCandidateResponse
    {
        public long Id { get; set; }
        public long JobId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ResumeURL { get; set; } = string.Empty;
        public string InterviewStage { get; set; } = "";
        public bool IsActive { get; set; }
    }
}
