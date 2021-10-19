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
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : ControllerBase
    {
        private Logic.Components _c = new Components();

        [HttpGet]
        [Route("ComponentHistory")]
        public IEnumerable<Component> GetAll()
        {
            List<ComponentDataModel> components = _c.GetComponents();
            List<Component> comComponents = new List<Component>();

            foreach (ComponentDataModel component in components)
            {
                comComponents.Add(
                    new Component()
                    {
                        Name = component.Name,
                        Id = component.ID,
                        Description = component.Description,
                        MachineHistory = _c.GetMachineHistory(component.ID)
                    }
                );
            }

            return comComponents;
        }
    }
}
