const mongoose = require("mongoose");

const images = new mongoose.Schema(
  {
    id_dish: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("qr_images", images);
