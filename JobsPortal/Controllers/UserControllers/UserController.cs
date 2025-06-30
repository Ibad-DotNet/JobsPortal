using ApplicationLayer.DTOs.CommonVMs;
using ApplicationLayer.DTOs.UserVM;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-recuriter")]
        public async Task<ActionResult<ResponseVM>> AddRecurietr(AddUserRequest request)
        {
            try
            {
                var result = await _user.AddRecuriter(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-all")]
        public async Task<ActionResult<ResponseVM>> GetAllUsers()
        {
            var result = await _user.GetAllUsers();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get/{id}")]
        public async Task<ActionResult<ResponseVM>> GetUserById(int id)
        {
            var result = await _user.GetUserById(id);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update")]
        public async Task<ActionResult<ResponseVM>> UpdateUser(UpdateUserRequest request)
        {
            var result = await _user.UpdateUser(request);
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPatch("patch")]
        public async Task<ActionResult<ResponseVM>> PatchUser([FromBody] PatchUserRequest request)
        {
            try
            {
                var result = await _user.PatchUserAsync(request);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResponseVM
                {
                    Message = "Internal Server Error"
                });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ResponseVM>> DeleteUser(int id)
        {
            var result = await _user.DeleteUser(id);
            return Ok(result);
        }
    }
}
