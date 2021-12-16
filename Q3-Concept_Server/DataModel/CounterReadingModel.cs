using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class CounterReadingModel
    {
        public int Id { get; set; }

        public string Value { get; set; }

        public int Total { get; set; }

        public int TreeviewId { get; set; }

        public int TellerbasisId { get; set; }
    }
}
