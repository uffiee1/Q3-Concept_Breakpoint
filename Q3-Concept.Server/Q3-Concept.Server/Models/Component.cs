﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Q3_Concept.Server.Models
{
    public class Component
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Actions { get; set; }

        public string MaintenanceNote { get; set; }

        public bool MaintenanceNeeded { get; set; }

        public int MaxActions { get; internal set; }

        public List<Model.MachineHistory> MachineHistory { get; set; }

        public List<Model.MaintenanceHistoryModel> MaintenanceHistory { get; set; }

        public decimal Percentage { get; internal set; }
    }
}
