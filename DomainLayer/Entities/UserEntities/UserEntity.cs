using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.BaseEntities;

namespace DomainLayer.Entities.UserEntities
{
    public class UserEntity:BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [MaxLength(300)]
        public string Name { get; set; } = "";
        [MaxLength(300)]
        public string UserName { get; set; } = "";
        [MaxLength(1300)]
        public string Email { get; set; } = "";
        [MaxLength(30)]
        public string Gender { get; set; } = "";

        [MaxLength(300)]
        public string Password { get; set; } = "P@ssw0rd";
        [MaxLength(100)]
        public string Role { get; set; } = "Recruiter";
        public bool IsActive { get; set; }=true;
    }
}
