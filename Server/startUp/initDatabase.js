const Categorie = require("../models/Categories");
const Manufacturer = require("../models/Manufacturer");
const categoriesMock = require("../mock/category.json");
const manufacturerMock = require("../mock/manufacturers.json");

module.exports = async () => {
  const categories = await Categorie.find();
  const manufacturer = await Manufacturer.find();

  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Categorie, categoriesMock);
  }

  if (manufacturer.length !== manufacturerMock.length) {
    await createInitialEntity(Manufacturer, manufacturerMock);
  }

};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
