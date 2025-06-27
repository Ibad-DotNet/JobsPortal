using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities.JobEntities
{
    public class JobStages
    {
        public long Id { get; set; }
        public string Stage { get; set; } = "";
        public JobStages(int id,string satge) 
        {
            Id = id;
            Stage = satge;
        }

    }
}
