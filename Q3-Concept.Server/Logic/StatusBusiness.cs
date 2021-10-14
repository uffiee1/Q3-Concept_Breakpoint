using System;
using System.Collections.Generic;
using DAL;
using Model;

namespace Logic
{
    public class StatusBusiness
    {
        MonitoringData moniDAL = new MonitoringData();
        List<Model.StatusModel> statuses;
        List<MonitoringDataModel> monitoringDataModels;
        int offMargin = 500;

        public List<StatusModel> setStatus(DateTime startDate, DateTime endDate, int board, int port)
        {
            return ConvertToStatus(monitoringDataModels = moniDAL.GetMonitoritingData(startDate, endDate, board, port), endDate, startDate);
        }

        public List<StatusModel> ConvertToStatus(List<MonitoringDataModel> monitoringDataModels, DateTime endDate, DateTime startDate)//werkt
        {
            if (monitoringDataModels.Count <= 0)
                return new List<StatusModel>();

            string status = "";
            List<StatusModel> statuses = new List<StatusModel>();
            DateTime startTime = monitoringDataModels[0].TimeStamp;
            int entries = 0;
            bool currentStatus = true;
            bool previousStatus = ((monitoringDataModels[0].TimeStamp - monitoringDataModels[1].TimeStamp).TotalSeconds < offMargin);


            for (int i = 1; i < monitoringDataModels.Count; i++)//loop door monitoring data
            {
                currentStatus = (monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp).TotalSeconds < offMargin;//bepaald of verschil te groot is

                if (currentStatus != previousStatus || i == monitoringDataModels.Count)//anders dan vorige entry -> nieuwe status
                {
                    status = !currentStatus ? "on" : "off";

                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));

                    //setup volgende status
                    previousStatus = currentStatus;
                    startTime = monitoringDataModels[i - 1].TimeStamp;//timestamp van vorige entry
                    entries = 0;
                }
                entries++;

                if (i >= monitoringDataModels.Count - 1)
                {
                    status = currentStatus ? "on" : "off";
                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));
                }
            }

            if (statuses[statuses.Count - 1].End__Time <= (endDate.AddSeconds(offMargin * -1)))
            {
                statuses.Add(CreatestatusModel(statuses[statuses.Count - 1].End__Time, endDate, "off", 1, (endDate - statuses[statuses.Count - 1].End__Time).TotalSeconds));//final status
            }

            if(statuses[0].StartTime.AddSeconds(offMargin * -1) >= startDate)
            {
                statuses.Insert(0,CreatestatusModel(startDate, statuses[0].StartTime, "off", 1, (statuses[0].StartTime - startDate).TotalSeconds));//final status
            }

            return statuses;
        }


        StatusModel CreatestatusModel(DateTime startTime, DateTime endTime, string description, int entries, double duration)
        {
            return new StatusModel() { StartTime = startTime, End__Time = endTime, Description = description, Entries = entries, Duration = duration };
        }

        public List<Model.ProductionLineModel> GetProductionLines()
        {
            DAL.ProductionLine pl = new DAL.ProductionLine();
            return pl.GetProductionLines(); ;
        }
        public Model.ProductionLineModel GetProductionLine(int board, int port)
        {
            DAL.ProductionLine pl = new DAL.ProductionLine();
            return pl.GetProductionLine(board, port); ;
        }
    }
}
