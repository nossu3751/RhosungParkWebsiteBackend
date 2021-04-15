import express from 'express';
import cors from 'cors';
import db from './db';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

import EmailRoute from './routes/email';
import AuthRoute from './routes/auth';
import ProjectRoute from './routes/project';
import PostRoute from './routes/post';

app.use('/send', EmailRoute);
app.use('/login', AuthRoute);
app.use('/project', ProjectRoute);
app.use('/posts', PostRoute);

app.get('/', (req,res)=>{
    res.send("Welcome to Rhosung Park Backend!");
})

app.listen(PORT, ()=>{
    console.log(`connected to express server ${PORT}`);
})