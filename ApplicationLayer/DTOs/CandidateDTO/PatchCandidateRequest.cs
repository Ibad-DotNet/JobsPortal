using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.CandidateDTO
{
    public class PatchCandidateRequest
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? ResumeBase64 { get; set; }
        public int? InterviewStage { get; set; }
    }
}
