const Table = require('../models/table');

exports.tables = async(req, res, next) => {

    const { category } = req.body;
    console.log(category);

    try {
        const user = await Table.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};