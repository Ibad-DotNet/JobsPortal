using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.BaseEntities;

namespace DomainLayer.Entities.CandidateEntities
{
    public class CandidateEntity:BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [ForeignKey("JobEntity")]
        public long JobId { get; set; }
        [MaxLength(300)]
        public string Name { get; set; } = "";
        [MaxLength(2500)]
        public string Email { get; set; } = "";
        public int InterviewStage = 1;
        [MaxLength(2500)]
        public string ResumeURL { get; set; } = "";
        public bool IsRejected { get; set; } = false;
        [MaxLength(1500)]
        public string ReasonForRejection { get; set; } = "";

    }
}
