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
        [Route("ProductionLineDetails")]
        public IEnumerable<Model.ComponentDataModel> GetAll()
        {
            return _c.GetComponents();
        }
    }
}
