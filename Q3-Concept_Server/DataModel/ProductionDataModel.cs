using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ProductionDataModel
    {
        // start date . end date, startt time, endtime,
        // coming from parent productionline board and port
        // check for 2 component maybe connectied
        public int ID { get; set; }

        public ComponentDataModel Component1 { get; set; }

        public ComponentDataModel Component2 { get; set; }

        public List<MonitoringDataModel> MonitoringDatas { get; set; }
    }
}
