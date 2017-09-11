const express = require('express');
const router = express.Router();



router.get(/^\/(\w+)$/,(req,res,next)=>{
    console.log(`[TagImgRouter] get ${req.params[0]}`);
    
})
module.exports = router;