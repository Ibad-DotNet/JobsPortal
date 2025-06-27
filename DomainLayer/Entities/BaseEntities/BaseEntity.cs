using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities.BaseEntities
{
    public class BaseEntity
    {
        public string AddedBy { get; set; } = "";
        public  DateTime AddedDate { get; set; }= DateTime.Now;
        public string UpdatedBy { get; set; } = "";
        public DateTime UpdatedDate { get; set;} = DateTime.Now;
    }
}
