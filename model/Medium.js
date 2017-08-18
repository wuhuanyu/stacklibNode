const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/stacklib');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const MediumSchema = new Schema({
    source: String,
    crawled_at: Number,
    title: String,
    url: String,
    text: [],
    image_urls: []
},{collection:'mediums'});

const Medium = mongoose.model('medium', MediumSchema);

Medium.fields = [
    'source',
    'crawled_at',
    'title',
    'text',
    'image_urls',
    'id',
    'url'
];

Medium.findByTitle = function (title, fields) {
    return Medium
        .find({title: title})
        .select(fields.join(' '))
};

Medium.findBeforeTime = (time, fields = Medium.fields) => {
    return Medium
        .find({})
        .where("crawled_at")
        .lt(time)
        .select(fields.join(' '));
};

Medium.findById =  (id,fields)=> {
    // console.log('----from medium');
    console.log(id);
    return Medium.find({_id:id}).select(fields.join(' '));
};

Medium.findByCount = function (count = 5, fields = Medium.fields) {
    return Medium
        .find({})
        .sort('crawled_at:-1')
        .select(fields.join(' '))
        .limit(count);
};

module.exports = Medium;