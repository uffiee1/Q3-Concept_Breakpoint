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

        public bool  getall()
        {
            using (MySqlConnection conn = new MySqlConnection())
            {
                string query = "SELECT * FROM treeview";

                MySqlCommand command = new MySqlCommand(query, _dalaccess.Conn);
                _dalaccess.Conn.Open();
                command.ExecuteNonQuery();

                _dalaccess.Conn.Close();
                return true;
            }
        }
        public ComponentDataModel GetComponent(int id)
        {
            ComponentDataModel components = new ComponentDataModel();

            string query = "SELECT id, naam as name, omschrijving as description FROM treeview WHERE id = @id";
            using _dalaccess.Conn()
            {

            }
                _dalaccess.Conn.Open();
            MySqlCommand command = new MySqlCommand(query, _dalaccess.Conn);
            command.Parameters.Add(new MySqlParameter("@id", id));
            command.ExecuteNonQuery();

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
                _dalaccess.Conn.Close();
            }
        }

    }
}
