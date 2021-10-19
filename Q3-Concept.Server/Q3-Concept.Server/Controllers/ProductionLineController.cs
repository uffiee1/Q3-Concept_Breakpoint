using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logic;
using Microsoft.AspNetCore.Mvc;
using Model;
using Q3_Concept.Server.Models;

namespace Q3_Concept.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductionLineController : ControllerBase
    {
        private readonly List<Model.StatusModel> _statuses;

        // List<DAL.ProductionLine> productionLine;
        [HttpGet]
        public ProductionLine Get(DateTime startTime, DateTime endTime, int board, int port)
        {
            StatusBusiness b = new StatusBusiness();
            ProductionLineModel productionLine = b.GetProductionLine(board, port);

            return new ProductionLine()
            {
                Name = productionLine.Name,
                Id = productionLine.port,
                Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                Statuses = b.setStatus(startTime, endTime, board, port).ToArray(),
                Components = new Component[]
                {
                    new Component { Name = "BAal", Id = 2 }
                }
            };
        }

        [HttpGet]
        [Route("ProductionLineDetails")]
        public IEnumerable<ProductionLine> GetAll(DateTime startTime, DateTime endTime)
        {
            // List<ProductionLine> dbProdctionLines = productionLine.GetProductionLines();
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
                        Statuses = b.setStatus(startTime, endTime, productionLine.Board, productionLine.port).ToArray(),
                        Components = new Component[]
                        {
                            new Component { Name = "BAal", Id = 2 }
                        }
                    }
                );
            }

            return productionLines;
        }
    }
}
