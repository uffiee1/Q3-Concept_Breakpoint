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
            return ConvertToStatus(monitoringDataModels = moniDAL.GetMonitoritingData(startDate, endDate, board, port));
        }

        public List<StatusModel> ConvertToStatusModels(List<MonitoringDataModel> monitoringDataModels)//monitoring datamodels -> statusses
        {

            List<Model.StatusModel> statuses = new List<StatusModel>();

            StatusModel status = new StatusModel();

            for (int i = 1; i < monitoringDataModels.Count; i++)
            {
                //if it is the first item fill in the starttime
                if (i == 1) status.StartTime = monitoringDataModels[i - 1].TimeStamp;

                //timespan contains the difference between two datetimes
                TimeSpan difference = monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp;

                //.TotalSeconds converts the timespan to a second integer
                if (difference.TotalSeconds > offMargin)
                {
                    //adds the endtime and puts the new status in to the list
                    status.End__Time = monitoringDataModels[i - 1].TimeStamp;
                    statuses.Add(status);

                    //checks if it is not the last point of data. If not create a new status 
                    if (i < monitoringDataModels.Count)
                    {
                        status = new StatusModel();
                        status.StartTime = monitoringDataModels[i].TimeStamp;
                    }
                }

                //if it is the last point of data. add an endtime
                if (i == monitoringDataModels.Count)
                {
                    status.End__Time = monitoringDataModels[i].TimeStamp;
                    statuses.Add(status);
                }
            }

            return statuses;
        }


        public List<StatusModel> ConvertToStatus(List<MonitoringDataModel> monitoringDataModels)//werkt
        {
            string status="";
            List<StatusModel> statuses2 = new List<StatusModel>();
            DateTime startTime = monitoringDataModels[0].TimeStamp;
            int entries = 0;
            bool currentStatus = true;
            bool previousStatus = ((monitoringDataModels[0].TimeStamp - monitoringDataModels[1].TimeStamp).TotalSeconds < offMargin);


            for (int i = 1; i < monitoringDataModels.Count; i++)//loop door monitoring data
            {
                currentStatus = (monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp).TotalSeconds < offMargin;//bepaald of verschil te groot is

                if (currentStatus != previousStatus||i==monitoringDataModels.Count)//anders dan vorige entry -> nieuwe status
                {
                    status = !currentStatus ? "on" : "off";
                    
                    statuses2.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));

                    //setup volgende status
                    previousStatus = currentStatus;
                    startTime = monitoringDataModels[i-1].TimeStamp;//timestamp van vorige entry
                    entries = 0;
                }
                entries++;
            }
            //haal weg
            currentStatus = (monitoringDataModels[monitoringDataModels.Count-1].TimeStamp - monitoringDataModels[monitoringDataModels.Count - 2].TimeStamp).TotalSeconds < offMargin;//bepaald of verschil te groot is
            status = !currentStatus ? "on" : "off";

            statuses2.Add(CreatestatusModel(startTime, monitoringDataModels[monitoringDataModels.Count-1].TimeStamp, status, entries, (monitoringDataModels[monitoringDataModels.Count - 1].TimeStamp - startTime).TotalSeconds));//final status

            return statuses2;
        }


        StatusModel CreatestatusModel(DateTime startTime, DateTime endTime, string description,  int entries, double duration)
        {
            return new StatusModel() { StartTime = startTime, End__Time = endTime, Description = description, Entries = entries, Duration = duration };
        }
    }
}
