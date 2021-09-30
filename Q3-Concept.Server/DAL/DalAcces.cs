using MySql.Data.MySqlClient;
using System;

namespace DAL
{
    public class DalAcces
    {
        public MySqlConnection conn;
        public DalAcces()
        {
            conn = new MySqlConnection("server=studmysql01.fhict.local;Uid=dbi419727;Database=dbi419727;pwd=test;");
        }
    }
}
