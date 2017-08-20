const router = require('express').Router();
const Reuters = require('../model/Reuters')
const error = require('../utils/commonError');
const emsg = require('../utils/commonMsg');

router.get(/recent/, (req, res, next) => {
    let tag = req.query.tag || 'all';
    Reuters
        .findRecent(tag, req.checked.count, req.checked.fields)
        .then(data => {
            if (data.length == 0) {
                next(error.get404(emsg.NoSuchResource));
            } else {
                res.json({count: data.length, data: data});
            }
        })
        .catch(e => {
            next(error.get400(e.message || emsg.CommontError))
        });
})

router.get(/^\/id-(\w+)$/, (req, res, next) => {
    let id = req.params[0];
    Reuters
        .findById(id, req.checked.fields)
        .then(data => {
            if (data.length == 0) {
                next(error.get404(emsg.NoSuchResource));
            } else {
                res.json({count: data.length, data: data});
            }
        })
        .catch(e => {
            next(error.get400(e.message || emsg.CommontError))
        });
})

module.exports = router;
