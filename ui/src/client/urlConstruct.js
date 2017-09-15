import {domain as defaultDomain,host,port} from '../constants/Constants';



export const constructRecentNewsUrl = (source, tag, count = 5, fields) => {
    let url = "http://" + defaultDomain + source + "/recent?";
    let _tag = tag
        ? "tag=" + tag + "&"
        : '';
    let _fields = fields
        ? "fields=" + fields.join(',') + '&'
        : '';
    let _count = "count=" + count;

    url = url + _tag + _fields + _count;
    // console.log('[constructRecentNewsUrl ] url=' + url);
    return url;
};
export const constructIdNewsUrl = (source, id, fields) => {
    let url = "http://" + defaultDomain + source + "/id-" + id + '?';
    let _fields = fields
        ? "fields=" + fields.join(',')
        : '';
    url = url + _fields;
    // console.log('[constructIdNewsUrl] url=' + url);
    return url;
};

export const constructTagNewsUrl = (source, tag, count = 5, fields) => {
    let url = "http://" + defaultDomain + source + "/tag-" + tag + '?';
    let _fields = fields
        ? "fields=" + fields.join(',') + '&'
        : '';
    let _count = "count=" + count;
    url = url + _fields + _count;
    // console.log('[constructTagNewsUrl] url=' + url);
    return url;
}

export const constructRecentMedium = (count = 5, fields) => {
    let url = "http://" + defaultDomain + "medium/recent?"
    let _count = "count=" + count;
    let _fields = fields
        ? "fields=" + fields.join(',') + '&'
        : '';

    url = url + _fields + count;
    // console.log('[constructRecentMedium] url=' + url);
    return url;
}

export const constructIdMedium = (id, fields) => {
    let url = "http://" + defaultDomain + "medium/id-" + id;
    let _fields = fields
        ? "fields=" + fields.join(',') + '&'
        : '';

    url = url + _fields;
    // console.log('[constructIdMedium] url=' + url);
    return url;
}


export const constructImgUrl = (name)=>`http://${host}:${port}/static/images/${name}.jpg`;