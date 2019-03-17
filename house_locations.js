module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* get houses in dropdown */
    function getHouses(res, mysql, context, complete){
        mysql.pool.query("SELECT house_id, house_name FROM Houses ORDER BY house_name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.houses = results;
            complete();
        });
    }


        /* get houses to populate in dropdown */
        function getLocations(res, mysql, context, complete){
            sql = "SELECT loc_id, loc_name FROM GoT_Locations ORDER BY loc_name";
            mysql.pool.query(sql, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end()
                }
                context.manyplaces = results
                complete();
            });
        }


    /* get houses with locations    */
    function getHouseLocations(res, mysql, context, complete){
        sql = "SELECT Houses.house_id, GoT_Locations.loc_id, house_name, GoT_Locations.loc_name FROM Houses INNER JOIN GoT_House_Location on Houses.house_id = GoT_House_Location.house_id INNER JOIN GoT_Locations on GoT_Locations.loc_id = GoT_House_Location.location_id ORDER BY house_name, loc_name"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.house_with_locations = results
            complete();
        });
    }


    /* list houses with locations  */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'house_locations'

        getHouses(res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        getHouseLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });



        /* Add location to a house and redir to same page  */
        router.post('/', function(req, res){
            console.log("We get the multi-select locations dropdown as ", req.body.spots)
            var mysql = req.app.get('mysql');

            var manyplaces = req.body.spots
            var oneplace = req.body.house_id
            for (let onespot of manyplaces) {
              console.log("Processing house id " + onespot)
              var sql = "INSERT INTO GoT_House_Location (house_id, location_id) VALUES (?,?)";
              var inserts = [oneplace, onespot];
              sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    console.log(error)
                }
              });
            }
            res.redirect('/house_locations');
        });

    return router;
}();
