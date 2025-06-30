using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.UserVM
{
    public class PatchUserRequest
    {
        public int Id { get; set; } 
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
