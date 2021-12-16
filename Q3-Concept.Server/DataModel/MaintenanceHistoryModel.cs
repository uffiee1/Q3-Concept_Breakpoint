using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MaintenanceHistoryModel
    {
        public int Id { get; set; }

        public int TreeviewId { get; set; }

        public DateTime InsertDate { get; set; }

        public string Notes { get; set; }

        // 1 open, 2 inprogress, 3 closed
        public int Status { get; set; }
    }
}
