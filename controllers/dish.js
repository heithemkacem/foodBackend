const Dish = require("../models/dish");
const Category = require("../models/categories");
const sharp = require("sharp");
const rimraf = require("rimraf");
const fs = require("fs");

exports.createDish = async (req, res, next) => {
  const { name, description, price, category, cat_id } = req.body;
  const image = req.files.image;

  if (!req.files) {
    return next("Dish image is required!");
  }
  if (!image.mimetype.startsWith("image")) {
    return next(
      `Can't upload this type of file (${image.mimetype})`,
      400,
      "WRONG_FILE_TYPE"
    );
  }

  try {
    const cat = await Category.findOne({ category });
    console.log("category", cat);

    const dish = await Dish.create(req.body);

    image.name = `${Date.now()}-${image.name}`;
    const dir = `${process.env.FILE_UPLOAD_PATH}/dishes/${dish._id}/images`;
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      await sharp(image.data)
        .webp({ lossless: false })
        .toFile(`${dir}/${image.name}`);
      dish.image = `dishes/${dish._id}/images/${image.name}`;
    } catch (error) {
      console.log(error);
      return next(`Problem with file upload`, 500, "UPLOAD_PROBLEM");
    }

    await dish.save();
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
  const { name, description, price, category, cat_id, id } = req.body;
  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      return next(`Dish not found with id of ${_id}`, 404, "NOT_FOUND");
    }

    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.cat_id = cat_id;

    if (req.files) {
      const image = req.files.image;
      const dir = `${process.env.FILE_UPLOAD_PATH}/dishes/${dish._id}/images`;

      // delete old image
      if (fs.existsSync(dir)) rimraf.sync(dir);
      fs.mkdirSync(dir);

      if (!image.mimetype.startsWith("image")) {
        return next(
          `Can't upload this type of file (${image.mimetype})`,
          400,
          "WRONG_FILE_TYPE"
        );
      }
      image.name = `${Date.now()}-${image.name}`;
      try {
        await sharp(image.data)
          .webp({ lossless: false })
          .toFile(`${dir}/${image.name}`);
        dish.image = `dishes/${dish._id}/images/${image.name}`;
      } catch (error) {
        console.log(error);
        return next(`Problem with file upload`, 500, "UPLOAD_PROBLEM");
      }
    }

    await dish.save();

    res.status(201).json({
      success: true,
      updatedDish: dish,
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

    const dir = `${process.env.FILE_UPLOAD_PATH}/dishes/${dish._id}/images`;
    if (fs.existsSync(dir)) rimraf.sync(dir);

    res.status(201).json({
      success: true,
      message: "Dish deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
