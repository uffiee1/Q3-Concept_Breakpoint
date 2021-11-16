﻿using System;
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
                componentList.Add(
                    new Component()
                    {
                        Name = component.Name,
                        Id = component.ID,
                        Description = component.Description,
                        Actions = _dalComponenet.GetActions(component.ID),
                        MachineHistory = _dalComponenet.GetComHistory(component.ID)
                    }
                );
            }

            return componentList;
        }
    }
}
