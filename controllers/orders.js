const orders = require("../models/orders");
const Dish = require("../models/dish");
const FCM = require("fcm-node");
const server_key = require("../FireBaseConfig");
const fcmServerKey = new FCM(server_key.SERVER_KEY);

//create a new order
exports.createOrder = async (req, res, next) => {
  const {
    table_number,
    id_dishes,
    quantity,
    total_price,
    client_name,
    client_email,
    date_order,
  } = req.body;
  console.log(id_dishes);
  try {
    const dishs_name = [];
    id_dishes.map(async (item) => {
      const find_name = await Dish.findById(item._id);
      dishs_name.push({
        name: find_name.name,
        description: find_name.description,
        price: find_name.price,
      });
    });

    req.body.dishes_info = dishs_name;
    const order = await orders.create(req.body);
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//getOrders
exports.getOrders = async (req, res, next) => {
  const { date_order, status } = req.body;
  try {
    let order;
    if (!status) {
      order = await orders.find({ date_order: date_order });
    } else {
      order = await orders.find({ date_order: date_order, status: status });
    }

    PushNotifications("idAMq6K8wibcgqLWNp_jCt");
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update Order
exports.updateOrder = async (req, res, next) => {
  try {
    const { id_order } = req.body;

    const orderStatus = await orders.findById(id_order);

    if (orderStatus.status == 1) {
      const order = await orders.findByIdAndUpdate({ _id: id_order }, req.body);

      const updatedOrder = await orders.find({ _id: id_order });
      res.status(201).json({
        success: true,
        updatedOrder,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Order is already done!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete Order
exports.deleteOrder = async (req, res, next) => {
  try {
    const { id_order } = req.body;

    const orderStatus = await orders.findById(id_order);
    console.log("orderStatus =", orderStatus);

    if (orderStatus.status == 1) {
      const order = await orders.findByIdAndRemove({ _id: id_order }, req.body);

      res.status(201).json({
        success: true,
        message: "Order deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Order is already done!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Confirm order
exports.confirmOrder = async (req, res, next) => {
  try {
    const { id_order } = req.body;
    const order = await orders.findByIdAndUpdate({ _id: id_order }, req.body);
    res.status(201).json({
      success: true,
      message: "Order confirmed successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Push Notification
const PushNotifications = async (device_token) => {
  const message = {
    to: device_token,
    notification: {
      title: "test notification",
      body: "test notification body",
    },

    data: {
      title: "data notification",
      body: '{"order":"456", "description":"Hot dish", "status": "pending"}',
    },
  };

  fcmServerKey.send(message, function (err, response) {
    if (err) {
      console.log("somthing has gone wrong!", err);
      console.log("response", response);
    } else {
      console.log("success!", response);
    }
  });
};
