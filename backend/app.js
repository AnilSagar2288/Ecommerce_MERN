const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();


const errorMiddleware = require('./middleware/error')


app.use(cors());
app.use(express.json());
app.use(cookieParser());


const product = require('./routes/produtRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//Middleware for Error
app.use(errorMiddleware);

module.exports =app