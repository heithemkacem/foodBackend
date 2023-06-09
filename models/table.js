// const Sequelize = require("sequelize");
const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema((sequelize, DataTypes) => {
    return sequelize.define({
        numero: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nbrePersonne: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        zone_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        libre: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM("carré", "rond"),
            allowNull: true,
        },
    }, { timestamps: true });
});

module.exports = mongoose.model("qr_tables", TableSchema);