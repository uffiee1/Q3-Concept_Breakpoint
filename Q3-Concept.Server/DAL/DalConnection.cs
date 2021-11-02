using System;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class DalConnection
    {
<<<<<<< HEAD
#pragma warning disable SA1401 // Fields should be private
        public static string Conn = "Server=192.168.15.54;Uid=dbi419727;Database=dbi419727;Pwd=test;SslMode=none;";
        // public static string Conn = "server=localhost;user id=user;database=breakpointDB;Pwd=root;port=3307;SslMode=none;";
#pragma warning restore SA1401 // Fields should be private
=======
        public const string Conn = "Server=Q3-breakpointDBcontainer; port=3306; database=breakpointDB; Uid=user; pwd=root;";
>>>>>>> 2b834bf64ad774a6025069412eb399e90cfeffc4
    }
}
