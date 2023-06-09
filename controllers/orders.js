const orders = require("../models/orders");
const Dish = require("../models/dish");
const FCM = require('fcm-node');
const server_key = require("../FireBaseConfig");
const fcmServerKey = new FCM(server_key.SERVER_KEY);


//create a new order
exports.createOrder = async(req, res, next) => {

    const { table_number, id_dishes, quantity, total_price, client_name, client_email, date_order } = req.body;
    console.log(table_number, id_dishes, quantity, total_price, client_name, client_email, date_order);
    try {
        const dishs_name = [];
        for (let i = 0; i < id_dishes.length; i++) {
            const find_name = await Dish.findById(id_dishes[i]);

            dishs_name.push({ "name": find_name.name, "description": find_name.description, "price": find_name.price });
        }

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


//getOrders
exports.getOrders = async(req, res, next) => {

    const date_order = req.body.date_order;
    try {
        const order = await orders.find({ date_order: date_order });

        PushNotifications("idAMq6K8wibcgqLWNp_jCt");
        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

};


// Push Notification
const PushNotifications = async(device_token) => {


    const message = {
        to: device_token,
        notification: {
            title: "test notification",
            body: "test notification body",
        },

        data: {
            title: "data notification",
            body: '{"order":"456", "description":"Hot dish", "status": "pending"}'
        }
    };

    fcmServerKey.send(message, function(err, response) {
        if (err) {
            console.log('somthing has gone wrong!', err);
            console.log('response', response);
        } else {
            console.log("success!", response);
        }
    });

};