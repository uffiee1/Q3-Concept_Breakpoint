using Model;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

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
                                Warning = reader.GetInt16("warning"),
                                Notes = reader.GetString("notes")
                            };
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
            string query = "SELECT * FROM `maintenance` WHERE id = @id";
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
                            Warning = reader.GetInt16("warning"),
                            Notes = reader.GetString("notes")
                        };
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

        public void UpdateMaintenance(int id, int treeviewId, int warning, string notes)
        {
            string query = "UPDATE `maintenance` SET `treeview_id`=@tId,`warning`=@warning,`notes`=@notes WHERE `id`=@id";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", id));
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
