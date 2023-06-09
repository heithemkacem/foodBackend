const Categories = require('../models/categories');


//create category
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


//get category
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


//update category
exports.updateCategory = async(req, res, next) => {

    try {

        const cat = await Categories.findByIdAndUpdate({ _id: req.body.id }, req.body);

        const updatedCategory = await Categories.find({ _id: req.body.id });

        res.status(201).json({
            success: true,
            updatedCategory
        })

    } catch (error) {
        console.log(error);
        next(error);

    }
};

//delete a category 
exports.DeleteCategory = async(req, res, next) => {


    try {

        const cat = await Categories.findByIdAndRemove({ _id: req.body.id });

        res.status(201).json({
            success: true,
            message: "Category deleted successfully"
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

};