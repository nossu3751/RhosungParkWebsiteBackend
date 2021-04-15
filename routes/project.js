import project from '../models/project.model';
import cors from 'cors';
import express from 'express';

const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

var corsOption={
    origin:"*",
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now())
    next();
});

router.get('/',cors(corsOption),(req,res)=>{
    project.find({},(err,data)=>{
        console.log(data);
        if(err){
            console.log(err);
            res.send({"success":false});
        }else{
            res.send({
                "success":true,
                "data":data
            })
        }
    })
})

router.post('/',cors(corsOption), (req,res)=>{
    let p = req.body;
    project.updateOne(
        p,
        {
            "$set":p
        },
        {
            "upsert":true
        },
        (err,data)=>{
            if(err){
                console.log(err);
                res.send({"success":false});
            }else{
                res.send({
                    "success":true
                })
            }
        }
    )
})

module.exports = router;