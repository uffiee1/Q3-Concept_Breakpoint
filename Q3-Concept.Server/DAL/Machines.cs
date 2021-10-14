using Model;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Machines
    {
        //id naam omschrijving 

        private readonly DalAcces _dalaccess;
        private const string _connection = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
        private List<MachineModel> GetMachines(ProductionLineModel productionline)
        {
            List<MachineModel> machines = new List<MachineModel>();

            string query = "SELECT `id`, `naam` as `name`, `omschrijving` as `description` FROM `treeview` WHERE  `parent` = @id";
            using (MySqlConnection connection = new MySqlConnection(_connection))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", productionline.ID));

                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        MachineModel machinedata = new MachineModel()
                        {
                            ID = reader.GetInt32("id"),
                            Name = reader.GetString("name"),
                            Description = reader.GetString("description")
                        };
                        machines.Add(machinedata);
                    }

                    return machines;
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
