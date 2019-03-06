module.exports = function(){
    var express = require('express');
    var router = express.Router();


/* Select all locations */
 function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT loc_id as id, loc_name AS name, loc_type AS type FROM GoT_Locations ORDER BY loc_name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations  = results;
            complete();
        });
    }




      /* Function to select a single location */
        function getLocation(res, mysql, context, id, complete){
        var sql = "SELECT loc_id AS id, loc_name AS name, loc_type AS type FROM GoT_Locations WHERE loc_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.location = results[0];
            complete();
        });
    }




    /* Display page showing all locations. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletelocation.js"];
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }

        }
    });




    /* Display one location for the specific purpose of updating location */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedType.js", "updatelocation.js"];
        var mysql = req.app.get('mysql');
        getLocation(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-locations', context);
            }

        }
    });


    /* Adds a location, redirects to the location page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO GoT_Locations (loc_name, loc_type) VALUES (?,?)";
        var inserts = [req.body.name, req.body.type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/locations');
            }
        });
    });


    /* The URI that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE GoT_Locations SET loc_name=?, loc_type=? WHERE loc_id=?";
        var inserts = [req.body.name, req.body.type, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }

            else{
                res.status(200);
                res.end();
            }
        });
    });


    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM GoT_Locations WHERE loc_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
