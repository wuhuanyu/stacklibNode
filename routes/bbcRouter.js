const express = require('express');
const router = express.Router();
const winston = require('winston');
const BBC = require('../model/BBCItem');
const commonError = require('../utils/commonError');
const commonCheck = require('../utils/commonCheck');
const commonMsg = require('../utils/commonMsg');
const utility = require('../utils/utility');

// router.use(function (req,res,next) {     let isQueryValid = true;     let
// fields = req.query.fields? req.query.fields.split(','):BBC.fields;
// if(!fields.every(f=>BBC.fields.indexOf(f)>-1)){         isQueryValid = false;
//     }     if(!isQueryValid){
// next(commonError.get400(commonMsg.QueryParamsInvalid));     }     else{
// req.checked.fields = fields;         next();     } });

/**
 * @api {GET} /api/v1/bbc/id-:id  Get news by :id
 * @apiName GetById
 * @apiGroup BBC
 * @apiParam {String} :id News id
 * @apiParam {String} :fields News elements,separated by ','
 * @apiExample Example:
 * /api/v1/bbc/id-iesh34032?fields=tilte,timestamp,crawled_at
 *
 * @apiSuccess {Object} News data
 * @apiDescription Get News by id and fields specified by query params fields. Default all fields.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 {
   "_id": "5975d92a4da41631e7e4ca7f",
   "crawled_at": 1500895529000,
   "title": "Refunds as Pokemon fest beset by glitches",
   "url": "http://www.bbc.com/news/technology-40695589",
   "summary": "As many as 20,000 attendees at a Pokemon Go festival in Chicago are being offered refunds after technical glitches meant fans were mostly unable to catch anything - let alone “them all”.  ",
   "source": "bbc",
   "tag": "tech",
   "timestamp": "2017-07-24 19:25:29.290812",
   "image_urls": [
     "http://static.bbci.co.uk/news/1.202.01796/img/correspondents/circles/davelee.png",
     "https://ichef-1.bbci.co.uk/news/320/cpsprodpb/6120/production/_97046842_whatsubject.jpg"
   ],
   "text": [
     "As many as 20,000 attendees at a Pokemon Go festival in Chicago are being offered refunds after technical glitches meant fans were mostly unable to catch anything - let alone “them all”.  ",
     "Disappointed fans will also be offered $100 in the form of the app’s in-game currency, Pokecoins. ",
     "The event on Saturday had been touted as a chance for fans to come together and catch some of the rarest monsters on the hugely successful app. ",
     "But fans booed and chanted “fix our game!” and “we can’t play!\" as executives from Niantic, the game’s creator, attempted to explain the problems. ",
     "At one point a bottle was thrown at a presenter on stage - it missed.",
     "Pokemon Go was launched last summer and has since been downloaded over 750 million times, reportedly making more than $1bn in revenue. The game required players to walk around the real world in order to find monsters in different locations. ",
     "On Saturday, in Chicago’s Grant Park, fans had hoped to find some species of Pokemon that were otherwise not available or extremely rare.",
     "Tickets to the event sold out within around 10 minutes of going on sale, leading to many tickets being resold at almost 10 times their face value.  ",
     "But the festival succumbed to a combination of overwhelmed mobile networks, and several bugs that Niantic admitted were “on our side”. ",
     "“We know that this is not the day that we had all envisioned,” Mike Quigley, the firm’s chief marketing officer, told angry attendees.  ",
     "“But we appreciate your patience.” ",
     "As well as the technical problems, long lines prevented many ticket holders from getting into the event for more than three hours.",
     "“This is the worst time I have ever had doing anything,” ",
     ", who later left. ",
     "In an attempt to fix the issues, the company increased the radius of the event by a further two miles, meaning players could leave Grant Park in order to try and connect to the game and get access to the rare creatures.",
     "And just before 6pm local time, attendees were told they would all get a Lugia - a Pokemon that had not been available on the game before, an announcement that drew big cheers from an otherwise dejected crowd.",
     "___________"
   ]
 }
 ]
 @apiError NoSuchNews  May Caused by wrong id
 @apiErrorExample {json}
 HTTP/1.1 404 Not found
 {
 "error": "No such news "
 }

 @apiError WrongFields Fields wrong,read the doc thoroughly!
 @apiErrorExample {json}
 HTTP/1.1 400 Bad request
 {
  "error": "Query fields not valid"
 }
 */

router.get(/^\/id-(\w+)$/, (req, res, next) => {

    let id = req.params[0];
    BBC
        .findById(id, req.checked.fields)
        .then((data) => {
            if (data !== null) {
                res.json({
                    count:1,
                    data:data
                });
            }
        }, (err) => {
            next(commonError.get404(commonMsg.NoSuchResource));
        });
});

