import * as constructor from './urlConstruct';

const defaultHeaders = {
    method: 'GET',
    cache: 'default'
};
let {
    pushCacheData,
    pushNewsRecent,
    checkExists,
    pushOtherRecent,
    checkFieldsExsits,
    cache,
    getData
} = window.cacheClient;

let cacheClient = window.cacheClient;
window.client = (function () {
    let getNewsRecent = function (source, tag, count, fields) {
        // console.log('[getNewsRecent] ');
        console.log(tag);
        let recentLen = cacheClient.cache[source].recent[tag].length;
        /**
         * 缓存中数量不足，网络请求
         */
        if (recentLen < count) {
            return fetch(constructor.constructRecentNewsUrl(source, tag, count, ['id']), defaultHeaders).then(response => {
                if (response.ok) {
                    return response
                        .json()
                        .then(body => {
                            let recentids = body
                                .data
                                .map(d => d._id);
                            recentids.forEach((id) => cacheClient.pushNewsRecent(source, tag, id));
                            let newRecentIds = cacheClient.cache[source].recent[tag];
                            return Promise.all(newRecentIds.map(id => getNewsById(source, id, fields)));
                        })
                }
            })
        } else {
            let newRecentIds = cacheClient.cache[source].recent[tag];
            return Promise.all(newRecentIds.map(id => getNewsById(source, id, fields)));
        }

    }
    let getNewsById = (source, id, fields) => {
        let unMetFields = fields.filter(f => (!checkFieldsExsits(source, id, f)));
        /**
         * 所有字段都存在于缓存中
         */
        if (unMetFields.length === 0) {
            return Promise.resolve(cacheClient.getData(source, id));
        } else {
            return fetch(constructor.constructIdNewsUrl(source, id, unMetFields), defaultHeaders).then((res => {
                if (res.ok) {
                    return res
                        .json()
                        .then(body => {
                            if (body.count === 1) {
                                cacheClient.pushCacheData(source, body.data[0]);
                                return cacheClient.getData(source, id);
                            }
                        })
                } else 
                    return Promise.reject(new Error(`[getNewsById] ${res.status}`));
                }
            ))
        }
    }

    let getNewsByTag = (source, tag, count = 5, fields) => {
       
        let newss = cache[source].tags[tag];
        if (count <= newss.length) {
            return Promise.all(newss.map(id => getNewsById(source, id, fields)));
        } else {
            return fetch(constructor.constructTagNewsUrl(source, tag, count, ["id"])).then(response => {
                if (response.ok) {
                    return response
                        .json()
                        .then(datas => {
                            let dataIds = datas.data.map(data => data._id);
                            dataIds.forEach(id => cacheClient.pushNewsByTag(source, tag, id));
                            let newIds = cache[source].tags[tag];
                            return Promise.all(newIds.map(id => getNewsById(source, id, fields)));
                        })
                } else 
                    return Promise.reject(`NetworkError: ${response.status}`);
                }
            )
        }
    }

    let getMediumById = (id, fields) => {

        let source = 'medium';
        let unMetFields = fields.filter(f => (!checkFieldsExsits(source, id, f)));
        // console.log(`[getMediumById] unmetFields ${unMetFields.length}`);

        if (unMetFields.length === 0) {
            return Promise.resolve(cacheClient.getData(source, id));
        } else {
            // console.log('[getMediumById]: feching');
            return fetch(constructor.constructIdNewsUrl(source, id, unMetFields), defaultHeaders).then((res => {
                if (res.ok) {
                    return res
                        .json()
                        .then(body => {
                            if (body.count === 1) {
                                cacheClient.pushCacheData(source, body.data[0]);
                                return Promise.resolve(cacheClient.getData(source, id));
                            } else 
                                return Promise.reject(new Error(`[getMediumById] get ${body.count} data`));
                            }
                        )
                } else 
                    return Promise.reject(new Error(`[getMediumById] ${res.status}`));
                }
            ))
        }
    }

    let getMediumRecent = function (count = 5, fields) {

        let source = 'medium';
        let recentLen = cacheClient.cache[source].recent.length;
        // console.log(`[getMediumRecent] current there is ${recentLen} in ${source}
        // recent`); let oldRecentIds = cacheClient.cache[source].recent; let
        // recentPromises = oldRecentIds.map(id => getMediumById(id, fields));
        /**
         * 缓存中数量不足，网络请求
         */
        if (recentLen < count) {
            console.log('[getMediumRecent] fetching');
            return fetch(constructor.constructRecentMedium(count, ['id']), defaultHeaders).then(response => {
                if (response.ok) {
                    return response
                        .json()
                        .then(body => {
                            let recentids = body
                                .data
                                .map(d => d._id);
                            recentids.forEach((id) => cacheClient.pushOtherRecent(source, id));
                            let newRecentIds = cacheClient.cache['medium'].recent;
                            return Promise.all(newRecentIds.map(id => getMediumById(id, fields)));
                        });
                } else {
                    return Promise.reject(`NetworkError: ${response.status}`);
                }
            })
        } else {
            let newRecentIds = cacheClient.cache['medium'].recent;
            return Promise.all(newRecentIds.map(id => getMediumById(id, fields)));
        }
    }

    let getMBookById = function (id, fields) {
        let source = 'mbook';
        let method = '[getMBookById]'
        let unMetFields = fields.filter(f => (!checkFieldsExsits(source, id, f)));
        // console.log(`[getMBookById] unmetFields ${unMetFields.length}`);

        if (unMetFields.length === 0) {
            return Promise.resolve(cacheClient.getData(source, id));
        } else {
            // console.log('[getMBookById]: feching');
            return fetch(constructor.constructIdNewsUrl(source, id, unMetFields), defaultHeaders).then((res => {
                if (res.ok) {
                    return res
                        .json()
                        .then(body => {
                            if (body.count === 1) {
                                cacheClient.pushCacheData(source, body.data[0]);
                                return Promise.resolve(cacheClient.getData(source, id));
                            } else 
                                return Promise.reject(new Error(`[getMBookById] get ${body.count} data`));
                            }
                        )
                } else 
                    return Promise.reject(new Error(`[getMBookById] ${res.status}`));
                }
            ))
        }
    };
    let getMBookRecent = function (count = 5, fields) {

        let source = 'mbook';
        let recentLen = cacheClient.cache[source].recent.length;
        // console.log(`[getMBookRecent] current there is ${recentLen} in ${source}
        // recent`); fields.forEach(f=>console.log(f));
        /**
         * 已经缓存的最近文章
         */
        let oldRecentIds = cacheClient.cache[source].recent;
        // oldRecentIds.map(id => getMBookById(id, fields));
        /**
         * 缓存中数量不足，网络请求
         */
        if (recentLen < count) {
            // console.log('[getMBookRecent] fetching');
            return fetch(constructor.constructRecentNewsUrl(source, null, count, ['id']), defaultHeaders).then(response => {
                if (response.ok) {
                    return response
                        .json()
                        .then(body => {
                            let recentids = body
                                .data
                                .map(d => d._id);
                            recentids.forEach(id => cacheClient.pushOtherRecent(source, id));
                            let newRecentIds = cacheClient.cache['mbook'].recent;
                            return Promise.all(newRecentIds.map(id => getMBookById(id, fields)));
                        });
                } else 
                    return Promise.reject(`NetworkError: ${response.status}`);
                }
            )
        } else {
            return Promise.all(oldRecentIds.map(id => getMBookById(id, fields)));
        }

    }

    return {
        getNewsRecent,
        getNewsById,
        getNewsByTag,
        getMediumById,
        getMediumRecent,
        getMBookById,
        getMBookRecent
    }
})();