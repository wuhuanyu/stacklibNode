const router=require('express').Router();
const Comment=require('../model/Comment');
const commonMsg=require('../utils/commonMsg');


/**
 * @param {Object} com 
 * must have fields:source,text,sourceId,
 */
const _checkComment=(com)=>{
    return com.source&&com.text&&com.sourceId;
}
/**
 * authenticated name,password,id assumed in app.locals;
 */
router.post(/^\$/,(req,res,next)=>{
    let com=req.body;
    if(_checkComment(com)){
        Comment.insert(com.source,com.sourceId,req.app.locals.id,com.text)
        .then((savedCom)=>res.status(200).json({
            msg:commonMsg.CommentInserted,
        })).catch(e=>{
            let error=new Error(commonMsg.CommontError);
            error.status=500;
            next(error);
        })
    }
    else {
        let error=new Error(commonMsg.CommentInValid);
        error.status=400;
        next(error);
    }
});

router.get(/^\$/,(req,res,next)=>{

});