const mongoose = require("mongoose");

const payment = new mongoose.Schema((sequelize, DataTypes) => {
    return sequelize.define({
        client_id: {
            type: DataTypes.INTEGER,
            required: true,
        },
        pay_method: {
            type: DataTypes.STRING(255),
            required: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            required: true,
        },
    }, { timestamps: true });
});

module.exports = mongoose.model("qr_payments", payment);