const router = require('express').Router();
const CNN = require('../model/CNN');
const error = require('../utils/commonError');
const msg = require('../utils/commonMsg');


router.get(/recent/, (req, res, next) => {
    let tag = req.query.tag || 'all';
    CNN
        .findRecent(tag, req.checked.count, req.checked.fields)
        .then((data) => {
            if (data.length == 0) {
                next(error.get404(msg.NoSuchResource));
            } else {
                res.json({count: data.length, data});
            }
        })
        .catch(e => {
            next(error.get400(error.message || msg.CommontError));
        })
});

router.get(/^\/id-(\w+)$/, (req, res, next) => {
    // console.log('-------fields');
    // console.log(req.checked.fields);
    CNN
        .findById(req.params[0], req.checked.fields)
        .then(data => {
            if (data.length == 0) {
                next(error.get404(msg.NoSuchResource));
            } else {
                res.json({count: data.length, data});
            }
        })
        .catch(e => {
            next(error.get400(error.message || msg.CommontError));
        });
});

module.exports = router;