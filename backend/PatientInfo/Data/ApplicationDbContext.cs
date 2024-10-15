using Microsoft.EntityFrameworkCore;
using PatientInfo.Models;

namespace PatientInfo.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Availability> Availabilities { get; set; }

    }
}
