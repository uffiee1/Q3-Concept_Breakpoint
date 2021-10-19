using System;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class DalAcces
    {
#pragma warning disable SA1401 // Fields should be private
        public static string Conn = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
#pragma warning restore SA1401 // Fields should be private
                              // private static readonly MySqlConnection MySqlConnection = new MySqlConnection(MyConnectionString);
                              // private MySqlConnection _Connection = MySqlConnection;
    }
}
