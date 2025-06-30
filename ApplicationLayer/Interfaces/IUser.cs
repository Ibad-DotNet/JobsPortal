using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonVMs;
using ApplicationLayer.DTOs.UserVM;

namespace ApplicationLayer.Interfaces
{
    public interface IUser
    {
        Task<ResponseVM> Login(LoginUserRequest user);
        Task<ResponseVM> AddRecuriter(AddUserRequest user);
        Task<ResponseVM> GetAllUsers();
        Task<ResponseVM> GetUserById(int id);
        Task<ResponseVM> UpdateUser(UpdateUserRequest request);
        Task<ResponseVM> PatchUserAsync(PatchUserRequest request);
        Task<ResponseVM> DeleteUser(int id);
        Task<ResponseVM> UpdateUserStatusAsync(UpdateUserStatusRequest request);
    }
}
