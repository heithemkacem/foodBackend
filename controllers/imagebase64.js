const imagebase64 = require('../models/imagebase64');
const nodeBase64 = require('nodejs-base64-converter');


exports.uploadImage = async(req, res, next) => {

    const image = req.body.image;
    try {
        const base64 = await imagebase64.create(req.body);
        const decodebase64 = nodeBase64.decode(image);

        res.status(201).json({ success: true, link: decodebase64 });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}