﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class Components
    {
        public List<MachineHistory> GetComHistory(int id)
        {
            List<MachineHistory> machineHistory = new List<MachineHistory>();

            string query = "SELECT DISTINCT " +
                           "mmp.name, CONCAT(pd.start_date, ' ', pd.start_time) AS startDate, CONCAT(pd.end_date, ' ', pd.end_time) AS endDate " +
                           "FROM production_data pd, machine_monitoring_poorten mmp " +
                           "WHERE( pd.treeview_id = @id OR pd.treeview2_id = @id) AND pd.port = mmp.port AND pd.board = mmp.board " +
                           "ORDER BY startDate";
            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.Add(new MySqlParameter("@id", id));
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        if (reader.GetString("startDate") != "0000-00-00 00:00:00" && reader.GetString("endDate") != "0000-00-00 00:00:00")
                        {
                            MachineHistory machHistory = new MachineHistory()
                                {
                                    Name = reader.GetString("name"),
                                    StarDate = DateTime.Parse(reader.GetString("startDate")),
                                    EndDate = DateTime.Parse(reader.GetString("endDate"))
                                };
                            machineHistory.Add(machHistory);
                        }
                    }
                    return machineHistory;
                }
                catch
                {
                    throw;
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        public List<ComponentDataModel> GetComponents()
        {
            List<ComponentDataModel> components = new List<ComponentDataModel>();

            string query = "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview2_id = tv.id AND tv.parent = tp.id) " +
                           "UNION " +
                           "(" +
                           "SELECT tv.`id`, tv.`omschrijving` as `name`, tp.`omschrijving` as `description` " +
                           "FROM `production_data` pd, `treeview` tv, `treeview` tp " +
                           "WHERE pd.treeview_id = tv.id AND tv.parent = tp.id)";
            using (MySqlConnection connection = new MySqlConnection(DalAcces.Conn))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand(query, connection);
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
                        components.Add(componentdata);
                    }

                    return components;
                }
                catch
                {
                    throw;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}
