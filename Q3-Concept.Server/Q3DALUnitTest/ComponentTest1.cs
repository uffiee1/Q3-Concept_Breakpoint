using DAL;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Model;

namespace Q3DALUnitTest
{
    [TestClass]
    public class ComponentTest1
    {
        
        private readonly Components components = new Components();
        [TestMethod]
        public void TestValidGetComponent()
        {
            ComponentDataModel checkComponent = new ComponentDataModel()
            {

            };

            ComponentDataModel dbComponent = components.GetComponent(264);

            Assert.IsNotNull(dbComponent);
        }
    }
}
