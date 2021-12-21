using System;
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

            string query = "SELECT m.id, m.treeview_id, m.notes, m.status, m.warning, tv.omschrijving FROM `maintenance` m, `treeview` tv WHERE m.treeview_id = tv.id";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        MaintenanceModel machineHistory = new MaintenanceModel()
                            {
                                Id = reader.GetInt16("id"),
                                TreeviewId = reader.GetInt16("treeview_id"),
                                Warning = reader.GetInt32("warning"),
                                Status = reader.GetInt16("status"),
                                Name = reader.GetString("omschrijving")
                            };
                        if (!reader.IsDBNull(reader.GetOrdinal("notes")))
                        {
                                machineHistory.Notes = reader.GetString("notes");
                        }
                        maitenances.Add(machineHistory);
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

        public void removeMaintenance(int treeviewId)
        {
            string query = "DELETE FROM `maintenance` WHERE treeview_id = @treeview";

            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                try
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.Add(new MySqlParameter("@treeview", treeviewId));
                    command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
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
            string query = "SELECT m.id, m.treeview_id, m.notes, m.status, tv.omschrijving FROM `maintenance` m, `treeview` tv WHERE m.treeview_id = @treeview AND tv.id = @treeview";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@treeview", id));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        MaintenanceModel machineHistory = new MaintenanceModel()
                        {
                            Id = reader.GetInt16("id"),
                            TreeviewId = reader.GetInt16("treeview_id"),
                            Name = reader.GetString("omschrijving"),
                            Status = reader.GetInt16("status")
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

        public void UpdateMaintenance(int treeviewId, int warning, string notes, int status)
        {
            string query = "UPDATE `maintenance` SET `warning`=@warning,`notes`=@notes, `status`=@status WHERE treeview_id = @tId";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewId));
                command.Parameters.Add(new MySqlParameter("@warning", warning));
                command.Parameters.Add(new MySqlParameter("@notes", notes));
                command.Parameters.Add(new MySqlParameter("@status", (int)status));
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

        public void InsertMaintenance(int treeviewId, int warning, string notes, int status)
        {
            string query = "INSERT INTO `maintenance`(`treeview_id`, `warning`, `notes`, `status`) VALUES (@tId,@warning,@notes, @status)";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewId));
                command.Parameters.Add(new MySqlParameter("@warning", warning));
                command.Parameters.Add(new MySqlParameter("@notes", notes));
                command.Parameters.Add(new MySqlParameter("@status", status));
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
