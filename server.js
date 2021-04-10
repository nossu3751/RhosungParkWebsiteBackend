import express from 'express';
import cors from 'cors';

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
app.use('/send', EmailRoute);


app.listen(PORT, ()=>{
    console.log(`connected to express server ${PORT}`);
})