using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Enums;

namespace ApplicationLayer.DTOs.CommonDTOs
{
    public class ResponseVM
    {
        public StatusCodeEnum Code { get; set; }
        public string Message { get; set; } = "";
        public dynamic? Data { get; set; } 
    }
}
