using MySql.Data.MySqlClient;
using System;

namespace DAL
{
    public class DalAcces
    {
        public static readonly string connection = "Server=studmysql01.fhict.local;Uid=dbi419727;Database=dbi419727;Pwd=test;SSL Mode=Required;";

        public MySqlConnection Conn = new MySqlConnection(connection);
        
    }
}
