using MySql.Data.MySqlClient;
using System;

namespace DAL
{
    public class DalAcces
    {
        public MySqlConnection conn = new MySqlConnection();
        public DalAcces()
        {
            conn = new MySqlConnection(@"Server=studmysql01.fhict.local;Uid=dbi419727;Database=dbi419727;Pwd=test");
        }

        public void testconnecion()
        {
            using (conn)
            {
                conn.Open();

                Console.WriteLine($"MySQL version : {conn.ServerVersion}");
            };
        }
    }
}



