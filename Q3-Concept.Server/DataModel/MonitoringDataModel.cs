﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MonitoringDataModel
    {
        public int Id { get; set; }
        public DateTime TimeStamp { get; set; }
        public double ShortTime { get; set; }
        public StatusModel Status { get; set; }
    }
}
