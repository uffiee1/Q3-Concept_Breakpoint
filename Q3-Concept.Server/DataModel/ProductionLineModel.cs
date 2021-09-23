﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class ProductionLineModel
    {
        public int ID { get; set; }
        public int Name { get; set; }
        public string Side { get; set; }
        public int Board { get; set; }
        public int port { get; set; }
        public List<MachineModel> machines { get; set; }
        public List<ProductionDataModel> ProductionData { get; set; }

    }
}