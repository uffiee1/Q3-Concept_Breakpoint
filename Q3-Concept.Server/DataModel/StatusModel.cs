using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class StatusModel
    {
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime End__Time { get; set; }
        public double Duration { get; set; }
        public int Entries { get; set; }
    }
}
