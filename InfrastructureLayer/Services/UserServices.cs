using ApplicationLayer.DTOs.CommonDTOs;
using ApplicationLayer.DTOs.UserDTOs;
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
                var user = await _appDbContext.UserEntity.FirstOrDefaultAsync(u =>u.IsActive && (u.UserName == newUser.UserName || u.Email == newUser.UserName));
                if (user != null)
                {
                    if ( BasicUtiltiy.VerifyPassword( newUser.Password, user.Password))
                    {
                        responseVM.Code = StatusCodeEnum.Success;
                        responseVM.Message = ResponseValues.LoginSuccess;
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
                        responseVM.Message = ResponseValues.WrongPassword;
                    }
                }
                else
                {
                    responseVM.Code = StatusCodeEnum.BadRequest;
                    responseVM.Message = ResponseValues.UserNotFound;
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
        public async Task<ResponseVM> GetAllUsers()
        {
            var response = new ResponseVM();
            var users = await _appDbContext.UserEntity.Where(u=>u.Role!="Admin").ToListAsync();
            response.Code = StatusCodeEnum.Success;
            response.Data = users.Select(u => new GetUserResponse
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Gender = u.Gender,
                Role = u.Role,
                UserName = u.UserName,
                IsActive = u.IsActive,
            }).ToList();
            response.Message = ResponseValues.Success;
            return response;
        }
        public async Task<ResponseVM> GetAllUsersCount()
        {
            var response = new ResponseVM();
            var users = await _appDbContext.UserEntity.Where(u => u.Role != "Admin").ToListAsync();
            response.Code = StatusCodeEnum.Success;
            response.Data = new
            {
                Total = users.Count(),
                Active=users.Where(u=>u.IsActive).Count()
            };
            response.Message = ResponseValues.Success;
            return response;
        }

        public async Task<ResponseVM> GetUserById(long id)
        {
            var response = new ResponseVM();
            var user = await _appDbContext.UserEntity.FindAsync(id);
            if (user == null)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.UserNotFound;
                return response;
            }
            response.Code = StatusCodeEnum.Success;
            response.Data = new GetUserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Gender = user.Gender,
                Role = user.Role,
                UserName = user.UserName
            };
            response.Message = ResponseValues.Success;
            return response;
        }

        public async Task<ResponseVM> UpdateUser(UpdateUserRequest request)
        {
            var response = new ResponseVM();
            var user = await _appDbContext.UserEntity.FindAsync(request.Id);
            if (user == null)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.DataNotFound;
                return response;
            }

            user.Name = request.Name ?? user.Name;
            user.Gender = request.Gender ?? user.Gender;
            if (!string.IsNullOrWhiteSpace(request.Password))
            {
                user.Password = BasicUtiltiy.EncryptedPassword(request.Password);
            }

            _appDbContext.UserEntity.Update(user);
            await _appDbContext.SaveChangesAsync();

            response.Code = StatusCodeEnum.Success;
            response.Message = ResponseValues.Updated;
            return response;
        }
        public async Task<ResponseVM> PatchUserAsync(PatchUserRequest request)
        {
            var response = new ResponseVM();

            var user = await _appDbContext.UserEntity.FindAsync(request.Id);
            if (user == null)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.UserNotFound;
                return response;
            }

            if (!string.IsNullOrWhiteSpace(request.Name))
                user.Name = request.Name;

            if (!string.IsNullOrWhiteSpace(request.Gender))
                user.Gender = request.Gender;

            if (!string.IsNullOrWhiteSpace(request.Password))
                user.Password = BasicUtiltiy.EncryptedPassword(request.Password);

            if (!string.IsNullOrWhiteSpace(request.Role))
                user.Role = request.Role;

            _appDbContext.UserEntity.Update(user);
            await _appDbContext.SaveChangesAsync();

            response.Code = StatusCodeEnum.Success;
            response.Message = ResponseValues.Updated;
            return response;
        }


        public async Task<ResponseVM> DeleteUser(long id)
        {
            var response = new ResponseVM();
            var user = await _appDbContext.UserEntity.FindAsync(id);
            if (user == null)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.UserNotFound;
                return response;
            }

            _appDbContext.UserEntity.Remove(user);
            await _appDbContext.SaveChangesAsync();

            response.Code = StatusCodeEnum.Success;
            response.Message = ResponseValues.Deleted;
            return response;
        }
        public async Task<ResponseVM> UpdateUserStatusAsync(UpdateUserStatusRequest request)
        {
            var response = new ResponseVM();
            var user = await _appDbContext.UserEntity.FindAsync(request.Id);

            if (user == null)
            {
                response.Code = StatusCodeEnum.BadRequest;
                response.Message = ResponseValues.UserNotFound;
                return response;
            }

            user.IsActive = request.IsActive;
            _appDbContext.UserEntity.Update(user);
            await _appDbContext.SaveChangesAsync();

            response.Code = StatusCodeEnum.Success;
            response.Message = request.IsActive ? ResponseValues.UserActivated : ResponseValues.UserDeactivated;
            return response;
        }
    }
}
