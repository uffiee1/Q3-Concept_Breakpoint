using Model;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductionLine
    {
        private readonly DalAcces _dalaccess = new DalAcces();
       
        public List<ProductionLineModel> GetProductionLines()
        {
            List<ProductionLineModel> productionlines = new List<ProductionLineModel>();
            string query = "SELECT DISTINCT tp.`id`, tp.`naam` as `name`,  tg.`omschrijving` as `side`"+
                     "FROM `treeview` tp, "+
                         " `treeview` tg, " +
                             " `machine_monitoring_poorten` mmp " +
                "  WHERE tp.`parent` = tg.`id` AND " +
                                " mmp.`name` IS NOT null AND " +
                                 "mmp.`name` != \"\" AND " +
                         "tp.`naam` = mmp.`name`";

                _dalaccess.conn.Open();
            MySqlCommand command = new MySqlCommand(query, _dalaccess.conn);
            MySqlDataReader reader = command.ExecuteReader();
            try
            {
                while (reader.Read())
                {
                    ProductionLineModel production = new ProductionLineModel()
                    {
                        ID = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Side = reader.GetString("side")
                    };
                    productionlines.Add(production);
                }
          
               
                return productionlines;
            }
            catch
            {
                throw;
            }
            finally
            {
                _dalaccess.conn.Close();
            }
        }
        public ProductionLineModel GetProductionLine(int board, int port)
        {
            ProductionLineModel productionlinemodel = new ProductionLineModel();

            string query = "SELECT DISTINCT tp.`id`, tp.`naam` as `name`,  tg.`omschrijving` as `side`" +
                            " FROM `treeview` tp," +
                            "`treeview` tg" +
                    " WHERE tp.`parent` = tg.`id` AND" +
                    "tp.`naam` = (SELECT `name` FROM `machine_monitoring_poorten` WHERE `port` = @port AND `board = @board)";

            _dalaccess.conn.Open();
            MySqlCommand command = new MySqlCommand(query, _dalaccess.conn);
            command.Parameters.Add(new MySqlParameter("@port", port));
            command.Parameters.Add(new MySqlParameter("@baord", board));
            MySqlDataReader reader = command.ExecuteReader();
            try
            {
                while (reader.Read())
                {
                    ProductionLineModel production = new ProductionLineModel()
                    {
                        ID = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Side = reader.GetString("side")
                    };
                    productionlinemodel = production;
                }
                return productionlinemodel;
            }
            catch
            {
                throw;
            }
            finally
            {
                _dalaccess.conn.Close();
            }
        }
    }
}
