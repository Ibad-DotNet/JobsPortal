using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.JobDTO
{
    public class UpdateJobRequest:AddJobRequest
    {
        public long Id { get; set; }
    }
}
