using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Model;

namespace Logic
{
    public class MaintenanceLogic
    {
        private DAL.Components _dalComponenet = new DAL.Components();

        public bool CheckWarning(MaintenanceModel maintenance)
        {
            int actions = _dalComponenet.GetActions(maintenance.TreeviewId);

            if (actions >= maintenance.Warning)
            {
                // send email
                // possibly send sms
                // change color of card
                return true;
            }

            return false;
        }
    }
}
