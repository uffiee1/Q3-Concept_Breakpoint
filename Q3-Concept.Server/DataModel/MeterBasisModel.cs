using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MeterBasisModel
    {
        public int ID { get; set; }

        public int value { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int option { get; set; }

        public bool Active { get; set; }

        public double MaxValue { get; set; }

        public List<CounterReadingModel> meters { get; set; }
    }
}
