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
        private StatusBusiness _sb = new StatusBusiness();
        private DAL.ProductionLine _pd = new DAL.ProductionLine();

        // List<DAL.ProductionLine> productionLine;
        [HttpGet]
        public ProductionLine Get(DateTime startTime, DateTime endTime, int board, int port)
        {
            ProductionLineModel productionLine = _pd.GetProductionLine(board, port);

            return new ProductionLine()
            {
                Name = productionLine.Name,
                Id = productionLine.port,
                Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                Statuses = _sb.setStatus(startTime, endTime, board, port, productionLine.ID).ToArray(),
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
            List<ProductionLineModel> productionLinesDB = _pd.GetProductionLines();

            List<ProductionLine> productionLines = new List<ProductionLine>();

            foreach (ProductionLineModel productionLine in productionLinesDB)
            {
                productionLines.Add(
                    new ProductionLine()
                    {
                        Name = productionLine.Name,
                        Id = productionLine.ID,
                        Side = new DateTime(2001, 09, 1, 0, 0, 0).ToString(),
                        Statuses = _sb.setStatus(startTime, endTime, productionLine.Board, productionLine.port, productionLine.ID).ToArray(),
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
