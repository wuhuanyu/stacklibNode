const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const MBookRSchema = new Schema({
    crawled_at: Number,
    title: String,
    text: Array,
    source: String,
    url: String,
    book_hash: String,
    comments: [
        {
            text: [String],
            author: String
        }
    ]
}, { collection: 'mbookrevs' });


const MBookR = mongoose.model('mbookr', MBookRSchema);

MBookR.fields = [
    'crawled_at', 'title', 'source', 'url', 'comments', 'text', 'book_hash'
];

MBookR.findById = (id, fields = MBookR.fields) => {
    return MBookR.find({ _id: id }).select(fields.join(' '));
}

MBookR.findByUrl = (url, fields = MBookR.fields) =>
    MBookR.find({ url: url }).select(fields.join(' '));


MBookR.findByHash = (hash, fields = MBookR.fields) => {
    MBookR.find({ book_hash: hash }).select(fields.join(' '));
}

module.exports = MBookR;