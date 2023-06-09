const orders = require("../models/orders");

exports.createOrder = async(req, res, next) => {

    const { table_number, id_dishes, quantity, total_price, client_name, client_email, date_order } = req.body;
    console.log(table_number, id_dishes, quantity, total_price, client_name, client_email, date_order);
    try {

        const order = await orders.create(req.body);
        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        console.log(error);
        next(error);

    }
};