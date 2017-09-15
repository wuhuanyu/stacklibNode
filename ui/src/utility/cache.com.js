"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cache = {
    medim: {
        recent: [],
        data: []
    },
    bbc: {
        header: 0,
        recent: {
            politics: [],
            china: [],
            life: [],
            tech: [],
            business: []
        },
        data: []
    },
    cnn: {
        header: 0,
        recent: {
            politics: [],
            china: [],
            life: [],
            tech: [],
            business: []
        },
        data: []
    },
    reuters: {
        header: 0,
        recent: {
            politics: [],
            china: [],
            life: [],
            tech: [],
            business: []
        },
        data: []
    },
    mbook: {
        recent: {},
        data: []
    }
};

var pushCacheData = function pushCacheData(source, obj) {
    if (checkExists(source, obj._id)) {
        var index = cache[source].data.findIndex(function (x) {
            return x._id === obj._id;
        });
        var item = cache[source].data.filter(function (x) {
            return x._id === obj._id;
        });
        item = Object.assign(item, Object.assign({}, obj));
        cache[source].data[index] = item;
    } else {
        cache[source].data.push(Object.assign({}, obj));
    }
};

var checkExists = function checkExists(source, id) {
    var exists = false;
    cache[source].data.forEach(function (e) {
        if (e._id === id) {
            exists = true;
        }
    });
    return exists;
};

var pushNewsRecent = function pushNewsRecent(source, tag, _id) {
    console.log("pushNewsRecent");
    var recent = cache[source].recent[tag];
    if (!recent.includes(_id)) recent.push(_id);
};

var pushOtherRecent = function pushOtherRecent(source, _id) {
    console.log("pushNewsRecent");
    var recent = cache[source].recent;
    if (!recent.includes(_id)) recent.push(_id);
};

// const getRecentNewsCache = (source, tag) => {}

var getData = function getData(source, id) {
    var datas = cache[source].data;
    return datas.filter(d._id === id);
};

var checkFieldsExsits = function checkFieldsExsits(source, _id, field) {
    var datas = cache[source].data;
    if (!checkExists(source, _id)) {
        return false;
    } else {
        var data = getData(source, _id);
        if (data[field]) return true;else return false;
    }
};

window.cache = _defineProperty({
    pushCacheData: pushCacheData, checkExists: checkExists, pushNewsRecent: pushNewsRecent, pushOtherRecent: pushOtherRecent, getData: getData }, "checkExists", checkExists);
