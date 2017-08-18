const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const MBookSchema = new Schema({
    source: String,
    crawled_at: Number,
    title: String,
    image_urls: [],
    summary: [],
    reviews_urls: [],
    url: String
}, {collection: 'mbooks'});

const MBook = mongoose.model('mbook', MBookSchema);

MBook.fields = [
    'source',
    'crawled_at',
    'title',
    'image_urls',
    'summary',
    'reviews_urls',
    'url'
];

MBook.findById = (id, fileds = MBook.fields) => MBook
    .find({_id: id})
    .select(fileds.join(' '));

MBook.findRecent = (count = 5, fileds = MBook.fields) => MBook
    .find({})
    .limit(count)
    .select(MBook.fields.join(' '));




