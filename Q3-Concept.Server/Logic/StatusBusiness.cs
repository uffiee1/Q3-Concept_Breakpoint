﻿using System;
using System.Collections.Generic;
using DAL;
using Model;

namespace Logic
{
    public class StatusBusiness
    {
        private MonitoringData _moniDAL = new MonitoringData();
        private List<Model.StatusModel> _statuses;
        private List<MonitoringDataModel> _monitoringDataModels;
        private int _offMargin = 500;

        public List<StatusModel> setStatus(DateTime startDate, DateTime endDate, int board, int port)
        {
            return ConvertToStatus(_moniDAL.GetMonitoritingData(startDate, endDate, board, port), endDate, startDate);
        }

        // werkt
        public List<StatusModel> ConvertToStatus(List<MonitoringDataModel> monitoringDataModels, DateTime endDate, DateTime startDate)
        {
            // werkt
            if (monitoringDataModels.Count <= 0)
            {
                return new List<StatusModel>();
            }

            string status = " ";
            List<StatusModel> statuses = new List<StatusModel>();
            DateTime startTime = monitoringDataModels[0].TimeStamp;
            int entries = 0;
            bool currentStatus = true;
            bool previousStatus = (monitoringDataModels[0].TimeStamp - monitoringDataModels[1].TimeStamp).TotalSeconds <
                                  _offMargin;

            // loop door monitoring data
            for (int i = 1; i < monitoringDataModels.Count; i++)
            {
                // bepaald of verschil te groot is
                currentStatus = (monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp).TotalSeconds < _offMargin;

                // anders dan vorige entry -> nieuwe status
                if (currentStatus != previousStatus || i == monitoringDataModels.Count)
                {
                    status = !currentStatus ? "on" : "off";

                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));

                    // setup volgende status
                    previousStatus = currentStatus;
                    // timestamp van vorige entry
                    startTime = monitoringDataModels[i - 1].TimeStamp;
                    entries = 0;
                }
                entries++;

                if (i >= monitoringDataModels.Count - 1)
                {
                    status = currentStatus ? "on" : "off";
                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));
                }
            }

            if (statuses[statuses.Count - 1].End__Time <= endDate.AddSeconds(_offMargin * -1))
            {
                // final status
                statuses.Add(CreatestatusModel(statuses[statuses.Count - 1].End__Time, endDate, "off", 1, (endDate - statuses[statuses.Count - 1].End__Time).TotalSeconds));
            }

            if (statuses[0].StartTime.AddSeconds(_offMargin * -1) >= startDate)
            {
                // final status
                statuses.Insert(0, CreatestatusModel(startDate, statuses[0].StartTime, "off", 1, (statuses[0].StartTime - startDate).TotalSeconds));
            }

            return statuses;
        }

        private StatusModel CreatestatusModel(DateTime startTime, DateTime endTime, string description,  int entries, double duration)
        {
            return new StatusModel() { StartTime = startTime, End__Time = endTime, Description = description, Entries = entries, Duration = duration };
        }

        public List<Model.ProductionLineModel> GetProductionLines()
        {
            DAL.ProductionLine pl = new DAL.ProductionLine();
            return pl.GetProductionLines();
        }

        public Model.ProductionLineModel GetProductionLine(int board, int port)
        {
            DAL.ProductionLine pl = new DAL.ProductionLine();
            return pl.GetProductionLine(board, port);
        }
    }
}