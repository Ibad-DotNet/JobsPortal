using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs.CommonVMs;
using ApplicationLayer.DTOs.UserVM;
using ApplicationLayer.Interfaces;
using DomainLayer.Entities.UserEntities;
using DomainLayer.Enums;
using InfrastructureLayer.Context;
using InfrastructureLayer.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace InfrastructureLayer.Services
{
    public class UserServices : IUser
    {
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _configuration;
        private readonly TokenServices _tokenServices;
        public UserServices(AppDbContext appDbContext,IConfiguration configuration,TokenServices token)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
            _tokenServices = token;
        }
        public async  Task<ResponseVM> Login(LoginUserRequest newUser)
        {
            ResponseVM responseVM = new ResponseVM();
            try
            {
                var user = await _appDbContext.UserEntity.FirstOrDefaultAsync(u => u.UserName == newUser.UserName || u.Email == newUser.UserName);
                if (user != null)
                {
                    if (user.Password == newUser.Password)
                    {
                        responseVM.Code = StatusCodeEnum.Success;
                        responseVM.Message = "Logged In successfully";
                        LoginUserResponse loggedUser = new LoginUserResponse();
                        loggedUser.Username = user.UserName;
                        loggedUser.FullName = user.Name;
                        loggedUser.Role = user.Role;
                        loggedUser.Email = user.Email;
                        loggedUser.Token = JWTUtility.GenerateToken(_configuration, user);
                        responseVM.Data = loggedUser;
                    }
                    else
                    {
                        responseVM.Code = StatusCodeEnum.BadRequest;
                        responseVM.Message = "Incorrect Password";
                    }
                }
                else
                {
                    responseVM.Code = StatusCodeEnum.BadRequest;
                    responseVM.Message = "User Not Found with this Email or UserName";
                }
            }
            catch (Exception ex)
            {
                responseVM.Code=StatusCodeEnum.InternalServerError;
                responseVM.Message= ResponseValues.InternalServer + ex.Message;
            }
            return responseVM;
        }
        public async Task<ResponseVM> AddRecuriter(AddUserRequest request)
        {
            ResponseVM responseVM = new ResponseVM();
            if (_tokenServices.Role?.ToLower() == UserRolesValues.Admin.ToLower())
            {
                var existingUser= _appDbContext.UserEntity.FirstOrDefault(u=>u.Email== request.Email);
                if (existingUser == null)
                {
                    UserEntity user = new UserEntity();
                    user.Name = request.Name;
                    user.Email = request.Email;
                    user.Password = request.Password;
                    user.Gender = request.Gender;
                    user.UserName = request.Email.Split('@')[0];
                    user.AddedBy=_tokenServices.UserEmail;
                    user.AddedDate = DateTime.Now;
                    user.Password=BasicUtiltiy.EncryptedPassword(request.Password);
                    await _appDbContext.AddAsync(user);
                    await _appDbContext.SaveChangesAsync();
                    responseVM.Code = StatusCodeEnum.Success;
                    responseVM.Message = ResponseValues.Saved;
                }
                else
                {
                    responseVM.Code = StatusCodeEnum.BadRequest;
                    responseVM.Message = ResponseValues.UserAlreadyExist;
                }
            }
            else
            {
                responseVM.Code = StatusCodeEnum.UnAuthorized;
                responseVM.Message=ResponseValues.UnAuthorized;
            }
                return responseVM;
        }
    }
}
