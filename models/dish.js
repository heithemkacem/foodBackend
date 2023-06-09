const mongoose = require("mongoose");

const dishs = new mongoose.Schema({
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
        maxlength: 255,
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
}, { timestamps: true });

module.exports = mongoose.model("qr_dishs", dishs);