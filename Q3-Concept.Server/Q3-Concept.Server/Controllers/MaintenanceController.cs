using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace Q3_Concept.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MaintenanceController : ControllerBase
    {
        private Logic.MaintenanceLogic _logicMaintenance = new Logic.MaintenanceLogic();
        private DAL.Maintenance _dalMaintenance = new DAL.Maintenance();

        [HttpPatch]
        public void UpdateMaintenance(int treeviewId, int warning, string text)
        {
            _logicMaintenance.UpdateMaintenance(treeviewId, warning, text);
        }

        [HttpGet]
        public List<MaintenanceHistoryModel> GetMaintenancehistorys(int treeviewid)
        {
           return _dalMaintenance.Getmaintenancehistory(treeviewid);
        }
    }
}
