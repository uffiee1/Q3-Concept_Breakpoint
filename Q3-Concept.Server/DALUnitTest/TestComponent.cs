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
            ComponentDataModel component = new ComponentDataModel()
            {
                ID = 276,
                Name = "41301",
                Description="Deksel 173 4V"
            };

            ComponentDataModel testcomponent = _dalComponents.GetComponent(276);
            //Model.ComponentDataModel component = new Model.ComponentDataModel() { }
            Assert.IsNotNull(testcomponent);
            Assert.AreEqual(component.Description, testcomponent.Description);
        }
    }
}
