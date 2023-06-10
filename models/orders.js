const mongoose = require("mongoose");


const orders = new mongoose.Schema({

    "table_number": {
        type: Number,
        allowNull: true,
        // required: true
    },
    "id_dishes": {
        type: JSON,
        required: true
    },
    "total_price": {
        type: String,
        maxlength: 255,
        required: true
    },
    "client_name": {
        type: String,
        maxlength: 50,
        allowNull: true,
    },
    "client_email": {
        type: String,
        maxlength: 50,
        allowNull: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"
        ]
    },
    "date_order": {
        type: Date,
        default: Date.now('YYYY-DD-MM')
    },
    "status": {
        type: Number,
        required: true,
        default: 1
    }

}, { timestamps: true });

module.exports = mongoose.model("qr_orders", orders);