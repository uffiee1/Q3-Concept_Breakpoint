using System;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class DalConnection
    {
        public const string Conn = "Server=Q3-breakpointDBcontainer; port=3306; database=breakpointDB; Uid=user; pwd=root;";

        // public const string Conn = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
    }
}
