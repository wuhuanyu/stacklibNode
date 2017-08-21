const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const MBookSchema = new Schema({
    source: String,
    crawled_at: Number,
    title: String,
    image_urls: [],
    summary: [],
    reviews_urls: [],
    url: String,
    hash_value:String,
}, {collection: 'mbooks'});

const MBook = mongoose.model('mbook', MBookSchema);

MBook.fields = [
    'source',
    'crawled_at',
    'title',
    'image_urls',
    'summary',
    'review_urls',
    'url',
    'hash_value',
];

MBook.findById = (id, fileds = MBook.fields) => MBook
    .find({_id: new ObjectId(id)})
    .select(fileds.join(' '));

MBook.findRecent = (count = 5, fileds = MBook.fields) => MBook
    .find({})
    .sort({crawled_at: -1})
    .limit(count),
    .select(MBook.fields.join(' '));

module.exports = MBook;
