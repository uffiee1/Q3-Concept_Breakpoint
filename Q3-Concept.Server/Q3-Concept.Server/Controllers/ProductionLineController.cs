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
        private DAL.Components _dalComponenet = new DAL.Components();

        // List<DAL.ProductionLine> productionLine;
        [HttpGet]
        public ProductionLine Get(DateTime startTime, DateTime endTime, int board, int port)
        {
            ProductionLineModel productionLine = _pd.GetProductionLine(board, port);

            return new ProductionLine()
            {
                Name = productionLine.Name,
                Id = productionLine.port,
                Side = productionLine.Side,
                Statuses = _sb.setStatus(startTime, endTime, board, port, productionLine.ID).ToArray(),
                Components = GetComponents(productionLine.port, productionLine.Board).ToArray(),
                ComponentHistory = GetComponents(productionLine.port, productionLine.Board, true).ToArray()
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
                        Side = productionLine.Side,
                        Statuses = _sb.setStatus(startTime, endTime, productionLine.Board, productionLine.port, productionLine.ID).ToArray(),
                        Components = GetComponents(productionLine.port, productionLine.Board).ToArray(),
                        ComponentHistory = GetComponents(productionLine.port, productionLine.Board, true).ToArray()
                    }
                );
            }

            return productionLines;
        }

        private List<Component> GetComponents(int port, int board, bool all = false)
        {
            List<ComponentDataModel> componentDalList = _dalComponenet.GetComponentsInProductionLine(port, board, all);
            List<Component> componentList = new List<Component>();

            foreach (ComponentDataModel component in componentDalList)
            {
                Component comp = new Component()
                {
                    Name = component.Name,
                    Id = component.ID,
                    Description = component.Description,
                    StartDate = component.StartDate,
                    EndDate = component.EndDate
                };

                componentList.Add(comp);
            }

            return componentList;
        }
    }
}
