using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
   public class ComponentDataModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<MeterRegristrationModel> meters { get; set; }
    }
}
