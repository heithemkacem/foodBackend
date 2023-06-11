const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//Import Routes
const Client = require('./routes/client');
const Categories = require('./routes/categories');
const tables = require('./routes/table');
const dish = require('./routes/dish');
const orders = require('./routes/orders');
const image = require('./routes/imagebase64');

// CONNECT DATABASE
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to database')
    })
    .catch((err) => { console.error(err) });


//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


//Routes Middlewares
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
app.use("/api", Client);
app.use("/api", Categories);
app.use("/api", tables);
app.use("/api", dish);
app.use("/api", orders);
app.use("/api", image);



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});