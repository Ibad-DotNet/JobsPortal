using ApplicationLayer.DTOs.CommonVMs;
using ApplicationLayer.DTOs.UserVM;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobsPortal.Controllers.UserControllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        public UserController(IUser user)
        {
            _user = user;
        }
        [HttpPost("login")]
        public async Task<ActionResult<ResponseVM>> Login(LoginUserRequest user)
        {
            try
            {
                var result = await _user.Login(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        [Authorize]
        [HttpPost("add-recuriter")]
        public async Task<ActionResult<ResponseVM>> AddRecurietr(AddUserRequest request)
        {
            try
            {
                var result = await _user.AddRecuriter(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
