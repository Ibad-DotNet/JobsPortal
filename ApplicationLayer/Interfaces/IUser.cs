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
        public Task<ResponseVM> Login(LoginUserRequest user);
        public Task<ResponseVM> AddRecuriter(AddUserRequest user);
    }
}
