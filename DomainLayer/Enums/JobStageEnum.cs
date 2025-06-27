using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.JobEntities;

namespace DomainLayer.Enums
{
    public static class JobStageEnum
    {
        public static int Screening = 1;
        public static int TechnicalInterview = 2;
        public static int FinalCall = 3;
        public static List<JobStages> Stages { get; } = new List<JobStages>
        {
            new JobStages(1, "Screening"),
            new JobStages(2, "TechnicalInterview"),
            new JobStages(3, "FinalCall")
        };
    }
}
