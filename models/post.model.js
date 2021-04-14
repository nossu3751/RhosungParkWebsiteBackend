import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {type:String, default:"General"},
    title: {type:String},
    content: {type:String},
},{
    timestamps:true
},{
    collection:"posts"
});

module.exports = mongoose.model('post', PostSchema);