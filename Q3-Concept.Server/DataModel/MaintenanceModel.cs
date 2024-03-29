﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MaintenanceModel
    {
        public int Id { get; set; }

        public int TreeviewId { get; set; }

        public int Warning { get; set; }

        public string Notes { get; set; }

        // 1 open, 2 progress, 3 closed
        public int Status { get; set; }

        public string Name { get; set; }
    }
}
