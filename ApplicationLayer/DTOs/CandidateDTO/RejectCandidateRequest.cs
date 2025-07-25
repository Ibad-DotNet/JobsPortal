using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.CandidateDTO
{
    public class RejectCandidateRequest
    {
        public long Id { get; set; }
        public string ReasonForRejection { get; set; } = "";
    }
}
