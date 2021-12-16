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
        private DAL.Maintenance _dalMaintenance = new DAL.Maintenance();
        private MaintenanceHistory _dalmaintenanceHistory = new MaintenanceHistory();

        public bool CheckWarning(int componentid)
        {
         MaintenanceModel maintenance = _dalMaintenance.GetMaintenance(componentid);
         int actions = _dalComponenet.GetActions(componentid);

         if (maintenance.Warning <= 0)
         {
             return false;
         }
         if (actions >= maintenance.Warning)
            {
                // send email
                // possibly send sms
                // change color of card
                return true;
            }

         return false;
        }

        public void UpdateMaintenance(int treeviewId, int warning, string text, int status)
        {
            MaintenanceModel maintenance = _dalMaintenance.GetMaintenance(treeviewId);
            if (maintenance != null && maintenance.TreeviewId > 0 && status == 2 )
            {
                _dalmaintenanceHistory.InsertMaintenceHistory(treeviewId, text, 2);
                _dalMaintenance.UpdateMaintenance(treeviewId, warning, text, status);
                return;
            }
            if (maintenance != null && maintenance.TreeviewId > 0)
            {
                _dalMaintenance.UpdateMaintenance(treeviewId, warning, text, status);
            }
            else
            {
                _dalMaintenance.InsertMaintenance(treeviewId, warning, text, 0);
            }

            // if (text != null)
            // {
            // }
        }
    }
}
