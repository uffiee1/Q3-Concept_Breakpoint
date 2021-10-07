using MySql.Data.MySqlClient;
using System;

namespace DAL
{
    public class DalAcces
    {
        public const string MyConnectionString = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
       public MySqlConnection Connection = new MySqlConnection(MyConnectionString);
    }
}
