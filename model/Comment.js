const mongoose=require('mongoose');
const ObjectId=mongoose.ObjectId;
mongoose.Promise=global.Promise;
const Schema=mongoose.Schema;
const getByFieldFactory=require('./CommonModelQuery');

const CommentSchema=new Schema({
    source:String,
    sourceId:String,
    timestamp:String,
    authorId:Number,
    text:String,
})

const Comment=mongoose.model('comment',CommentSchema);
/**
 * assumed already checked field
 * @param {String} s  source 
 * @param {Number} sId  sourceId
 * @param {Number} aId authorId
 * @param {String} t content
 */
Comment.insert=function(s,sId,aId,t){
    let com=new Comment({
        _id:new ObjectId(),
        source:s,
        sourceId:sId,
        authorId:aId,
        text:t,
        timestamp:new Date().getTime(),
    });
    return com.save();
}

/**
 * (id)=>promise
 */
Comment.getById=getByFieldFactory('Comment','_id');
/**
 * (sourceV,limit)=>promise
 */
Comment.getBySource=getByFieldFactory('Comment','source',{'timestamp':-1});

module.exports=Comment;

