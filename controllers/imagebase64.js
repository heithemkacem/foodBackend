const imagebase64 = require("../models/imagebase64");
const nodeBase64 = require("nodejs-base64-converter");
const fs = require("fs");
const path = require("path");
const Buffer = require("buffer").Buffer;

exports.uploadImage = async (req, res, next) => {
  // const image = req.body.image;
  // try {
  //     const base64 = await imagebase64.create(req.body);
  //     const decodebase64 = nodeBase64.decode(image);

  const image = req.body.image;
  console.log(image);

  try {
    const base64 = await imagebase64.create(req.body);

    // if (typeof Buffer.from === "function") {

    // Node 5.10+
    buf = Buffer.from(image, "base64");

    // } else {
    //     // older Node versions, now deprecated
    //     buf = new Buffer(image, 'base64');
    // }
    console.log("buf =", buf.toString());
    // fs.writeFileSync(path.resolve(__dirname, '../uploadimages/mock_img.text'), buf, "binary");

    // const jpegImage = fs.readFileSync(path.resolve(__dirname, '../uploadimages/mock_img.text'));
    // console.log('jpegImage =', jpegImage);

    res.status(201).json({ success: true, image: buf.toString() });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
