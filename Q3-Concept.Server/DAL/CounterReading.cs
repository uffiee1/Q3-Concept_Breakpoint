using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class CounterReading
    {
        public List<StatusModel> GetCounterReadings(int treeviewId)
        {
            List<StatusModel> calculatedStatuseList = new List<StatusModel>();

            string query = "SELECT * FROM `tellerstanden` WHERE treeview_id = @treeviewId";

            using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@treeviewId", treeviewId));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        StatusModel calculatedStatus = new StatusModel()
                        {
                            Description = reader.GetString("waarde"),
                            StartTime = reader.GetDateTime("start_datum"),
                            End__Time = reader.GetDateTime("end_datum"),
                            Duration = (reader.GetDateTime("end_datum") - reader.GetDateTime("start_datum")).TotalSeconds,
                            Entries = reader.GetInt32("totaal")
                        };
                        calculatedStatuseList.Add(calculatedStatus);
                    }

                    return calculatedStatuseList;
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

        public void InsertData(List<StatusModel> statusList, int treeviewId)
        {
            foreach (StatusModel status in statusList)
            {
                string query = "INSERT INTO `tellerstanden`(`waarde`, `totaal`, `treeview_id`, `start_datum`, `end_datum`) " +
                                "VALUES (@value, @total, @treeviewId, @startDate, @endDate)";

                using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
                {
                    connection.Open();
                    try
                    {
                        MySqlCommand command = new MySqlCommand(query, connection);
                        command.Parameters.Add(new MySqlParameter("@value", status.Description));
                        command.Parameters.Add(new MySqlParameter("@total", status.Entries));
                        command.Parameters.Add(new MySqlParameter("@treeviewId", treeviewId));
                        command.Parameters.Add(new MySqlParameter("@startDate", status.StartTime));
                        command.Parameters.Add(new MySqlParameter("@endDate", status.End__Time));
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

        public void UpdateStatuses(List<StatusModel> statusList, int treeviewId)
        {
            {
                string query = "DELETE FROM `tellerstanden` WHERE `treeview_id` = @treeviewId";

                using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
                {
                    try
                    {
                        connection.Open();
                        MySqlCommand command = new MySqlCommand(query, connection);
                        command.Parameters.Add(new MySqlParameter("@treeviewId", treeviewId));
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

            foreach (StatusModel status in statusList)
            {
                string query = "INSERT INTO `tellerstanden`(`waarde`, `totaal`, `treeview_id`, `start_datum`, `end_datum`) " +
                                "VALUES (@value, @total, @treeviewId, @startDate, @endDate)";

                using (MySqlConnection connection = new MySqlConnection(DalConnection.Conn))
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.Add(new MySqlParameter("@value", status.Description));
                    command.Parameters.Add(new MySqlParameter("@total", status.Entries));
                    command.Parameters.Add(new MySqlParameter("@treeviewId", treeviewId));
                    command.Parameters.Add(new MySqlParameter("@startDate", status.StartTime));
                    command.Parameters.Add(new MySqlParameter("@endDate", status.End__Time));
                    MySqlDataReader reader = command.ExecuteReader();
                    try
                    {
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
}
