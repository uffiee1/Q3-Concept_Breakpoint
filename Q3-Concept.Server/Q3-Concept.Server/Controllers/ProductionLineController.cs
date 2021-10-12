using Logic;
using Model;
using Microsoft.AspNetCore.Mvc;
using Q3_Concept.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Q3_Concept.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductionLineController : ControllerBase
    {
        List<Model.StatusModel> statuses;

        [HttpGet]
        public ProductionLine Get()
        {
            StatusBusiness b = new StatusBusiness();
            return new ProductionLine()
            {
                Name = "A1",
                Id = 1,
                Side = "A",
                Statuses = b.setStatus().ToArray(),
                //new Status[]
                //{
                //    new Status{EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description="On" },
                //    new Status{EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description="Off" },
                //    new Status{EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description="On" },
                //},
                Components = new Component[]
                {
                    new Component{Name = "BAal", Id=2}
                }

            };
        }

        [HttpGet]
        [Route("ProductionLineDetails")]
        public IEnumerable<ProductionLine> GetAll(DateTime StartTime, DateTime EndTime)
        {
            //logica aanroepen
            return new ProductionLine[] {
                new ProductionLine()
                {
                    Name = "A1",
                    Id = 1,
                    Side = "A",
                //    Statuses = new Status[]
                //{
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "On" },
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "Off" },
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "On" },
                //}
                //},
                //new ProductionLine()
                //{
                //    Name = "A1",
                //    Id = 1,
                //    Side = "A",
                //    Statuses = new Status[]
                //{
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "On" },
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "Off" },
                //    new Status { EndDateTime = DateTime.Now, StartDateTime = DateTime.Now, Description = "On" },
                //}
                }
            };
        }
    }
}
