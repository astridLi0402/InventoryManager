const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// have our env variables in dotenv file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

// cors middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established succesfully");
})

const itemsRouter = require('./routes/items');

app.use('/items', itemsRouter);

// starts the server
app.listen(port, ()=>{
    console.log('Server is running on port: 9000');
})

