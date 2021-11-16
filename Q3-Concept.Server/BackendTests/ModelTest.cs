using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BackendTests
{
    public class ModelTest 
    {
        [Fact]
        public void TestModels()
        {
            ComponentDataModel cdm = new ComponentDataModel()
            {
                ID = 1,
                Name = "potato",
                Description = "tomato",
                meters = new List<CounterReadingModel>()
            };
            int i = cdm.ID;
            string j= cdm.Name;
            string k = cdm.Description;
            List<CounterReadingModel> m = cdm.meters;

            new CounterReadingModel();
            new MachineHistory();
            new MachineModel();
            new MeterBasisModel();
            new MonitoringDataModel();
            new ProductionDataModel();
            new ProductionLineModel();
            new StatusModel();
        }
    }
}
