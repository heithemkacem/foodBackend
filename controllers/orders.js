const orders = require("../models/orders");
const Dish = require("../models/dish");

exports.createOrder = async(req, res, next) => {

    const { table_number, id_dishes, quantity, total_price, client_name, client_email, date_order } = req.body;
    console.log(table_number, id_dishes, quantity, total_price, client_name, client_email, date_order);
    try {
        const dishs_name = [];
        for (let i = 0; i < id_dishes.length; i++) {
            const find_name = await Dish.findById(id_dishes[i]);
            console.log("find name" + find_name);
            dishs_name.push({ "name": find_name.name, "description": find_name.description, "price": find_name.price });
        }
        console.log("dishs_name" + dishs_name);
        req.body.dishes_info = dishs_name;
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

exports.getOrders = async(req, res, next) => {

    const date_order = req.body.date_order;
    console.log(date_order);
    try {
        const order = await orders.find({ date_order: date_order });
        console.log(order);
        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        console.log(error);
        next(error);

    }
};