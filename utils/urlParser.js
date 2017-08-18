const utility  = require('./utility');
const cError = require('./commonError');
const cMsg = require('./commonMsg');
const isNum = utility.isNum;

function  parser(req,res,next) {
    console.log('------parser');
    let isUrlValid = true;
    let crawled_at = req.query.crawled_at? req.query.crawled_at:(new Date()).getTime();
    let count = req.query.count? req.query.count: '5';

    if(!isNum(crawled_at)||!isNum(count)){
        isUrlValid =false;
    }else {
        crawled_at = parseInt(crawled_at,10);
        count = parseInt(count,10);
    }

    if(isUrlValid){
        req.checked = {};
        req.checked.crawled_at = crawled_at;
        req.checked.count = count ;
        next();
    }
    else {
        next(cError.get400(cMsg.QueryParamsInvalid));
    }

}


module.exports.urlParser = parser;