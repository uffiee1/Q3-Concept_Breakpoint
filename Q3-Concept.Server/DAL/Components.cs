using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class Components
    {
        public List<MachineHistory> GetComHistory(int id)
        {
            List<MachineHistory> machineHistoryList = new List<MachineHistory>();

            string query = "SELECT DISTINCT " +
                           "mmp.name, CONCAT(pd.start_date, ' ', pd.start_time) AS startDate, CONCAT(pd.end_date, ' ', pd.end_time) AS endDate, pd.port, pd.board " +
                           "FROM production_data pd, machine_monitoring_poorten mmp " +
                           "WHERE( pd.treeview_id = @id OR pd.treeview2_id = @id) AND pd.port = mmp.port AND pd.board = mmp.board " +
                           "ORDER BY startDate";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", id));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        if (reader.GetString("startDate") != "0000-00-00 00:00:00" && reader.GetString("endDate") != "0000-00-00 00:00:00")
                        {
                            MachineHistory machineHistory = new MachineHistory()
                                {
                                    Name = reader.GetString("name"),
                                    StarDate = DateTime.Parse(reader.GetString("startDate")),
                                    EndDate = DateTime.Parse(reader.GetString("endDate")),
                                    Port = reader.GetInt16("port"),
                                    Board = reader.GetInt16("board"),
                                };
                            machineHistoryList.Add(machineHistory);
                        }
                    }
                    return machineHistoryList;
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

        public List<ComponentDataModel> GetComponents()
        {
            List<ComponentDataModel> componentsList = new List<ComponentDataModel>();

            string query = "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview2_id = tv.id AND tv.parent = tp.id) " +
                           "UNION " +
                           "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview_id = tv.id AND tv.parent = tp.id)";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        ComponentDataModel componentdata = new ComponentDataModel()
                        {
                            ID = reader.GetInt32("id"),
                            Name = reader.GetString("name"),
                            Description = reader.GetString("description")
                        };
                        componentsList.Add(componentdata);
                    }

                    return componentsList;
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

        public List<ComponentDataModel> GetComponentsInProductionLine(int port, int board)
        {
            List<ComponentDataModel> componentsList = new List<ComponentDataModel>();

            string query = "( SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` FROM `production_data` pd, `treeview` tv, `treeview` tp WHERE pd.treeview2_id = tv.id AND tv.parent = tp.id AND pd.port = @port AND pd.board = @board ORDER BY pd.end_time DESC, pd.start_time DESC LIMIT 1) UNION( SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` FROM `production_data` pd, `treeview` tv, `treeview` tp WHERE pd.treeview_id = tv.id AND tv.parent = tp.id AND pd.port = @port AND pd.board = @board ORDER BY pd.end_time DESC, pd.start_time DESC LIMIT 1 ) ";
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
                        ComponentDataModel componentdata = new ComponentDataModel()
                        {
                            ID = reader.GetInt32("id"),
                            Name = reader.GetString("name"),
                            Description = reader.GetString("description")
                        };
                        componentsList.Add(componentdata);
                    }

                    return componentsList;
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

        public int GetActions(int id)
        {
            string query = "SELECT ROUND(SUM(ts.totaal)) as 'actions' FROM `tellerstanden` ts INNER JOIN( SELECT tv.id as 'treeviewId', concat(pd.start_date, 'T', pd.start_time) as 'startDate', concat(pd.end_date, 'T', pd.end_time) as 'endDate' FROM `production_data` pd, `machine_monitoring_poorten` mmp, `treeview` tv WHERE( pd.`treeview_id` = @id OR pd.`treeview2_id` = @id) AND pd.port = mmp.port AND pd.board = mmp.board AND tv.naam = mmp.name ) AS A ON A.treeviewId = ts.treeview_id AND ts.start_datum > A.startDate AND ts.end_datum < A.endDate";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", id));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    int actions = 0;
                    while (reader.Read())
                    {
                        if (!reader.IsDBNull(reader.GetOrdinal("actions")))
                        {
                            actions = reader.GetInt32("actions");
                        }
                    }

                    return 0;
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

        public int GetActions(MachineHistory machineHistory)
        {
            string query = "SELECT ROUND(SUM(ts.totaal)) as 'actions' FROM `tellerstanden` ts INNER JOIN( SELECT tv.id as 'treeviewId', concat(pd.start_date, 'T', pd.start_time) as 'startDate', concat(pd.end_date, 'T', pd.end_time) as 'endDate' FROM `production_data` pd, `machine_monitoring_poorten` mmp, `treeview` tv WHERE( pd.`treeview_id` = 213 OR pd.`treeview2_id` = 213) AND pd.port = mmp.port AND pd.board = mmp.board AND tv.naam = mmp.name ) AS A ON A.treeviewId = ts.treeview_id AND ts.start_datum > A.startDate AND ts.end_datum < A.endDate";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@port", machineHistory.Port));
                command.Parameters.Add(new MySqlParameter("@board", machineHistory.Board));
                command.Parameters.Add(new MySqlParameter("@startDate", machineHistory.StarDate));
                command.Parameters.Add(new MySqlParameter("@endDate", machineHistory.EndDate));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    int actions = 0;
                    while (reader.Read())
                    {
                        actions = reader.GetInt32("actions");
                    }

                    return 0;
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
