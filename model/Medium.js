const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const MediumSchema = new Schema({
    source: String,
    crawled_at: Number,
    title: String,
    url: String,
    text: [],
    image_urls: []
});


const Medium = mongoose.model('medium', MediumSchema);

Medium.fields = [
    'source', 'crawled_at', 'title', 'text', 'image_urls', 'id'
]


Medium.findByTitle = function (title, fields) {
    return Medium.find({ title: title })
        .select(fields.join(' '))
}


Medium.findBeforeTime = (time,fields)=>{


}

