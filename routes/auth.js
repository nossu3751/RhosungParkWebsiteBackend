import auth from '../models/admin.model';
import cors from 'cors';
import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();
require('dotenv').config();

router.use(express.urlencoded({extended:true}));
router.use(express.json());

var corsOption={
    origin:"*",
    optionsSuccessStatus:200
};

router.post('/', cors(corsOption), (req,res)=>{
    let loginInfo = req.body;
    let id = loginInfo.id;
    let password = loginInfo.password;
    
    console.log(id);
    console.log(password);

    auth.find({}, (err,data)=>{
        console.log(data);
        if(err){
            console.log("Failed to login");
            res.send({success:false});
        }else{
            if(data.length == 0){
                console.log("No such data");
                res.send({success:false});
            }else{
                console.log(data[0].id);
                console.log(data[0].password);
                let idValid = bcrypt.compareSync(id, data[0].id);
                let passwordValid = bcrypt.compareSync(password, data[0].password);
                console.log("id",idValid);
                console.log("password",passwordValid);
                if(idValid && passwordValid){
                    res.send({success:true});
                }else{
                    console.log("Wrong Credential");
                    res.send({success:false});
                }
                
            }
        }
    })
})

module.exports = router;
