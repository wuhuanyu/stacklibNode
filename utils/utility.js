const range = function (start=0,step=1,end) {
    let range = [];
    range[0] = start;
    while(start+step<=end){
        range[range.length] = start+=step;
    }
    return range;
};


const n_param = function (min_len = 2,str) {
    let n_params = [];
    range(min_len,1,str.length).forEach(
        (size)=>{
            range(0,1,Math.max(0,str.length-size)).forEach((index)=>{n_params.push(str.slice(index,index+size))});
        }
    );
    return n_params;
};

const isNum = (num)=>(!isNaN(num));

// n_params(3,'hello').forEach(i=>console.log(i));

module.exports.range = range;
module.exports.n_param = n_param;
module.exports.isNum = isNum;






