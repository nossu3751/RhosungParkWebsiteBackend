import mongoose from 'mongoose';
require('dotenv').config();

const DBURL = process.env.DBURL;

const connection = mongoose.connection;

mongoose.connect(DBURL, {
    useUnifiedTopology:true,
    useNewUrlParser:true
});

connection.once('open', ()=>{
    console.log("MongoDB connected!");
})