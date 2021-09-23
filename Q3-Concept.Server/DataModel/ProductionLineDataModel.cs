using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class ProductionLineDataModel
    {
        public int ID { get; set; }
        public int Board { get; set; }
        public int port { get; set; }
        public List<MachineDataModel> machines { get; set; }

    }
}
