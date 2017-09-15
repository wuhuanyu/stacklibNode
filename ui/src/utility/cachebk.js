window.cache = (function () {
    let pushIntoCache = function (source, obj) {
        if(checkExists(source,obj._id)){
          let index =  source.data.findIndex(x=>x._id===obj._id);
          let item = source.data.filter(x=>x._id===obj._id);
          item = Object.assign(item,Object.assign({},obj));
          source.data[index] = item;
        }
        else{
            source.data.push(Object.assign({},obj));
        }
    }

    let checkExists = function(source,id){
        let exists = false;
        source.data.forEach(e=>{
            if(e._id===id){
                exists=true;
            }
        });
        return exists;
    }

    let manupilate = function(source,action,domain,id){
        
    }

    let cache = {
        medim: {
            recent: [],
            data: []
        },
        bbc: {
            header: [],
            recent: {},
            data: []
        },
        cnn: {
            header: [],
            recent: {},
            data: []
        },
        reuters: {
            header: [],
            recent: {},
            data: []
        },
        mbook: {
            recent: {},
            data: []
        }

    }

    return {cache,pushIntoCache,checkExists}

})();