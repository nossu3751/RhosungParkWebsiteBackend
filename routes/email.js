import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import emailModel from '../models/email.model';


require('dotenv').config();

const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

var corsOption={
    origin:"*",
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now())
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const { google } = require('googleapis');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_PASSWORD,
    OAUTH_PLAYGROUND
)

router.post('/', cors(corsOption), (req,res)=>{
    oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
    })
    const accessToken = oauth2Client.getAccessToken();
    console.log(req.body);
    const message = `
        <div> Name: ${req.body.name} </div>
        <div> Email: ${req.body.email} </div>
        <br>
        <div> Message: ${req.body.query} </div>
    `;

    const email = {
        from: `${req.body.email}`,
        to: 'rhosungpark@gmail.com',
        subject: 'Email From RhosungPark.com',
        html: message
    };

    const transport = nodemailer.createTransport({
        // host: 'gmail',
        // port: process.env.EMAIL_PORT,
        service: 'gmail',
        auth: {
            // user: process.env.EMAIL_USER,
            // pass: process.env.EMAIL_PASSWORD
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASSWORD
            type:'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_PASSWORD,
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
            accessToken
        }
    });

    transport.sendMail(email, function(err,data){
        if(err){
            console.log("email sending error");
            throw err;
        }else{
            console.log("Successful");
            emailModel.create(req.body,(err,data)=>{
                if(err){
                    console.log("email sent, but failed to save to database.");
                    console.log(err);
                }
                res.send({"message":"Successfully Sent Message to Rhosung!"});
            })
        }
    })
});


module.exports = router;



