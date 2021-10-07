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

        public List<StatusModel> setStatus()
        {
            return ConvertToStatus(monitoringDataModels = moniDAL.GetMonitoritingData(new DateTime(2001, 09, 1, 0, 0, 0), new DateTime(2077, 09, 30, 1, 0, 0), 1, 22));
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
                    status.EndTime = monitoringDataModels[i - 1].TimeStamp;
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
                    status.EndTime = monitoringDataModels[i].TimeStamp;
                    statuses.Add(status);
                }
            }

            return statuses;
        }



        //delete this
        public List<StatusModel> ConvertToStatus(List<MonitoringDataModel> monitoringDataModels)//off heeft maar een entry (langere tijd dan margin) dus start en eindtijd zijn hetzlfde
        {
            string status;
            List<StatusModel> statuses2 = new List<StatusModel>();

            Nullable<bool> previousStatus = null;
            Nullable<DateTime> startTime = monitoringDataModels[0].TimeStamp;


            for (int i = 1; i < monitoringDataModels.Count; i++)
            {

                bool currentStatus = (monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp).TotalSeconds < offMargin;//verschile te groot of niet

                if (previousStatus == null) { previousStatus = currentStatus; }
                
                
                if (currentStatus != previousStatus)//anders dan vorige entry
                {
                    status = currentStatus? "on" : "off";//endtime eerste entry die niet te lang duurt na status maakt status
                    statuses2.Add(new StatusModel()//status maken bij eerste entry die niet overeenkomt werkt bij off maar niet bij on//doe bij laatste die niet overeenkomt
                    {
                        EndTime = monitoringDataModels[i-1].TimeStamp,
                        Description = status,
                        StartTime = (DateTime)startTime
                    });

                    //setup volgende status
                    previousStatus = currentStatus;
                    startTime = monitoringDataModels[i-1].TimeStamp;

                }
            }
            return statuses2;
        }

    }
}
