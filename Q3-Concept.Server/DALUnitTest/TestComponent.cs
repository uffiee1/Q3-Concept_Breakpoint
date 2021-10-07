using Microsoft.VisualStudio.TestTools.UnitTesting;
using Model;
using DAL;

namespace DALUnitTest
{
    [TestClass]
    public class TestComponent
    {
        private readonly Components  _dalComponents = new Components();
        [TestMethod]
        public void GetGoodComponent()
        {
            ComponentDataModel component = new ComponentDataModel();

            ComponentDataModel testcomponent = _dalComponents.GetComponent(247);
            //Model.ComponentDataModel component = new Model.ComponentDataModel() { }
            Assert.IsNotNull(testcomponent);
            Assert.AreEqual(component, testcomponent);
        }
    }
}
