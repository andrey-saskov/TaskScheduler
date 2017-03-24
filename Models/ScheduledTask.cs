using System;

namespace WebApplicationBasic.Models
{
    public class ScheduledTask
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ScheduledDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
