const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClientSchema = new mongoose.Schema({
    nom_prenom: {
        type: String,
        maxlength: 35,
        allowNull: true,
    },
    ville: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    telephone: {
        type: String,
        maxlength: 12,
        allowNull: true,
    },
    adresse: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    email: {
        type: String,
        maxlength: 255,
        required: [true, "Please enter a valid email address"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a Password'],
        minlength: [6, 'password must have at least six(6) characters'],
    },
    societe: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    code_1: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    code_2: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    interphone: {
        type: Number,
        allowNull: true,
    },
    etage: {
        type: Number,
        allowNull: true,
    },
    // supprimer: {
    //     type: DataTypes.TINYINT,
    //     allowNull: true,
    // },
    user_id: {
        type: String,
        maxlength: 255,
        allowNull: true,
    },
    code_postal: {
        type: Number,
        allowNull: true,
    },
}, { timestamps: true });


// encrypt password befor saving
ClientSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// verify password
ClientSchema.methods.comparePassword = async function(yourPassword) {
    return await bcrypt.compare(yourPassword, this.password);
}

// get the token
ClientSchema.methods.jwtGenerateToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}
module.exports = mongoose.model("qr_clients", ClientSchema);