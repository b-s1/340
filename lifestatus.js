module.exports = function(){
    var express = require('express');
    var router = express.Router();




/* Select all life statuses in table sorted by id */
function getLifeStatus(res, mysql, context, complete){
    mysql.pool.query("SELECT status_id, status FROM life_status ORDER BY status_id", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.lifestatus = results;
        complete();
    });
}


    /*Display all life statuses*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLifeStatus(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('lifestatus', context);
            }
        }
    });


        /* Adds life status, redirects to same page after */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO life_status (status) VALUES (?)";
        var inserts = [req.body.status];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/lifestatus');
            }
        });
    });


    return router;
}();
