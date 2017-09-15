import {BBC, CNN, MBook, Reuters, Medium} from './data';

export const checkTitle = function (data) {
    if (Array.isArray(data)) {
        data.forEach((d) => {
            if (d.title) {
                let title = d.title;
                title = title
                    .split(' ')
                    .map((word) => {
                        return word[0].toUpperCase() + word.slice(1);
                    })
                    .join(' ');
                d.title = title;
            }
        });
        return data;
    } else if (typeof data === 'object') {
        if (data.title) {
            let title = data.title;
            title = title
                .split(' ')
                .map((word) => {
                    return word[0].toUpperCase() + word.slice(1);
                })
                .join(' ');
            data.title = title;
        }
        return data;
    }
};


export function addTimeOut(delay = 1500, obj, func, args) {
    if (!Array.isArray(args)) 
        throw 'args must be array';
    let promise = new Promise((resolve, reject) => {
        window.setTimeout(() => {
            let data = func.apply(obj, args);
            data = checkTitle(data);
            if (data) {
                resolve(data);
            } else {
                reject(data);
            }
        }, delay);
    });

    return promise;

}

export const mockClient = (() => {
    let getNewsRecent = (source, tag, count = 5, fields) => {
        let func,
            obj
        switch (source) {
            case 'bbc':
                func = BBC.getRecent;
                obj = BBC;
                break;
            case 'cnn':
                func = CNN.getRecent;
                obj = CNN;
                break;

            case 'reuters':
                func = Reuters.getRecent;
                obj = Reuters;
            default:
                break;
        }
        return addTimeOut(1500, obj, func, [tag, count, fields])
    }

    let getNewsById = (source,id, fields) => {
        let func,
            obj
        switch (source) {
            case 'bbc':
                func = BBC.getById;
                obj = BBC;
                break;
            case 'cnn':
                func = CNN.getById;
                obj = CNN;
                break;
            case 'reuters':
                func = Reuters.getById;
                obj = Reuters;
                break;
            default:
                break;
        }
        return addTimeOut(1500, obj, func, [id,fields]);
    }

    let getBlogRecent = (source, count = 3, fields) => {
        let func,
            obj;
        switch (source) {
            case 'medium':
                func = Medium.getRecent;
                obj = Medium;
                break;
            default:
                break;
        }

        return addTimeOut(1500, obj, func, [count, fields]);

    }

    let getBookRecent = function (count = 3, fields) {
        return addTimeOut(1500,MBook,MBook.getRecent,[count,fields]);

    }

    return {getNewsRecent, getNewsById, getBlogRecent,getBookRecent}
})();