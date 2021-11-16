using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;
using Model;

namespace Logic
{
    public class StatusBusiness
    {
        private MonitoringData _moniDAL = new MonitoringData();
        private CounterReading _counterReading = new CounterReading();

        private DateTime _lastUpdate = new DateTime(1970, 01, 01);
        private int _updateFrequency = 21600;

        private int _machineOfflineMargin = 500;

        public List<StatusModel> setStatus(DateTime startDate, DateTime endDate, int board, int port, int treeviewId)
        {
            List<StatusModel> counterReadings = _counterReading.GetCounterReadings(treeviewId);

            if (counterReadings.Count <= 0)
            {
                return ConvertToStatus(_moniDAL.GetMonitoritingData(board, port), endDate, startDate, treeviewId);
            }
            else
            {
                return FilterStatuses(counterReadings, startDate, endDate);
            }
        }

        public List<StatusModel> ConvertToStatus(List<MonitoringDataModel> monitoringDataModels, DateTime endDate, DateTime startDate, int treeviewId, List<StatusModel> statusesExisting = null)
        {
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
                                  _machineOfflineMargin;

            // loop door monitoring data
            for (int i = 1; i < monitoringDataModels.Count; i++)
            {
                // bepaald of verschil te groot is
                currentStatus = (monitoringDataModels[i].TimeStamp - monitoringDataModels[i - 1].TimeStamp).TotalSeconds < _machineOfflineMargin;
                entries++;

                // anders dan vorige entry -> nieuwe status
                if (currentStatus != previousStatus || i == monitoringDataModels.Count)
                {
                    if (currentStatus)
                    {
                        status = "off";
                        entries = 1;
                    }
                    else
                    {
                        status = "on";
                    }
                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i - 1].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));

                    // setup volgende status
                    previousStatus = currentStatus;

                    // timestamp van vorige entry
                    startTime = monitoringDataModels[i - 1].TimeStamp;
                }

                // laatste status
                if (i >= monitoringDataModels.Count - 1)
                {
                    entries++;
                    status = currentStatus ? "on" : "off";
                    if (status == "off")
                    {
                        entries = 1;
                    }
                    statuses.Add(CreatestatusModel(startTime, monitoringDataModels[i].TimeStamp, status, entries, (monitoringDataModels[i - 1].TimeStamp - startTime).TotalSeconds));
                }
            }

            // laatste status bij gap wanneer uit
            if (statuses[statuses.Count - 1].End__Time <= endDate.AddSeconds(_machineOfflineMargin * -1))
            {
                statuses.Add(CreatestatusModel(statuses[statuses.Count - 1].End__Time, endDate, "off", 1, (endDate - statuses[statuses.Count - 1].End__Time).TotalSeconds));
            }

            // eerste status bij gap wanneer uit
            if (statuses[0].StartTime.AddSeconds(_machineOfflineMargin * -1) >= startDate)
            {
                statuses.Insert(0, CreatestatusModel(startDate, statuses[0].StartTime, "off", 1, (statuses[0].StartTime - startDate).TotalSeconds));
            }

            // update bestaande tellerstanden wanneer statusesExisting wordt meegegeven
            if (statusesExisting != null && statusesExisting.Count > 0)
            {
                if (_lastUpdate < DateTime.Now.AddSeconds(_updateFrequency * -1))
                {
                    _lastUpdate = DateTime.Now;
                    _counterReading.UpdateStatuses(statuses, treeviewId);
                }
            }

            // insert nieuwe tellerstanden
            else
            {
                _lastUpdate = DateTime.Now;
                Task.Run(() => _counterReading.InsertData(statuses, treeviewId));
            }
            return FilterStatuses(statuses, startDate, endDate);
        }

        private List<StatusModel> FilterStatuses(List<StatusModel> statuses, DateTime startDate, DateTime endDate)
        {
            List<StatusModel> filteredStatus = new List<StatusModel>();

            if (statuses.Count > 0)
            {
                foreach (StatusModel status in statuses)
                {
                    if (status.End__Time > startDate && status.StartTime < endDate)
                    {
                        filteredStatus.Add(status);
                    }
                }

                if (filteredStatus.Count > 0)
                {
                    if (filteredStatus[0].StartTime < startDate)
                    {
                        filteredStatus[0].StartTime = startDate;
                        filteredStatus[0].Duration = (filteredStatus[0].End__Time - filteredStatus[0].StartTime).TotalSeconds;
                    }

                    if (filteredStatus[filteredStatus.Count - 1].End__Time > endDate)
                    {
                        filteredStatus[filteredStatus.Count - 1].End__Time = endDate;
                        filteredStatus[filteredStatus.Count - 1].Duration = (filteredStatus[filteredStatus.Count - 1].End__Time - filteredStatus[filteredStatus.Count - 1].StartTime).TotalSeconds;
                    }
                }
            }
            return filteredStatus;
        }

        /// <summary>
        /// converts data to statusmodel.
        /// </summary>
        private StatusModel CreatestatusModel(DateTime startTime, DateTime endTime, string description, int entries, double duration)
        {
            return new StatusModel() { StartTime = startTime, End__Time = endTime, Description = description, Entries = entries, Duration = duration };
        }
    }
}
