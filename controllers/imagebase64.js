const imagebase64 = require('../models/imagebase64');
const nodeBase64 = require('nodejs-base64-converter');
const fs = require('fs');
const path = require('path');
const Buffer = require('buffer').Buffer;

exports.uploadImage = async(req, res, next) => {

    // const image = req.body.image;
    // try {
    //     const base64 = await imagebase64.create(req.body);
    //     const decodebase64 = nodeBase64.decode(image);

    //     res.status(201).json({ success: true, link: decodebase64 });
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({ success: false, message: error.message });
    // }

    const image = req.body.image;
    console.log(image);

    try {
        const base64 = await imagebase64.create(req.body);
        console.log(typeof Buffer.from === "function");
        if (typeof Buffer.from === "function") {

            buf = Buffer.from(image, 'base64'); // Ta-da

        } else {
            // older Node versions, now deprecated
            buf = new Buffer(image, 'base64'); // Ta-da
        }
        console.log('buf =', buf.toString());
        fs.writeFileSync(path.resolve(__dirname, '../uploadimages/mock_img.text'), buf, "binary");

        const jpegImage = fs.readFileSync(path.resolve(__dirname, '../uploadimages/mock_img.text'));
        console.log('jpegImage =', jpegImage);

        res.status(201).json({ success: true, image: buf.toString() });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }

    // const base64Image = req.body.image;

    // Save the image and get the generated file name
    // const fileName = saveImage(base64Image);
    // console.log('fileName', fileName);
    // Generate the link using the file name
    // const imageLink = req.protocol; //${req.get('host')}/images/${fileName};


    // res.status(201).json({ success: true, link: imageLink });
}



// Decode the base64 image string and save it as a file
function saveImage(base64Data) {
    console.log('saveImage', base64Data);
    const imageData = Buffer.from(base64Data, 'base64');
    console.log('imageData', imageData);
    const fileName = "image_".jpg;
    console.log('fileName', fileName);
    const filePath = path.join(__dirname, 'public', 'images', fileName);
    console.log('filePath', filePath);
    // fs.writeFileSync(filePath, imageData);

    return fileName;
}