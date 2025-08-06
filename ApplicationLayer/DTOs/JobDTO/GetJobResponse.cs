using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.JobDTO
{
    public class GetJobResponse
    {
        public long Id { get; set; }
        public string JobName { get; set; } = "";
        public string JobDescription { get; set; } = "";
        public string InterviewStage { get; set; } = "";
        public bool IsActive { get; set; }
        public decimal MinimumSalary { get; set; }
        public decimal MaximumSalary { get; set; }
    }
}
