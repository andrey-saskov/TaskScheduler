using WebApplicationBasic.Models;
using System;
using System.Linq;

namespace WebApplicationBasic.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ScheduledTaskContext context)
        {
            context.Database.EnsureCreated();

            // Look for any tasks.
            if (context.ScheduledTasks.Any())
            {
                return;   // DB has been seeded
            }

            for (int i = 1; i <= 5000; i++)
            {
                context.ScheduledTasks.Add(
                    new ScheduledTask{Name = "Lorem ipsum " + i, Description = "Tum, Quintus et Pomponius cum idem se velle dixissent, Piso exorsus est.", Priority = i % 100 + 1, CreationDate = DateTime.Now, ScheduledDate = DateTime.Now.AddDays(1), IsActive = i % 3 != 0}
                );
            }
            context.SaveChanges();
        }
    }
}
