using Microsoft.VisualStudio.TestTools.UnitTesting;
using Model;
using DAL;

namespace DALUnitTest
{
    [TestClass]
    public class ComponentTests
    {
        private readonly Components  _dalComponents = new Components();
        [TestMethod]
        public void GetGoodComponent()
        {
            //act 
            ComponentDataModel component = new ComponentDataModel()
            {
                ID = 276,
                Name = "41301",
                Description="Deksel 173 4V"
            };
            //arrange
            ComponentDataModel testcomponent = _dalComponents.GetComponent(276);

            //assert
            Assert.IsNotNull(testcomponent);
            Assert.AreEqual(component.Description, testcomponent.Description);
        }
    }
}
