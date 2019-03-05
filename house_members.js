module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* get people to populate in dropdown */
    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT char_id, first_name, last_name FROm GoT_Character", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    /* get certificates to populate in dropdown */
    function getHouses(res, mysql, context, complete){
        sql = "SELECT house_id, house_name FROM Houses";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.manyhouses = results
            complete();
        });
    }
    
    /* get people with their certificates */
    /* TODO: get multiple certificates in a single column and group on
     * fname+lname or id column
     */
    function getCharactersWithHouses(res, mysql, context, complete){
        sql = "SELECT char_id, Houses.house_id, CONCAT(first_name,' ',last_name) AS name, Houses.house_name FROM GoT_Character INNER JOIN GoT_House_Members on GoT_Character.char_id = GoT_House_Members.character_id INNER JOIN Houses on Houses.house_id = GoT_House_Members.house_id ORDER BY name, house_name"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.characters_with_houses = results
            complete();
        });
    }


    /* List people with certificates along with 
     * displaying a form to associate a person with multiple certificates
     */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacter.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'house_members'

        getCharacters(res, mysql, context, complete);
        getHouses(res, mysql, context, complete);
        getCharactersWithHouses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });

    /* Associate certificate or certificates with a person and 
     * then redirect to the people_with_certs page after adding 
     */
    router.post('/', function(req, res){
        console.log("We get the multi-select houses dropdown as ", req.body.huts)
        var mysql = req.app.get('mysql');
        // let's get out the certificates from the array that was submitted by the form 
        var manyhouses = req.body.huts
        var onecharacter = req.body.char_id
        for (let home of manyhouses) {
          console.log("Processing house id " + home)
          var sql = "INSERT INTO GoT_House_Members (character_id, house_id) VALUES (?,?)";
          var inserts = [onecharacter, home];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                //TODO: send error messages to frontend as the following doesn't work
                /* 
                res.write(JSON.stringify(error));
                res.end();
                */
                console.log(error)
            }
          });
        } //for loop ends here 
        res.redirect('/house_members');
    });

    /* Delete a character's house record */
    /* This route will accept a HTTP DELETE request in the form
     * /pid/{{pid}}/cert/{{cid}} -- which is sent by the AJAX form 
     */
    router.delete('/character_id/:character_id/house_id/:house_id', function(req, res){
        //console.log(req) //I used this to figure out where did pid and cid go in the request
        console.log(req.params.character_id)
        console.log(req.params.house_id)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM GoT_House_Members WHERE character_id = ? AND house_id = ?";
        var inserts = [req.params.character_id, req.params.house_id];
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
