using System;
using System.Collections.Generic;

namespace WebApplicationBasic.Models
{
    public class ScheduledTask
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime ScheduledTime { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
