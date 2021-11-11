using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        [Route("Component")]
        public IEnumerable<Component> GetSelection(int port, int board)
        {
            return ConvertComponent(_dalComponenet.GetComponentsInProductionLine(port, board));
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
                List<MachineHistory> machineHistories = _dalComponenet.GetComHistory(component.ID);
                int totalActions = 0;

                foreach (MachineHistory machineHistory in machineHistories)
                {
                    int machineActions = _dalComponenet.GetActions(machineHistory);
                    machineHistory.Actions = machineActions;
                    totalActions += machineActions;
                }

                componentList.Add(
                    new Component()
                    {
                        Name = component.Name,
                        Id = component.ID,
                        Description = component.Description,
                        Actions = totalActions,
                        MachineHistory = machineHistories
                    }
                );
            }

            return componentList;
        }
    }
}
