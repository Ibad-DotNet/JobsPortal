using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities.JobEntities;
using DomainLayer.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;

namespace InfrastructureLayer.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<UserEntity> UserEntity { get; set; }
        public DbSet<JobEntity> JobEntity { get; set; }

    }
}
