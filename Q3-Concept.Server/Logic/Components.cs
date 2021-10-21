using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    public class Components
    {
        public List<Model.ComponentDataModel> GetComponents()
        {
            DAL.Components comp = new DAL.Components();
            return comp.GetComponents();
        }

        public List<Model.ComponentDataModel> GetComponents(int port, int board)
        {
            DAL.Components comp = new DAL.Components();
            return comp.GetComponents(port, board);
        }

        public List<Model.MachineHistory> GetMachineHistory(int id)
        {
            DAL.Components comp = new DAL.Components();
            return comp.GetComHistory(id);
        }
    }
}
