const express = require('express');
const router = express.Router();
const MBook = require('../model/MBook');
const error = require('../utils/commonError');
const emsg = require('../utils/commonMsg');

/**
 * @api {Get} /api/v1/bbc/id-:id Get Book by id
 * @apiName GetById
 * @apiGroup MBook
 * @apiParam {String} :id Book id
 * @apiParam {String} fields Book fields,seperated by ',',default all fields
 * 
 * @apiExample Example:
 * /api/v1/mbook/id-fkdlejr?fields=title,summary,image_urls
 * 
 * @apiSuccess {Number} count Number of books,must be 1
 * @apiSuccess {Object}  data Book data
 * @apiSuccessExample 
 */

router.get(/^\/id-(\w+)$/, (req, res, next) => {
    MBook.findById(req.params[0], req.checked.fields)
        .then(data => {
            console.log(data);
            if (data.length == 0) {
                next(error.get404(emsg.NoSuchResource));
            }
            res.json({
                count: data.length,
                data: data,
            })
        }, e => {
            next(error.get400(emsg.CommonError))
        }).catch(e => {
            console.log(e);
            next(error.get400(emsg.CommonError));
        });
});


/**
 * @api {GET} /api/v1/mbook/recent Get most recent recommended books
 * @apiName GetMostRecentRecommendedBooks
 * @apiGroup MBook
 * @apiParam{Number} count Number of books, default 5
 * @apiParam{String} fields Fields of books, default all fields
 * @apiExample Example:
 * /api/v1/mbook/recent?count=3&fields=title,review_urls
 * @apiSuceess {Number} count Number of books,may be less than query parameter
 * @apiSucesss {Array} data Book data
 * 
 * @apiSuccessexample Success-Response:
 * 
 */
router.get(/^\/recent$/, (req, res, next) => {
    let { count, fields } = req.checked;
    MBook.find({}).sort({crawled_at:-1}).limit(count).select(fields.join(' '))
        .then(data => {
            console.log(data);
            if (data.length !== 0) {
                res.json({ count: data.length, data: data });
            }
            else {
                next(error(emsg.NoSuchResource));
            }


        }).catch(e => {
            next(error(emsg.NoSuchResource));
        });
})


module.exports = router;