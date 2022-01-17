using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Logic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Q3_Concept.Server.Models;

namespace Q3_Concept.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComponentController : ControllerBase
    {
        private DAL.Components _dalComponenet = new DAL.Components();
        private DAL.Maintenance _dalMaintenance = new Maintenance();
        private MaintenanceLogic _mainLogic = new MaintenanceLogic();
        private MaintenanceHistory _dalMaintenanceHistory = new MaintenanceHistory();

        [HttpGet]
        [Route("Component")]
        public IEnumerable<Component> GetSelection(int port, int board)
        {
            List<ComponentDataModel> componentDalList = _dalComponenet.GetComponentsInProductionLine(port, board, false);
            List<Component> componentList = new List<Component>();

            foreach (ComponentDataModel component in componentDalList)
            {
                componentList.Add(
                    new Component()
                    {
                        Name = component.Name,
                        Id = component.ID,
                        Description = component.Description,
                        MachineHistory = _dalComponenet.GetComHistory(component.ID)
                    }
                );
            }

            return componentList;
        }

        [HttpGet]
        [Route("Component/id")]
        public Component GetSelection(int id) // fix dit ooit - nick
        {
            List<ComponentDataModel> componentDalList = _dalComponenet.GetComponentsInProductionLine(id);
            List<Component> componentList = new List<Component>();

            foreach (ComponentDataModel component in componentDalList)
            {
                componentList.Add(
                    new Component()
                    {
                        Name = component.Name,
                        Id = component.ID,
                        Description = component.Description,
                        MachineHistory = _dalComponenet.GetComHistory(component.ID)
                    }
                );
            }

            return componentList[0];
        }

        [HttpGet]
        [Route("ComponentsAll")]
        public IEnumerable<Component> GetAll()
        {
            return ConvertComponent(_dalComponenet.GetComponents());
        }

        private List<Component> ConvertComponent(List<ComponentDataModel> componentDalList)
        {
            List<Component> componentList = new List<Component>();

            foreach (ComponentDataModel component in componentDalList)
            {
                Component comp = new Component()
                {
                    Name = component.Name,
                    Id = component.ID,
                    Description = component.Description,
                    Actions = _dalComponenet.GetActions(component.ID),
                    MachineHistory = _dalComponenet.GetComHistory(component.ID),
                    MaintenanceNeeded = _mainLogic.CheckWarning(component.ID),
                    MaintenanceNote = _dalMaintenance.GetMaintenance(component.ID).Notes,
                    MaxActions = _dalMaintenance.GetMaintenance(component.ID).Warning,
                    MaintenanceHistory = _dalMaintenanceHistory.GetmaintenancehistoryFromComponent(component.ID)
                };

                try
                {
                    comp.Percentage = Math.Round(Decimal.Divide((decimal)comp.Actions , (decimal)comp.MaxActions) * 100, 2);
                }
                catch
                {
                    comp.Percentage = -1;
                }

                componentList.Add(comp);
            }

            return componentList;
        }
    }
}
