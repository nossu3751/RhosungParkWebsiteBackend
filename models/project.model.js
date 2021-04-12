import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {type:String},
    image: {type:String},
    description: {type:String},
    siteLink: {type:String},
    repoLink: {type:String}
},{
    timestamps:true
},{
    collection:"projects"
});

module.exports = mongoose.model('project', ProjectSchema);