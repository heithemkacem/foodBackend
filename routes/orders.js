const express = require('express');
const router = express.Router();
const Orders = require('../controllers/orders');
const fs = require('fs');
const ptp = require('pdf-to-printer');
const path = require('path');


router.post('/createOrder', Orders.createOrder);

// express.raw({ type: 'application/pdf' }), async(req, res) => {

//     const options = {};
//     if (req.query.printer) {
//         options.printer = req.query.printer;
//     }
//     const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

//     fs.writeFileSync(tmpFilePath, req.body, 'binary');
//     await ptp.print(tmpFilePath, options);
//     fs.unlinkSync(tmpFilePath);

//     res.status(204);
//     res.send();
// }

router.post('/getOrders', Orders.getOrders);
router.post('/updateOrder', Orders.updateOrder);
router.post('/deleteOrder', Orders.deleteOrder);
router.post('/confirmOrder', Orders.confirmOrder);
router.post('/getOrdersStatus', Orders.getOrdersStatus);

module.exports = router;