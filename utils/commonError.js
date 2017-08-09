const get400Error = function (msg) {
    let error = new Error(msg);
    error.status = 400;
    return error;
};


const get404Error = function (msg) {
    let error = new Error(msg);
    error.status = 404;
    return error;
};


module.exports.get400 = get400Error;
module.exports.get404 = get404Error;