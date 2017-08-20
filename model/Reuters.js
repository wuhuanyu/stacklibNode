const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ReutersSchema = new mongoose.Schema({
    url: String,
    crawled_at: Number,
    title: String,
    summary: String,
    text: [String],
    tag: String,
    image_urls: [String]
}, {collection: 'reuterss'});
const Reuters = mongoose.model('reuters', ReutersSchema);

Reuters.fields = [
    'url',
    'crawled_at',
    'title',
    'summary',
    'text',
    'tag',
    'image_urls'
]

Reuters.findRecent = (tag = 'all', count = 5, fields = Reuters.fields) => {
    if (tag === 'all') {
        return Reuters
            .find({})
            .sort({crawled_at: -1})
            .limit(count)
            .select(fields.join(' '));
    } else {

        return Reuters
            .find({tag: tag})
            .sort({crawled_at: -1})
            .limit(count)
            .select(fields.join(' '));

    }
}

Reuters.findById = (id, fields = Reuters.fields) => Reuters
    .find({_id: new Object(id)})
    .select(fields.join(' '));

module.exports = Reuters;