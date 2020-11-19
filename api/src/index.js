const express = require('express')
const mongoose = require('mongoose');

const {port, host, dbUrl} = require('./configuration')
const {connectDb} = require('./helpers/db');

const app = express();


console.log('api port:', port)
console.log('api host:', host)
console.log('dbUrl', dbUrl)

const dbSchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Kitten', dbSchema);

app.use('/k', async (req, res) => {
    try {
        const kittens = await Kitten.find();
        if(!kittens || kittens.length === 0) {
            const k = await addKitten('first');
            console.log('first kitten added:', k);
            return res.json(k);
        }
        console.log('list kit:', kittens);
        res.json(kittens);
    }
    catch (e) {
        res.status(401).json({message: "error find db"});
    }
});

const addKitten = async (nameKitten) => {
    try{
        const newKitten = new Kitten({name: nameKitten});
        const k = await newKitten.save();
        return k;
    }
    catch(e) {
        console.log(e);
        return {message: 'error save in db'}
    }
}

const startServer = () => {

    app.listen(port, () => {
        console.log(`connect db on ${dbUrl}`);
        console.log(`app listen on host ${host} port ${port}`);
    });
};

connectDb()
  .on('error', console.log)
  .once('open', startServer);


