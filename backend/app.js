const express = require('express')
const cors = require('cors');
const app = express()

const errorMiddleware = require('./middleware/error')


app.use(cors());
app.use(express.json());
const product = require('./routes/produtRoute')

app.use("/api/v1",product);

//Middleware for Error
app.use(errorMiddleware);

module.exports =app