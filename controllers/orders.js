const orders = require("../models/orders");
const Dish = require("../models/dish");
const FCM = require("fcm-node");
const server_key = require("../FireBaseConfig");
const fcmServerKey = new FCM(server_key.SERVER_KEY);
const stream = require("stream");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const ptp = require("pdf-to-printer");
const path = require("path");
const express = require("express");

//create a new order
exports.createOrder = async (req, res, next) => {
  const { date_order } = req.body;

  try {
    if (!date_order) {
      req.body.date_order = new Date()
        .toISOString()
        .replace("T", " ")
        .substr(0, 10);
    }
    const order = await orders.create(req.body);
    // PushNotifications("ExponentPushToken[idAMq6K8wibcgqLWNp_jCt]");
    printOrder();
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

    if (!status && !date_order) {
      order = await orders.find();
    } else if (!status && date_order) {
      order = await orders.find({ date_order: date_order });
    } else {
      order = await orders.find({ date_order: date_order, status: status });
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//getOrders Status
exports.getOrdersStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    const date = new Date().toISOString().replace("T", " ").substr(0, 10);
    const order = await orders.find({ date_order: date, status: status });
    console.log("order =", order.length);

    res.status(201).json({
      success: true,
      order: order,
      orderlength: order.length,
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
      monitorListingsUsingStreamApi(new MongoClient(process.env.DATABASE));
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
      const order = await orders.findByIdAndRemove({ _id: id_order });

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

//print order

const printOrder = async () => {
  try {
    fs.writeFileSync("test.pdf", "Hello World!");
    console.log("print order function worked!");
  } catch (error) {
    console.log(error);
  }

  try {
    const data = fs.readFileSync("test.pdf", "utf8");
    console.log("data = ", data);
  } catch (error) {
    console.log(error);
  }
};

// Push Notification
const monitorListingsUsingStreamApi = async (
  client,
  timeInMs = 60000,
  pipeLine = []
) => {
  const collection = client.db("ECJA_V2").collection("orders");

  const changeStream = collection.watch(pipeLine);
  // console.log("changeStream =", changeStream);
  changeStream.stream().pipe(
    new stream.Writable({
      objectMode: true,
      write: (doc, _, cb) => {
        console.log("doc = ", doc);
        cb();
      },
    })
  );

  await closeChangeStream(timeInMs, changeStream);
};

const closeChangeStream = (timeInMs = 60000, changeStream) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
};
// const PushNotifications = async(device_token) => {

//     const message = {
//         to: device_token,
//         notification: {
//             title: "test notification",
//             body: "test notification body",
//         },

//         data: {
//             title: "data notification",
//             body: '{"order":"456", "description":"Hot dish", "status": "pending"}'
//         }
//     };

//     fcmServerKey.send(message, function(err, response) {
//         if (err) {
//             console.log('somthing has gone wrong!', err);
//             console.log('response', response);
//         } else {
//             console.log("success!", response);
//         }
//     });

// };
