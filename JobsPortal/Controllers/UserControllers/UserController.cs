using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.UserDTOs;
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

        [Authorize(Policy = "AdminPolicy")]
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

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("get-all")]
        public async Task<ActionResult<ResponseVM>> GetAllUsers()
        {
            var result = await _user.GetAllUsers();
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("get/{id}")]
        public async Task<ActionResult<ResponseVM>> GetUserById(int id)
        {
            var result = await _user.GetUserById(id);
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("update")]
        public async Task<ActionResult<ResponseVM>> UpdateUser(UpdateUserRequest request)
        {
            var result = await _user.UpdateUser(request);
            return Ok(result);
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpPatch("patch")]
        public async Task<ActionResult<ResponseVM>> PatchUser(PatchUserRequest request)
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

        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ResponseVM>> DeleteUser(int id)
        {
            var result = await _user.DeleteUser(id);
            return Ok(result);
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpPatch("update-status")]
        public async Task<ActionResult<ResponseVM>> UpdateUserStatus(UpdateUserStatusRequest request)
        {
            try
            {
                var result = await _user.UpdateUserStatusAsync(request);
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

    }
}
