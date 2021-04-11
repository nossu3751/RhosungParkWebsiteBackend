import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    id: {type:String},
    password: {type:String},
},
{
    collection:"admin"
});

module.exports = mongoose.model('admin', AdminSchema);