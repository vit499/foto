const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');

const {port, host, dbUrl} = require('./configuration')
const {connectDb} = require('./helpers/db');

const app = express();

console.log('api port:', port)
console.log('api host:', host)
console.log('dbUrl', dbUrl)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({}));
app.use('/users', require('./routes/auth.routes'));
app.use('/device', require('./routes/device.routes'));

const startServer = () => {

    app.listen(port, () => {
        console.log(`connect db on ${dbUrl}`);
        console.log(`app listen on host ${host} port ${port}`);
    });
};

connectDb()
  .on('error', console.log)
  .once('open', startServer);


