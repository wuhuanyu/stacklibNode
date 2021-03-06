const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CNNSchema = new mongoose.Schema({
    crawled_at: Number,
    title: String,
    url: String,
    timestamp: String,
    image_urls: [String],
    summary: String,
    source: String,
    tag: String,
    text: [String]
}, {collection: 'cnns'});

const CNN = mongoose.model('cnn', CNNSchema);

CNN.tags=[
    'business',
    'entertainment',
    'politics',
    'china',
    'tech',
    'sport',
    'life',
    'health',
]


CNN.fields = [
    'crawled_at',
    'title',
    'url',
    'timestamp',
    'image_urls',
    'summary',
    'tag',
    'source',
    'text',
    'id',
];

CNN.findRecent = (tag = 'all', count = 5, fields = CNN.fields) => {
    if (tag === 'all') {
        return CNN
            .find({})
            .sort({crawled_at:-1})
            .limit(count)
            .select(fields.join(' '))
    } else {
        return CNN
            .find({tag: tag})
            .sort({crawled_at:-1})
            .limit(count)
            .select(fields.join(' '))
    }
}

CNN.findById = (id, fields) => {
    // console.log('-----------from cnn model');
    // console.log(id);
    return CNN
        .find({_id: new ObjectId(id)})
        .select(fields.join(' '))
};



CNN.findByTag=(tag,fields)=>{
    // return CNN.find({tag:tag})
}

module.exports = CNN;
