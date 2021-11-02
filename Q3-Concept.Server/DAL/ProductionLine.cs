using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class ProductionLine
    {
        public List<ProductionLineModel> GetProductionLines()
        {
            List<ProductionLineModel> productionlineList = new List<ProductionLineModel>();

            string query = "SELECT DISTINCT tp.`id`, tp.`naam` as `name`, mmp.`port`, mmp.`board`,  tg.`omschrijving` as `side`" +
                     "FROM `treeview` tp, " +
                         " `treeview` tg, " +
                             " `machine_monitoring_poorten` mmp " +
                "  WHERE tp.`parent` = tg.`id` AND " +
                                " mmp.`name` IS NOT null AND " +
                                 "mmp.`name` != \"\" AND " +
                         "tp.`naam` = mmp.`name`";
            using MySqlConnection connection = new MySqlConnection(DalConnection.Conn);
            connection.Open();
            MySqlCommand command = new MySqlCommand(query, connection);
            MySqlDataReader reader = command.ExecuteReader();
            try
            {
                while (reader.Read())
                {
                    ProductionLineModel productionLine = new ProductionLineModel()
                    {
                        ID = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Side = reader.GetString("side"),
                        port = reader.GetInt32("port"),
                        Board = reader.GetInt32("board")
                    };
                    productionlineList.Add(productionLine);
                }

                return productionlineList;
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

        public ProductionLineModel GetProductionLine(int board, int port)
        {
            ProductionLineModel productionLine = new ProductionLineModel();

            string query = "SELECT DISTINCT tp.`id`, tp.`naam` as `name`, tg.`omschrijving` as `side`" +
                            " FROM `treeview` tp," +
                            "`treeview` tg" +
                    " WHERE tp.`parent` = tg.`id` AND " +
                    "tp.`naam` = (SELECT `name` FROM `machine_monitoring_poorten` WHERE `port` = @port AND `board` = @board)";

            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@port", port));
                command.Parameters.Add(new MySqlParameter("@board", board));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        productionLine = new ProductionLineModel()
                        {
                            ID = reader.GetInt32("id"),
                            Name = reader.GetString("name"),
                            Side = reader.GetString("side"),
                            port = port,
                            Board = board,
                        };
                    }
                    return productionLine;
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
