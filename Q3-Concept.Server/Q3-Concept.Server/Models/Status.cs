using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Q3_Concept.Server.Models
{
    public class Status
    {
        public DateTime StartDateTime { get; set; }

        public DateTime EndDate__Time { get; set; }

        public string Description { get; set; }

        public double Duration { get; set; }
    }
}
