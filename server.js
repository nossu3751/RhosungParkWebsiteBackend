import express from 'express';
import cors from 'cors';
import db from './db';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:4200", "http://www.rhosungpark.com"],
    optionsSuccessStatus: 200
}))

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