using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class MonitoringData
    {
        public List<MonitoringDataModel> GetMonitoritingData(DateTime datetimeStart, DateTime datetimeEnd, int board, int port)
        {
            List<MonitoringDataModel> monitoringsdata = new List<MonitoringDataModel>();

            string query = "SELECT id, timestamp, shot_time FROM `monitoring_data_202009` WHERE `timestamp` between @datetimestart and @datetimeend AND port = @port AND board = @board";

            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@port", port));
                command.Parameters.Add(new MySqlParameter("@board", board));
                command.Parameters.Add(new MySqlParameter("@datetimestart", datetimeStart));
                command.Parameters.Add(new MySqlParameter("@datetimeend", datetimeEnd));

                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        MonitoringDataModel machinedata = new MonitoringDataModel()
                        {
                            Id = reader.GetInt32("id"),
                            TimeStamp = reader.GetDateTime("timestamp"),
                            ShortTime = reader.GetDouble("shot_time")
                        };
                        monitoringsdata.Add(machinedata);
                    }

                    return monitoringsdata;
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
