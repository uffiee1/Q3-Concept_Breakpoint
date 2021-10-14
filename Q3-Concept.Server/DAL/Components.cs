using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using Model;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public class Components
    {
        //id naam omschrijving 
        private readonly DalAcces _dalaccess = new DalAcces();
        private const string _connection = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";

        public ComponentDataModel GetComponent(int id)
        {
            ComponentDataModel components = new ComponentDataModel();

            string query = "SELECT `id`, `naam` as `name`, `omschrijving` as `description` FROM `treeview` WHERE  `id` = @id";
            using (MySqlConnection Connection = new MySqlConnection(_connection))
            {
                MySqlCommand command = new MySqlCommand(query, Connection);
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
                    Connection.Close();
                }
            }
        }

    }
}
