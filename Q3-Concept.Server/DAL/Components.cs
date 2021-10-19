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
        public List<ComponentDataModel> GetComponents()
        {
            List<ComponentDataModel> components = new List<ComponentDataModel>();

            string query = "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview2_id = tv.id AND tv.parent = tp.id) " +
                           "UNION " +
                           "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview_id = tv.id AND tv.parent = tp.id)";
            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
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
                        // components = componentdata;
                        components.Add(componentdata);
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
