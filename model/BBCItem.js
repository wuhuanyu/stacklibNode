const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const BBCSchema = new Schema({
    source: String,
    crawled_at: Number,
    timestamp: String,
    summary: String,
    title: String,
    url: {
        type: String
    },
    text: [],
    image_urls: [],
    // images:{type:[],select:false},
    tag: String
});

const BBC = mongoose.model('bbc', BBCSchema);

BBC.tags = [
    'world',
    'africa',
    'australia',
    'latin',
    'middle_east',
    'asia',
    'uk',
    'business',
    'tech',
    'entertainment_arts',
    'health'
];
BBC.fields = [
    'source',
    'crawled_at',
    'timestamp',
    'summary',
    'title',
    'url',
    'text',
    'image_urls',
    'tag',
    'id'
];

BBC.findByTag = function (tag, num, crawl, fields) {
    return BBC
        .find({tag: tag})
        .where('crawled_at')
        .lt(crawl)
        .sort({crawled_at: -1})
        .limit(num)
        .select(fields.join(' '));
};

BBC.findById = function (id, fields) {
    return BBC
        .find({_id: id})
        .select(fields.join(' '));
};

BBC.findByTitle = function (title) {
    return BBC.find({title: title});
};

BBC.findBeforeTime = (time) => {
    return BBC
        .find({})
        .where('crawled_at')
        .lt(time)
        .select('_id title tag summary image_urls timestamp url')
};

BBC.findByText = (text, fields, count, crawled_at) => {
    return BBC
        .find({
        $text: {
            $search: text,
            $caseSensitive: false
        }
    })
        .select(fields)
        .where('crawled_at')
        .lt(crawled_at)
        .limit(count)
        .sort({'crawled_at': -1});
};
BBC.findByCount = (count, fields) => {
    return BBC
        .find({})
        .limit(count);
};

BBC.findRecent = (count = 5, fields = BBC.fields) => {
    return BBC
        .find({})
        .sort({crawled_at: -1})
        .limit(count)
        .select(fields.join(' '));
}
module.exports = BBC;
