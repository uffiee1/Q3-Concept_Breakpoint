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
            List<ComponentDataModel> componentDalList = _dalComponenet.GetComponentsInProductionLine(port, board);
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
        [Route("ComponentsAll")]
        public IEnumerable<Component> GetAll()
        {
            List<ComponentDataModel> componentDalList = _dalComponenet.GetComponents();
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
    }
}
