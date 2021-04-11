import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    name: {type:String},
    email: {type:String},
    query: {type:String}
},{
    timestamps:true
},{
    collection:"emails"
});

module.exports = mongoose.model('email', EmailSchema);