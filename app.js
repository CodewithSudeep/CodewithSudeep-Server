const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codewithsudeep', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) return console.log(err);
    console.log(`DB: Running => codewithsudeep`)
});

const morgan = require('morgan');
app.use(morgan('dev'));

// authentication routes
const { authRouter } = require("./api/Routes/Authentication");
app.use("/api/authentication", authRouter);

app.use((req, res) => {
    res.status(404).json({
        msg: "404 API not Found!"
    })
});

module.exports = app;