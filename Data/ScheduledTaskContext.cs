using WebApplicationBasic.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplicationBasic.Data
{
    public class ScheduledTaskContext : DbContext
    {
        public ScheduledTaskContext(DbContextOptions<ScheduledTaskContext> options) : base(options)
        {
        }

        public DbSet<ScheduledTask> ScheduledTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScheduledTask>().ToTable("ScheduledTask");
        }
    }
}