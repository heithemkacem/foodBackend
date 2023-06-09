const Dish = require("../models/dish");
const Category = require("../models/categories");


exports.createDish = async(req, res, next) => {

    const { name, description, price, category, cat_id } = req.body;
    console.log(req.body, name, description, price, category, cat_id);
    try {

        const cat = await Category.findOne({ category });
        console.log("category", cat);
        const dish = await Dish.create(req.body);
        res.status(201).json({
            success: true,
            dish
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

};