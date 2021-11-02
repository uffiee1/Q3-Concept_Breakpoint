using MySql.Data.MySqlClient;
using System;

namespace DAL
{
    public class DalAcces
    {
        public const string MyConnectionString = "server=localhost;user id=user;database=breakpointDB;Pwd=root;port=3307;SslMode=none;";
        public MySqlConnection Connection = new MySqlConnection(MyConnectionString);
    }
}



