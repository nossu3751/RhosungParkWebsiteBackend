import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
require('dotenv').config();

const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

var corsOption={
    origin:["http://localhost:4200", "http://www.rhosungpark.com"],
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now())
    next();
});

router.post('/', cors(corsOption), (req,res)=>{
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
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    transport.sendMail(email, function(err,data){
        if(err){
            console.log("email sending error");
            throw err;
        }else{
            console.log("Successful");
            res.send({"message":"Successfully Sent Message to Rhosung!"});
        }
    })
});


module.exports = router;



