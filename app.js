const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'))

app.use((req, res) => {
    res.status(404).json({
        msg: "404 API not Found!"
    })
});

module.exports = app;