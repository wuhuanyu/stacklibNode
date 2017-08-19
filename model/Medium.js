const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const MediumSchema = new Schema({
    source: String,
    crawled_at: Number,
    title: String,
    url: String,
    text: [],
    image_urls: []
}, {collection: 'mediums'});

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

Medium.findById = (id, fields) => {
    return Medium
        .find({_id: new ObjectId(id)})
        .select(fields.join(' '));
};

Medium.findByCount = function (count = 5, fields = Medium.fields) {
    return Medium
        .find({})
        .sort('crawled_at:-1')
        .select(fields.join(' '))
        .limit(count);
};

Medium.findRecent = (count, fields = Medium.fields) => Medium
    .find({})
    .sort('crawled_at:-1')
    .limit(req.checked.count)
    .select(req.checked.fields.join(' '));

module.exports = Medium;
