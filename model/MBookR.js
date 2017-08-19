const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const MBookRSchema = new Schema({
    crawled_at: Number,
    title: String,
    text: Array,
    source: String,
    url: String,
    comments: [
        {
            text: [String],
            author: String
        }
    ]
}, { collection: 'mbookrevs' });


const MBookR = mongoose.model('mbookr', MBookRSchema);

MBookR.fields = [
    'crawled_at', 'title', 'source', 'url', 'comments', 'text',
];

MBookR.findById = (id, fields = MBookR.fields) => {
    return MBookR.find({ _id: id }).select(fields.join(' '));
}

MBookR.findByUrl = (url, fields = MBookR.fields) =>
    MBookR.find({ url: url }).select(fields.join(' '));


module.exports = MBookR;