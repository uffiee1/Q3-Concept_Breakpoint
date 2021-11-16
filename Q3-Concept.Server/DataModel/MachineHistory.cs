using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MachineHistory
    {
        public string Name { get; set; }

        public DateTime StarDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Port { get; set; }

        public int Board { get; set; }
    }
}
