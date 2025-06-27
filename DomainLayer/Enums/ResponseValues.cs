using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Enums
{
    public static class ResponseValues
    {
        public const string Saved = "Record Added";
        public const string Updated = "Record Updated"; 
        public const string Deleted = "Record Deleted";
        public const string InternalServer = "Internal Server Error";
        public const string WrongPasswrod = "Wrong Password";
        public const string UnAuthorized = "Unauthoried user";
        public const string UserAlreadyExist = "User Already Exists with this Email";
        public const string AlreadyExist = "Record Already Exists";
        public const string Error = "Something went wrong";
    }
}
