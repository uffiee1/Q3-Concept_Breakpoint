﻿using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public class Components
    {
        //id naam omschrijving 
        private readonly DalAcces _dalaccess = new DalAcces();

        public List<DataModel.ComponentDataModel> GetAllComponents()
        {
            List<DataModel.ComponentDataModel> componentlist = new List<DataModel.ComponentDataModel>();
            string query = "SELECT * FROM product";

            _dalaccess.conn.Open();
            MySqlCommand command = new MySqlCommand(query, _dalaccess.conn);
            MySqlDataReader reader = command.ExecuteReader();
            try
            {
                //read through all the data
                while (reader.Read())
                {
                    //create productlist
                    //DataModel.ComponentDataModel listofcomponents = new DataModel.ComponentDataModel
                    //{
                    //    ID = reader.GetInt32("IdUser"),
                    //    Name = reader.GetString("Name"),
                    //    Description = reader.GetString(""),
                    //    meters = reader.GetString(""),

                    //};
                    //// save uitlening to the list
                    //orderList.Add(order);
                }
            }
            catch
            {
                Console.WriteLine("kan de query niet uitvoeren! LOL");
            }
            finally
            {
                _dalaccess.conn.Close();
            }

            return componentlist;
            throw new NotImplementedException();
        }

    }
}
