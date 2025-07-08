using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.UserDTOs
{
    public class LoginUserResponse
    {
        public string Email { set; get; } = "";
        public string FullName { get; set; } = "";
        public string Username { set; get; } = "";
        public string Role { set; get; } = "";
        public string Token { set; get; } = ""; 
    }
}
