const mongoose = require('mongoose');
// process.env.S3_BUCKET

mongoose.connect(`mongodb+srv://ihdm:${process.env.DATABASE_PASSWORD}@bilek.f0ej3.mongodb.net/ipcmDb?retryWrites=true&w=majority`, {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;



db.on('error', console.error.bind(console, "connection error"));


db.once('open', function () {
    console.log('Database is connected successfully');
})