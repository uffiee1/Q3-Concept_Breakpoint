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
        private List<MachineModel> GetMachines(ProductionLineModel productionline)
        {
            List<MachineModel> machines = new List<MachineModel>();

            string query = "SELECT `id`, `naam` as `name`, `omschrijving` as `description` FROM `treeview` WHERE  `parent` = @id";

            _dalaccess.conn.Open();
            MySqlCommand command = new MySqlCommand(query, _dalaccess.conn);
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
                _dalaccess.conn.Close();
            }
        }
    }
}
