using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Enums
{
    public enum StatusCodeEnum
    {
        Success=200,
        BadRequest=400,
        UnAuthorized = 401,
        NotFound=404,
        InternalServerError = 500
    }
}
