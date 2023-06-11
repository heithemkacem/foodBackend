const imagebase64 = require('../models/imagebase64');


exports.uploadImage = async(req, res, next) => {

    console.log(req.body);
    try {
        const base64 = await imagebase64.create(req.body);
        res.status(201).json({ success: true, base64 });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}