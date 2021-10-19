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
        public ComponentDataModel GetComponent(int id)
        {
            ComponentDataModel components = new ComponentDataModel();

            string query = "SELECT `id`, `naam` as `name`, `omschrijving` as `description` FROM `treeview` WHERE  `id` = @id";
            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", id));

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
                        components = componentdata;
                    }

                    return components;
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
