const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = require('./app')

http.createServer(app).listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server: Running => ${PORT}`)
})