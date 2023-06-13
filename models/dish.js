const mongoose = require("mongoose");
const fs = require("fs");

const dishs = new mongoose.Schema(
  {
    cat_id: {
      type: String,
      maxlength: 255,
      allowNull: false,
    },
    category: {
      type: String,
      maxlength: 50,
      allowNull: false,
    },
    name: {
      type: String,
      maxlength: 50,
      allowNull: false,
    },
    description: {
      type: String,
      maxlength: 255,
      allowNull: true,
    },
    price: {
      type: String,
      allowNull: true,
      defaultValue: 0,
    },
    tva: {
      type: String,
      allowNull: true,
      defaultValue: 10,
    },
    image: {
      type: String,
      allowNull: true,
      defaultValue: "default.png",
    },
    position: {
      type: Number,
      allowNull: false,
      defaultValue: 9999,
    },
    active: {
      type: Number,
      allowNull: false,
      defaultValue: 1,
    },
    code: {
      type: String,
      maxlength: 50,
      allowNull: true,
      defaultValue: "changer-code",
    },
  },
  { timestamps: true }
);

dishs.pre("save", async function (next) {
  // Create directory for this user
  const dir = `${process.env.FILE_UPLOAD_PATH}/dishes/${this._id}/images`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

module.exports = mongoose.model("qr_dishs", dishs);
