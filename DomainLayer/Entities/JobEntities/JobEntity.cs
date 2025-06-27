using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.BaseEntities;

namespace DomainLayer.Entities.JobEntities
{
    public class JobEntity:BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [MaxLength(300)]
        public string JobName { get; set; } = "";
        public string JobDescription { get; set; } = "";
        public string JobResponsibilities { get; set; } = "";
        public string JobQualifications { get; set; } = "";
        public decimal MinimumSalary { get; set; } 
        public decimal MaximumSalary { get; set; }
        public int InterviewStages = 0;
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime StartDate { get; set; }
        public DateTime LastDate { get; set; }

    }
}
