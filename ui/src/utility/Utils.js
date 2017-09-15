const monment = require('moment');


export const isNum = (n) => !isNaN(n);
export const capitalize = (str) => {
    if (typeof str !== 'string') 
        throw '[Capitalize] typeof parameter [n] must be string';
    return str[0].toUpperCase() + str.slice(1);
}

export const num2Time = (date) => {
    let newDate;
    if (isNum(date)) {
        date=monment.unix(date);
        return date.toString();
    }
    return date;
    
}


