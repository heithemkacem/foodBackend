const Dish = require("../models/dish");
const Category = require("../models/categories");

exports.createDish = async (req, res, next) => {
  const { name, description, price, category, cat_id } = req.body;
  console.log(req.body, name, description, price, category, cat_id);
  try {
    const cat = await Category.findOne({ category });
    console.log("category", cat);
    const dish = await Dish.create(req.body);
    res.status(201).json({
      success: true,
      dish,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get dish function
exports.getDishes = async (req, res, next) => {
  try {
    const cat_id = req.body.cat_id;

    if (!cat_id) {
      const dish = await Dish.find();
      res.status(201).json({
        success: true,
        dish,
      });
    } else {
      const dish = await Dish.find({ cat_id: cat_id });
      res.status(201).json({
        success: true,
        dish,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//update category
exports.UpdateDish = async (req, res, next) => {
  const { name, description, price, category, cat_id, _id } = req.body;
  try {
    const dish = await Dish.findByIdAndUpdate(_id, req.body);

    const updatedDish = await Dish.find({ _id: _id });

    res.status(201).json({
      success: true,
      updatedDish,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//delete a dish
exports.DeleteDish = async (req, res, next) => {
  const { name, description, price, category, cat_id } = req.body;
  console.log(req.body, name, description, price, category, cat_id);

  try {
    const dish = await Dish.findByIdAndRemove({ _id: req.body.id });

    res.status(201).json({
      success: true,
      message: "Dish deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
