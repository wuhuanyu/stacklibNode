const mongoose = require('mongoose');
import * as models from './index';

// module.exports.getByIdFactory = function (category) {
//     let model = models[category];
//     return function (id, fields) {
//         return
//         model.find({ _id: id }).select(fields.json(' '));
//     }
// }

module.exports.getByFieldFactory = (category, field, sortOptions) => (fieldV, limit) => {
    let model = models[category];
    let options = {};
    options[field] = fieldV;
    if (!limit) limit = Number.MAX_VALUE;
    return model.find(options).limit(limit).sort(sortOptions);
}

