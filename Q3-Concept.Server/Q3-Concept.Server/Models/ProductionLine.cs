using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Q3_Concept.Server.Models
{
    public class ProductionLine
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Side { get; set; }

        public Model.StatusModel[] Statuses { get; set; }

        public Component[] Components { get; set; }

        public Component[] ComponentHistory { get; set; }

        public Machine[] Machines { get; set; }
    }
}
