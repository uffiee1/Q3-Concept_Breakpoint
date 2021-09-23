using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
   public class ComponentDataModel
    {
        public int ID { get; set; }
        public int Name { get; set; }
        public int Description { get; set; }
        public List<MeterRegristrationModel> meters { get; set; }
    }
}
