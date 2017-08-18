const express = require('express');

const router = express.Router();
const Medium = require('../model/Medium');

const commonError = require('../utils/commonError');
const commonCheck = require('../utils/commonCheck');

const commonMsg = require('../utils/commonMsg');
const BBC = require('../model/BBCItem');

const utility = require('../utils/utility');

router.use(function (req, res, next) {
    let isQueryValid = true;
    let fields = req.query.fields
        ? req
            .query
            .fields
            .split(',')
        : Medium.fields;

    if (!fields.every(f => Medium.fields.indexOf(f) > -1)) {
        next(commonError.get400(commonMsg.QueryParamsInvalid));
    } else {
        req.checked.fields = fields;
        next();
    }
});

/**
 * @api {GET} /api/v1/medium/id-:id Medium Article By :id
 * @apiName GetById
 * @apiGroup Medium
 * @apiParam {String} :id Article ID
 * @apiParam {String} :fields Article Fields seperated by ','
 * @apiExample Example:
 * /api/v1/medium/id-13rrfkljdaf?fileds=title,crawled_at
 * @apiSuccess {Object} Article data
 * @apiDescription Get Medium Article by id and fileds , Supported Fields are source,crawled_at,title,text,'image_urls','id','url'
 *
 * @apiSuccessExample Success-Response
 *  HTTP/1.1 200 OK 
 * {
  "count": 1,
  "data": [
    {
      "_id": "598c42514da41665702fbbac",
      "title": "Step By Step Guide to Make $10 Million And Then Totally Blow It",
      "image_urls": [
        "https://cdn-images-1.medium.com/max/1600/1*Bru3hdF4ZJ0wDz8_JOlmSA.jpeg"
      ]
    }
  ]
  }

  @apiError No Such Resource Probably provide wrong :id

  @apiErrorExample {json}
  HTTP/1.1  400 WrongFields 

  {
  "error": "Query params invalid"
  }

  @apiError     
 *
 *
 */

router.get(/^\/id-(\w+)$/, (req, res, next) => {
    let id = req.params[0];
    Medium
        .findById(id, req.checked.fields)
        .then(data => {
            if (data.length == 0) {
                next(commonError.get404(commonMsg.NoSuchResource));
            } else 
                res.json({count: data.length, data: data});
            }
        )
        .catch(err => {
            next(commonError.get404(commonMsg.NoSuchResource));
        });

});

router.get(/count/, function (req, res, next) {
    Medium
        .findByCount()
        .then((data) => res.json(data));
});

module.exports = router;