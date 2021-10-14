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
            StatusBusiness b = new StatusBusiness();
            ProductionLineModel productionLine = b.GetProductionLine(board, port);

            return new ProductionLine()
            {
                Name = productionLine.Name,
                Id = productionLine.port,
                Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                Statuses = b.setStatus(StartTime, EndTime, board, port).ToArray(),
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
            StatusBusiness b = new StatusBusiness();
            List<ProductionLineModel> productionLinesDB = b.GetProductionLines();

            List<ProductionLine> productionLines = new List<ProductionLine>();

            foreach (ProductionLineModel productionLine in productionLinesDB)
            {
                productionLines.Add(
                    new ProductionLine()
                    {
                        Name = productionLine.Name,
                        Id = productionLine.ID,
                        Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                        Statuses = b.setStatus(StartTime, EndTime, productionLine.Board, productionLine.port).ToArray(),
                        Components = new Component[]
                        {
                            new Component{Name = "BAal", Id=2}
                        }
                    }
                );
            }

            return productionLines;
        }
    }
}
