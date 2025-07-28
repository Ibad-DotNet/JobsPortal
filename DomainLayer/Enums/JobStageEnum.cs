using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.JobEntities;

namespace DomainLayer.Enums
{
    public static class JobStageEnum
    {
        public static int Screening = 0;
        public static int TechnicalInterview = 1;
        public static int FinalCall = 2;
        public static int Offered = 3;
        public static List<JobStages> Stages { get; } = new List<JobStages>
        {
            new JobStages(0, "Screening"),
            new JobStages(1, "TechnicalInterview"),
            new JobStages(2, "FinalCall"),
            new JobStages(3, "Offered")
        };
    }
}
