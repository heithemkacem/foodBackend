// const Sequelize = require("sequelize");
const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({
    // cat_id: {
    //     autoIncrement: true,
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //   },
    //   user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //   },
    cat_name: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    cat_order: {
        type: Number,
        allowNull: true,
    },
    slug: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    icon: {
        type: String,
        maxlength: 255,
        allowNull: false,
        defaultValue: "fa-usd",
    },
    picture: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    state: {
        type: Number,
        allowNull: false,
        defaultValue: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model("qr_categories", CategoriesSchema);