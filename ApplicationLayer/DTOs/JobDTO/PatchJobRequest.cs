using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.JobDTO
{
    
    public class PatchJobRequest
    {
        public long Id { get; set; }
        public string? JobName { get; set; }
        public string? JobDescription { get; set; }
        public string? JobResponsibilities { get; set; }
        public string? JobQualifications { get; set; }
        public decimal? MinimumSalary { get; set; }
        public decimal? MaximumSalary { get; set; }
        public int? InterviewStages { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? LastDate { get; set; }
    }
}
