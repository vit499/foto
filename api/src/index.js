const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const {port, host, dbUrl} = require('./configuration')
const {connectDb} = require('./helpers/db');

const app = express();

console.log('api port:', port)
console.log('api host:', host)
console.log('dbUrl', dbUrl)

app.use(bodyParser.json())
app.use('/users', require('./routes/auth.routes'));

const startServer = () => {

    app.listen(port, () => {
        console.log(`connect db on ${dbUrl}`);
        console.log(`app listen on host ${host} port ${port}`);
    });
};

connectDb()
  .on('error', console.log)
  .once('open', startServer);


