using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class MaintenanceHistory
    {
        public void InsertMaintenceHistory(int treeviewId, string notes, int status)
        {
            string query = "INSERT INTO `maintenancehistory`( `treeview_id`, `notes`, `insert_date`, `status`) VALUES (@tId, @notes, @date, @status)";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewId));
                command.Parameters.Add(new MySqlParameter("@date", DateTime.Now));
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

        public List<MaintenanceHistoryModel> GetmaintenancehistoryFromComponent(int treeviewid)
        {
            List<MaintenanceHistoryModel> maitenances = new List<MaintenanceHistoryModel>();

            string query = "SELECT * FROM `maintenancehistory` WHERE treeview_id = @tId";
            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@tId", treeviewid));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        MaintenanceHistoryModel machineHistory = new MaintenanceHistoryModel()
                        {
                            Id = reader.GetInt16("id"),
                            TreeviewId = reader.GetInt16("treeview_id"),
                            InsertDate = reader.GetDateTime("insert_date"),
                            Status = reader.GetInt16("status")
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
    }
}
