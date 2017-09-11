const MBookR = require('../model/MBookR');
const router = require('express').Router();
const error = require('../utils/commonError');
const emsg = require('../utils/commonMsg');


router.get(/^\/id-(\w+)$/, (req, res, next) => {
    console.log('---------from mbookr get id');
    let id = req.params[0];
    MBookR.findById(id, req.checked.fields).then((data) => {
        console.log(data);
        if (data.length == 0) {
            next(error.get404(emsg.NoSuchResource));
        }
        else {
            res.json({ count: data.length, data: data });
        }

    }).catch(e => {
        next(error.get400(emsg.CommontError));
    });
});


router.get(/^\/url-(\w+)$/, (req, res, next) => {
    let url = req.params[0];
    MBookR.findByUrl(url, req.checked.fields).then((data) => {
        console.log(data);
        if (data.length == 0) {
            next(error.get404(emsg.NoSuchResource));
        }
        else {
            res.json({ count: data.length, data: data });
        }

    }).catch(e => {
        next(error.get400(emsg.CommontError));
    });
})



router.get(/^\/hash-(\w+)/, (req, res, next) => {
    let hash = req.params[0];

    MBookR.findByHash(hash, req.checked.fields).then(data => {
        if(data.length==0){
            next(error.get404(emsg.NoSuchResource));
        }
        else{
            res.json({count:1,data:data});
        }
    }).catch(e=>{
        next(error.get400(e.message||emsg.CommontError));
    })
})


module.exports = router;