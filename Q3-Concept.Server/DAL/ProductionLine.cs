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
        private const string _connection = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
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
            using(MySqlConnection connection = new MySqlConnection(_connection))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
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
                    connection.Close();
                }
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


            using (MySqlConnection connection = new MySqlConnection(_connection))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
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
                    connection.Close();
                }
            }
        }
    }
}
