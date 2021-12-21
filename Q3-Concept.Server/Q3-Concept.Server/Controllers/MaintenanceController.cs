using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
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
        private MaintenanceHistory _dalMaintenanceHistory = new MaintenanceHistory();

        [HttpPatch]
        public void UpdateMaintenance(int treeviewId, int warning, string text, int status)
        {
            _logicMaintenance.UpdateMaintenance(treeviewId, warning, text, status);
        }

        [HttpGet]
        [Route("History")]
        public List<MaintenanceHistoryModel> GetMaintenancehistorys(int treeviewid)
        {
            return _dalMaintenanceHistory.GetmaintenancehistoryFromComponent(treeviewid);
        }

        [HttpGet]
        [Route("MaintenanceAll")]
        public List<Model.MaintenanceModel> GetMaintenances()
        {
            return _dalMaintenance.GetMaintenances();
        }
    }
}
