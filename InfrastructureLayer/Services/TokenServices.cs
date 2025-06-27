using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace InfrastructureLayer.Services
{
    public class TokenServices
    {

        private readonly IHttpContextAccessor _contextAccessor;
        public string UserEmail { get; set; } = "";
        public string Role { get; set; } = "";
        public string UserName { get; set; } = "";

        public TokenServices(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
            if (_contextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                if (_contextAccessor.HttpContext.User.Identity is ClaimsIdentity identity)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    if (claims.Any())
                    {
                        UserEmail = identity.FindFirst(ClaimTypes.Email)?.Value ?? "";
                        Role = identity.FindFirst(ClaimTypes.Role)?.Value ?? "";
                        UserName = identity.FindFirst("userName")?.Value ?? "";

                    }


                }
            }
        }
    }
}
