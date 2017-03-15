
var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');


/*
GET : /timedetails => Gives all timedetails
GET : /timedetails/top/:n => Gives top 'n' timedetails
GET : /urlpks => Gives all Listed Urls and PrimaryKeys
GET : /urlpks/search/:id => Gives Listed Urls and PrimaryKeys pertaining to the given newsProvider
GET : /category => Gives all the Category Sentiment Relationships
GET : /category/:D/:M/:Y => Gives data on categories for the given date
GET : /category/sentiment/:cat/  => Gives all time Sentiment for the given category
GET : /category/sentiment/:cat/:D/:M/:Y => gives the sentiment for the given day for the given category
GET : /category/list/:cat => gives all the values necessary to plot in arrays
GET : /namedentity/ => Gives NamedEntities 
GET : /namedentity/:name => Returns all captured Data relting to the NE
GET : /namedentity/:name/:D/:M/:Y => Gives NamedEntities and the reateed values for the given date
 
*/

router.get('/timedetails',function(req,res,next){
    var Data = new sqlite.Database('./NumbersData.db');
    function run(){
    Data.serialize(
        function(){
        Data.all("SELECT * FROM TimeDetails",function(err, rows) {
            rows = rows.sort(function(a, b) {
                return parseFloat(b.starttime) - parseFloat(a.endtime);
            });
            res.send(rows);
        });
        
    });
    Data.close();  
}
    run()
    
});

router.get('/timedetails/top/:n',function(req,res,next){
    function run(){
    var Data = new sqlite.Database('./NumbersData.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM TimeDetails",function(err, rows) {
            console.log(err);   
            rows.sort(function(a,b) {
                return parseFloat(a.starttime) - parseFloat(b.endtime);
                });
            var n = parseInt(req.params.n);
            res.send(rows.slice(0,n));
            });
        });
    Data.close();  
    }
    run()    
});


router.get('/urlpks',function(req,res,next){
    function run(){
    var Data = new sqlite.Database('./NumbersData.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM PrimaryKeys",function(err, rows) {
            res.send(rows);
        });
    });
    Data.close();  
}
    run()
    
});


router.get('/urlpks/search/:id',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./NumbersData.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM PrimaryKeys",function(err, rows) {
            var sendList = [];
            var id = req.params.id;
            var regExp = new RegExp(id);
            for(var i = 0;i<rows.length;i++){
                var url = rows[i]['url'];
                if (regExp.test(url)){
                    sendList.push(rows[i]);
                }
            }
            res.send(sendList);
            });
        });
    Data.close();  
    }
    run()    
});



router.get('/category/',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            res.send(rows);
        });
    });
    Data.close();  
}
    run()
    
});

router.get('/category/:D/:M/:Y',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
            Data.all("SELECT * FROM CatSent",function(err, rows) {
                //console.log(err);
                var sendList = [];
                var common =[];
                var listSent = [0,0,0,0,0,0,0,0,0,0,0];
                var listCount = [0,0,0,0,0,0,0,0,0,0,0];
                var listVol = [0,0,0,0,0,0,0,0,0,0,0];

                var categories = ["Communism", "Crime", "Drugs", "Economy", "Education","Employment",
                "Environment",  "Fascism", "Feminism", "ForeignPolicy", "Healthcare"];
                
                var day0 = parseInt(req.params.D);
                var month0 = parseInt(req.params.M);
                var year0 = parseInt(req.params.Y);

                for(var i=0 ; i < rows.length ; i++){
                    var timestamp = rows[i]['timestamp'];
                    var category = rows[i]['category'];
                    var sentiment = rows[i]['sentiment'];
                    var volume = rows[i]['timestamp'];

                    var date = new Date(timestamp*1000);
                    var day1 = date.getDate();
                    var month1 = date.getMonth();
                    var year1 = date.getFullYear();
                    if ((day0 == day1 || !day0)&&( month0 == month1 || !month0 ) &&( year0==year1 || !year0)){
                        common.push(rows[i]);
                    }
                }
                
                for(var i=0;i<common.length;i++){
                
                    var sent = common[i]['sentiment'];
                    var vol = common[i]['volume'];
                    var c = common[i]['category'];

                    for(var j=0;j<categories.length;j++){
                        if (categories[j] == c){
                            listSent[j] += sent;
                            listCount[j] += 1;
                            listVol[j] += vol;
                        }
                    }
                }
                for(var i=0;i<listSent.length;i++){
                        listSent[i] = listSent[i]/listCount[i]
                    }
                for(var j=0;j<categories.length;j++){
                    sendList.push({"category" : categories[j],
                                    "volume" : listVol[j],
                                    "sentiment" : listSent[j]});
                }

            res.send(sendList);
            });
        });
    Data.close();  
    }
    run()    
});

router.get('/category/sentiment/:cat',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            var sendList = [];
            var cat = req.params.cat;
            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['timestamp'];

                if (category == cat ){
                    sendList.push(rows[i]);
                }
            }
            res.send(sendList);
            });
        });
    Data.close();  
    }
    run()    
});


