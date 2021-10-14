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
        //List<DAL.ProductionLine> productionLine;

        [HttpGet]
        public ProductionLine Get(DateTime StartTime, DateTime EndTime, int board, int port)
        {
            //if (StartTime == null)
            //    StartTime = new DateTime(1980, 01, 01);
            //if (EndTime == null)
            //    EndTime = new DateTime();

            //moniDAL.GetMonitoritingData(, new DateTime(2077, 09, 30, 1, 0, 0), 1, 22));
            StatusBusiness b = new StatusBusiness();
            return new ProductionLine()
            {
                Name = "A1",
                Id = 1,
                Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                Statuses = b.setStatus(StartTime, EndTime, board, port).ToArray(),
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
            //List<ProductionLine> dbProdctionLines = productionLine.GetProductionLines();



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
