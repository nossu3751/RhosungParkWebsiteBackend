import post from '../models/post.model';
import cors from 'cors';
import express from 'express';

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

router.get('/', cors(corsOption), (req,res)=>{
    post.find({}).sort({createdAt:-1}).exec((err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "success":false,
            })
        }else{
            res.send({
                "success":true,
                "data":data
            })
        }
    })
})

router.get('/:id', cors(corsOption), (req,res)=>{
    let id = req.params["id"];
    post.findOne({"_id":id}, (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "success":false,
            })
        }else{
            res.send({
                "success":true,
                "data":data
            })
        }
    })
})

router.get('/:search', cors(corsOption), (req,res)=>{
    let keyword = req.params["search"].toLowerCase();
    post.find({}, (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "success":false,
            })
        }else{
            let searched = data.filter((s)=>{
                return s.title.toLowerCase().includes(keyword);
            })
            res.send({
                "success":true,
                "data":searched
            })
        }
    })
})

router.post('/', cors(corsOption), (req,res)=>{
    post.create(req.body, (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "success":false
            })
        }else{
            res.send({
                "success":true,
                "data":data
            })
        }
    })
})

router.put('/:id', cors(corsOption), (req,res)=>{
    let targetId = req.params["id"];
    post.updateOne({
        "_id":targetId
    },{
        "$set":req.body
    },(err,data)=>{
        if(err){
            console.log(err);
            res.send({
                "success":false
            })
        }else{
            res.send({
                "success":true,
                "data":data
            })
        }
    })
})

router.delete('/:id', cors(corsOption), (req,res)=>{
    let targetId = req.params["id"];
    post.deleteOne({"_id":targetId}, (err)=>{
        if(err){
            console.log(err);
            res.send({"success":false});
        }else{
            res.send({"success":true})
        }
    })
})

module.exports = router;