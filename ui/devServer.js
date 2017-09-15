const path  = require('path');

const express = require('express');

const app =express();

app.use(express.static(__dirname+'/dist'));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/public/index.html'));

});

const port = 3001;
app.listen(port,'localhost',function(e){
    if(e){
        console.log(e);
    } else{
        console.info('listen on: '+port)
    }
});