/**
 * @api {GET} /api/v1/bbc/tag-:tag Get news by :tag
 * @apiName GetByTag
 * @apiGroup BBC
 * @apiParam {String} :tag news tag
 * @apiParam {Number} crawled_at News crawled before time Default now
 * @apiParam {Number} count Number of news to fetch. Default 5
 * @apiParam {String} :fields News elements,separated by ',' Default all fields
 *
 * @apiExample Example:
 * /api/v1/bbc/tag-world?crawled_at=18932839239&count=3&fields=summary
 * @apiSuccess {Number} count Number of pieces of news fetched
 * @apiSuccess {Array} data News data
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
  "count": 2,
  "data": [
    {
      "_id": "5975d9454da41631e7e4cafe",
      "title": "Jared Kushner: The son-in-law with Donald Trump's ear",
      "summary": "For someone with no prior government experience, Jared Kushner has accumulated a dizzying array of portfolios in the administration of his father-in-law President Donald Trump."
    },
    {
      "_id": "5975d9434da41631e7e4caf2",
      "title": "Turkey's Cumhuriyet journalists in terrorism trial",
      "summary": "Seventeen journalists and managers at Turkish opposition newspaper Cumhuriyet went on trial on Monday on charges of aiding a terrorist organisation."
    }
  ]
}
 @apiError NoSuchNews No news with certain :tag
 @apiError InvalidFields News or resource has no such fields
 @apiErrorExample {json}
 HTTP/1.1 404 Not found
 {
  "error": "No such news"
}
 @apiErrorExample {json}
 HTTP/1.1 400 Bad request
 {
  "error": "Query params invalid"
}


 */
router.get(/^\/tag-(\w+)$/, (req, res, next) => {

    let tag = req.params[0];

    if (BBC.tags.indexOf(tag) === -1) {
        next(commonError.get404(commonMsg.NoSuchResource));
    }
    BBC
        .findByTag(tag, req.checked.count, req.checked.crawled_at, req.checked.fields)
        .then((data) => {
            if (data.length > 0) {
                let result = {};
                result.count = data.length;
                result.data = data;
                res.json(result);
            } else {
                next(commonError.get404(commonMsg.NoSuchResource));
            }
        }, (err) => {
            next(commonError.get404(commonMsg.NoSuchResource));
        });
});

/**
 *@api {GET} /api/v1/bbc/search Search news
 * @apiName SearchNews
 * @apiGroup BBC
 * @apiParam {String} keys Key words to search
 * @apiParam {Number} crawled_at Time.Default Now
 * @apiParam {String} fields Fields to fetch.Default all fields
 * @apiParam {Number} count Number of pieces of news to fetch.Default 5
 *
 * @apiExample Example:
 * /api/v1/bbc/search?keys=uk&count=2&fields=title,summary
 * @apiSuccess {Number} count Number of pieces  of news fetched
 * @apiSuccess {json} data News data
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 *{
  "count": 2,
  "data": [
    {
      "_id": "5975d94a4da41631e7e4cb19",
      "title": "UK to bring in drone registration",
      "summary": "The UK government has announced plans to introduce drone registration and safety awareness courses for owners of the small unmanned aircraft. "
    },
    {
      "_id": "5975d9434da41631e7e4caf1",
      "title": "Male eating disorders rise but Wales spends less than England",
      "summary": "There has been an increase across the UK of men and boys suffering from eating disorders, according to research by BBC Panorama."
    }
  ]
}

 @apiError NoSuchResource No news fits requirement
 @apiError InvalidFields News has no such fields
 @apiErrorExample {json}
 HTTP/1.1 404 Not found
 {
  "error": "No such resource"
}
 @apiErrorExample {json}
 HTTP/1.1 400 Bad request
 {
  "error": "Query params invalid"
}
 *
 *
 *
 */
router.get(/^\/search$/, (req, res, next) => {

    if (!req.query.keys) {
        next(commonError.get400(commonMsg.QueryParamsInvalid));
    }

    let keys = req
        .query
        .keys
        .split(',');
    let words = [];
    let isKeysValid = keys.every(i => i.length >= 2);
    if (!isKeysValid) {
        next(commonError.get400(commonMsg.QueryKeyWordsTooShort));
    } else {
        keys.forEach((key) => {
            utility
                .n_param(2, key)
                .forEach(k => words.push(k));
        });
        BBC.findByText(keys.join(' '), req.checked.fields, req.checked.count, req.checked.crawled_at).then((data) => {
            if (data.length !== 0) {
                res.json({count: data.length, data: data});
            } else 
                next(commonError.get404(commonMsg.NoSuchResource));
            }
        , (err) => next(commonError.get404(commonMsg.NoSuchResource)));
    }
});

router.get(/recent/, (req, res, next) => {
    let tag = req.query.tag || 'all';

    BBC
        .findRecent(tag, req.checked.count, req.checked.fields)
        .then((data) => {
            if (data.length == 0) {
                next(commonError.get404(commonMsg.NoSuchResource));
            } else {
                res.json({count: data.length, data: data});
            }
        })
        .catch(e => {
            next(commonError.get400(e.message || commonMsg.CommontError));
        })
});
module.exports = router;
