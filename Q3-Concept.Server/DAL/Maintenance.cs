using System.Collections.Generic;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class Maintenance
    {
        public List<MaintenanceModel> GetMaintenances()
        {
            List<MaintenanceModel> maitenances = new List<MaintenanceModel>();

            string query = "SELECT * FROM `maintenance`";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        if (reader.GetString("startDate") != "0000-00-00 00:00:00" && reader.GetString("endDate") != "0000-00-00 00:00:00")
                        {
                            MaintenanceModel machineHistory = new MaintenanceModel()
                            {
                                Id = reader.GetInt16("id"),
                                TreeviewId = reader.GetInt16("treeview_id"),
                                Warning = reader.GetInt16("warning")
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("notes")))
                            {
                                machineHistory.Notes = reader.GetString("notes");
                            }
                            maitenances.Add(machineHistory);
                        }
                    }
                    return maitenances;
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

        public MaintenanceModel GetMaintenance(int id)
        {
            MaintenanceModel maintenance = new MaintenanceModel();
            string query = "SELECT * FROM `maintenance` WHERE treeview_id = @id";
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
                        MaintenanceModel machineHistory = new MaintenanceModel()
                        {
                            Id = reader.GetInt16("id"),
                            TreeviewId = reader.GetInt16("treeview_id"),
                            Warning = reader.GetInt16("warning")
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("notes")))
                        {
                            machineHistory.Notes = reader.GetString("notes");
                        }
                        maintenance = machineHistory;
                    }
                    return maintenance;
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

        public void UpdateMaintenance(int treeviewId, int warning, string notes)
        {
            string query = "UPDATE `maintenance` SET `warning`=@warning,`notes`=@notes WHERE treeview_id = @tId";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewId));
                command.Parameters.Add(new MySqlParameter("@warning", warning));
                command.Parameters.Add(new MySqlParameter("@notes", notes));
                try
                {
                    MySqlDataReader reader = command.ExecuteReader();
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

        public void InsertMaintenance(int treeviewId, int warning, string notes)
        {
            string query = "INSERT INTO `maintenance`(`treeview_id`, `warning`, `notes`) VALUES (@tId,@warning,@notes)";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewId));
                command.Parameters.Add(new MySqlParameter("@warning", warning));
                command.Parameters.Add(new MySqlParameter("@notes", notes));
                try
                {
                    MySqlDataReader reader = command.ExecuteReader();
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
