using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class Machines
    {
        private List<MachineModel> GetMachines(ProductionLineModel productionline)
        {
            List<MachineModel> machines = new List<MachineModel>();

            string query = "SELECT `id`, `naam` as `name`, `omschrijving` as `description` FROM `treeview` WHERE  `parent` = @id";
            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
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
