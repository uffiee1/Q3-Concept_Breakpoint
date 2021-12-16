using Logic;
using Model;
using System;
using System.Collections.Generic;
using Xunit;

namespace BackendTests
{
    public class StatusTests
    {
        [Theory]
        [MemberData(nameof(ConvertToStatusData))]
        public void TestConvertToStatus(List<MonitoringDataModel> monitoringDataModels, DateTime startDate, DateTime endDate, int treeviewId, List<StatusModel> expected)
        {
            //arrange
            StatusBusiness statusBusiness = new StatusBusiness();

            //act
            List<StatusModel> result = statusBusiness.ConvertToStatus(monitoringDataModels, endDate, startDate, treeviewId);

            //assert
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.Equal(expected[i].StartTime, result[i].StartTime);
                Assert.Equal(expected[i].End__Time, result[i].End__Time);
                Assert.Equal(expected[i].Description, result[i].Description);
                Assert.Equal(expected[i].Entries, result[i].Entries);
            }
        }

        public static IEnumerable<object[]> ConvertToStatusData()
        {
            return new List<object[]>
            {
                new object[]{//onderscheid aan & uit
                    new List<MonitoringDataModel>
                    {
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 10) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 20) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 1, 0, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 1, 1, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 1, 2, 0) }
                    },
                    new DateTime(2020, 9, 10, 0, 0, 0),
                    new DateTime(2020, 9, 10, 1, 2, 0),
                    378,
                    new List<StatusModel>
                    {
                        new StatusModel{ StartTime = new DateTime(2020, 9, 10, 0, 0, 0), End__Time=new DateTime(2020, 9, 10, 0, 0, 20), Description="on", Entries = 3},
                        new StatusModel{ StartTime = new DateTime(2020, 9, 10, 0, 0, 20), End__Time =new DateTime(2020, 9, 10, 1, 0, 0), Description = "off", Entries= 1},
                        new StatusModel{ StartTime = new DateTime(2020, 9, 10, 1, 0, 0) , End__Time= new DateTime(2020, 9, 10, 1, 2, 0), Description = "on", Entries = 3}
                    }
                },
                new object[]{//laatste 1 uit
                    new List<MonitoringDataModel>
                    {
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 10) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 1, 0, 20) },

                    },
                    new DateTime(2020, 9, 10, 0, 0, 0),
                    new DateTime(2020, 9, 10, 1, 0, 20),
                    378,
                    new List<StatusModel>
                    {
                        new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 10, 0, 0, 0),
                            End__Time = new DateTime(2020, 9, 10, 0, 0, 10),
                            Description = "on",
                            Entries = 2
                        },
                        new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 10, 0, 0, 10),
                            End__Time =  new DateTime(2020, 9, 10, 1, 0, 20),
                            Description = "off",
                            Entries= 1
                        },
                    }
                },
                new object[]{//endtime gap
                    new List<MonitoringDataModel>
                    {
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 10) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 20) },
                    },
                    new DateTime(2020, 9, 10, 0, 0, 0),
                    new DateTime(2020, 9, 10, 1, 0, 0),
                    378,
                    new List<StatusModel>
                    {
                        new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 10, 0, 0, 0),
                            End__Time =  new DateTime(2020, 9, 10, 0, 0, 20),
                            Description = "on",
                            Entries= 3
                        },
                         new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 10, 0, 0, 20),
                            End__Time =  new DateTime(2020, 9, 10, 1, 0, 0),
                            Description = "off",
                            Entries= 1
                        },
                    }
                },
                new object[]{//starttime gap
                    new List<MonitoringDataModel>
                    {
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 0) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 10) },
                        new MonitoringDataModel{TimeStamp = new DateTime(2020, 9, 10, 0, 0, 20) },
                    },
                    new DateTime(2020, 9, 9, 0, 0, 0),
                    new DateTime(2020, 9, 10, 0, 0, 20),
                    378,
                    new List<StatusModel>
                    {
                         new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 9, 0, 0, 0),
                            End__Time =  new DateTime(2020, 9, 10, 0, 0, 0),
                            Description = "off",
                            Entries= 1
                        },
                        new StatusModel
                        {
                            StartTime = new DateTime(2020, 9, 10, 0, 0, 0),
                            End__Time =  new DateTime(2020, 9, 10, 0, 0, 20),
                            Description = "on",
                            Entries= 3
                        },
                    }
                }
            };
        }
    }
}
