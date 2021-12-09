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
        private DAL.Maintenance _dalMaintenance = new DAL.Maintenance();

        [HttpGet]
        public List<MaintenanceModel> GetMaintenances()
        {
            return _dalMaintenance.GetMaintenances();
        }

        [HttpGet]
        public MaintenanceModel GetMaintenance(int componentid)
        {
            return _dalMaintenance.GetMaintenance(componentid);
        }

        [HttpPatch]
        public void UpdateMaintenance(int id, int treeviewId, int warning, string text)
        {
            _dalMaintenance.UpdateMaintenance(id, treeviewId, warning, text);
        }

        [HttpPost]
        public void InsertMaintenance(int treeviewId, int warning, string text)
        {
            _dalMaintenance.InsertMaintenance(treeviewId, warning, text);
        }
    }
}
