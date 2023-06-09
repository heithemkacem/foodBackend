const Categories = require('../models/categories');



exports.createCategory = async(req, res, next) => {


    const { category } = req.body;
    console.log(req.body);
    const catExists = await Categories.findOne({ cat_name: category });
    console.log(catExists);
    if (catExists) {
        return res.status(400).json({ success: false, message: 'category is exist!' });
    }
    try {
        const user = await Categories.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }

}

exports.getcategory = async(req, res, next) => {

    try {
        const categories = await Categories.find();
        res.status(201).json({
            success: true,
            categories
        })

    } catch (error) {
        console.log(error);
        next(error);

    }
};