router.get('/category/sentiment/:cat/:D/:M/:Y',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            var sendList = [];
            var common = [];
            var day0 = parseInt(req.params.D);
            var month0 = parseInt(req.params.M);
            var year0 = parseInt(req.params.Y);
            var cat = req.params.cat.toString();
            var regExp = new RegExp(cat.toLowerCase());
            
            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['timestamp'];

                var date = new Date(timestamp*1000);
                var day1 = date.getDate();
                var month1 = date.getMonth();
                var year1 = date.getFullYear();
                if ((day0 == day1 || !day0)&&( month0 == month1 || !month0 ) &&( year0==year1 || !year0)){
                                                        
                    if(regExp.test(category.toLowerCase())){
                        common.push(rows[i]);  
                    }
                }
            }
            
            var sentiment = 0;
            var volume = 0;
            var count = 0;
            for(var i=0 ; i< common.length; i++){
                if (common[i]["sentiment"] != 0 && common[i][volume] != 0){
                    count ++;
                    sentiment = sentiment + common[i]['sentiment'];
                    volume = volume + common[i]['volume'];               
                }
            }
            sentiment = sentiment/count;
            res.send({"category" : cat, "sentiment" : sentiment, "volume" : volume});
        });
        
        });
    Data.close();  
    }
    run()    
});

router.get('/category/sentimentlist/:cat',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            var sendList = [];
            var common = [];
            var cat = req.params.cat.toString();
            var regExp = new RegExp(cat.toLowerCase());
            
            timestamps = [];
            sentiments =[];
            volumes =[];

            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['volume'];

                if(regExp.test(category.toLowerCase())){
                    timestamps.push(timestamp);
                    volumes.push(volume);
                    sentiments.push(sentiment);
                }
            }
            res.send(sentiments);
        });
        
        });
    Data.close();  
    }
    run()    
});


router.get('/category/volumelist/:cat',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            var sendList = [];
            var common = [];
            var cat = req.params.cat.toString();
            var regExp = new RegExp(cat.toLowerCase());
            
            timestamps = [];
            sentiments =[];
            volumes =[];

            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['volume'];

                if(regExp.test(category.toLowerCase())){
                    timestamps.push(timestamp);
                    volumes.push(volume);
                    sentiments.push(sentiment);
                }
            }
            res.send(volumes);
        });
        
        });
    Data.close();  
    }
    run()    
});

router.get('/category/timestamplist/:cat',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatSent",function(err, rows) {
            var sendList = [];
            var common = [];
            var cat = req.params.cat.toString();
            var regExp = new RegExp(cat.toLowerCase());
            
            timestamps = [];
            sentiments =[];
            volumes =[];

            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['volume'];

                if(regExp.test(category.toLowerCase())){
                    timestamps.push(timestamp);
                    volumes.push(volume);
                    sentiments.push(sentiment);
                }
            }
            res.send(timestamps);
        });
        
        });
    Data.close();  
    }
    run()    
});

router.get('/namedentity/',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatNE",function(err, rows) {
            res.send(rows);
        });
    });
    Data.close();  
}
    run()
    
});


router.get('/namedentity/:name',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatNE",function(err, rows) {
            var sendList = [];
            var name = req.params.name.toString();
            var regExp = new RegExp(name.toLowerCase());
            
            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['timestamp'];
                var NE = rows[i]['NE'];
                var date = new Date(timestamp*1000);                                   
                if(regExp.test(NE.toLowerCase())){
                    sendList.push(rows[i]);
                }
            }
            res.send(sendList);
        });
        
    });
    Data.close();  
}
run()    
});



router.get('/namedentity/:name/:D/:M/:Y',function(req,res,next){
    
    function run(){
    var Data = new sqlite.Database('./Plot.db');
    Data.serialize(
        function(){
        Data.all("SELECT * FROM CatNE",function(err, rows) {
            var sendList = [];
            var common = [];
            var day0 = parseInt(req.params.D);
            var month0 = parseInt(req.params.M);
            var year0 = parseInt(req.params.Y);
            var name = req.params.name.toString();
            var regExp = new RegExp(name.toLowerCase());
            
            for(var i=0 ; i < rows.length ; i++){
                var timestamp = rows[i]['timestamp'];
                var category = rows[i]['category'];
                var sentiment = rows[i]['sentiment'];
                var volume = rows[i]['timestamp'];
                var NE = rows[i]['NE'];
                var date = new Date(timestamp*1000);
                var day1 = date.getDate();
                var month1 = date.getMonth();
                var year1 = date.getFullYear();
                if ((day0 == day1 || !day0)&&( month0 == month1 || !month0 ) &&( year0==year1 || !year0)){
                                                        
                    if(regExp.test(NE.toLowerCase())){
                        common.push(rows[i]);  
                    }
                }
            }
            
            var sentiment = 0;
            var volume = 0;
            for(var i=0 ; i< common.length; i++){
                sentiment = sentiment + common[i]['sentiment'];
                volume = volume + common[i]['volume'];               
            }
            sentiment = sentiment/common.length
            res.send(common);
        });
        
        });
    Data.close();  
    }
    run()    
});


module.exports = router;
