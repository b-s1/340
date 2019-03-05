module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* get people to populate in dropdown */
    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT char_id AS character_id, first_name AS fname, last_name AS lname FROm GoT_Character", function(error, results, fields){
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
            context.Houses = results
            complete();
        });
    }
    


    /* get people with their certificates */
    /* TODO: get multiple certificates in a single column and group on
     * fname+lname or id column
     */
    function getCharactersWithHouses(res, mysql, context, complete){
        sql = "SELECT character_id, Houses.house_id, CONCAT(first_name,' ',last_name) AS full_name, Houses.house_name FROM GoT_Character INNER JOIN GoT_House_Members ON GoT_Character.char_id = GoT_House_Members.character_id INNER JOIN Houses ON Houses.house_id = GoT_House_Members.house_id ORDER BY house_name, full_name"
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


    /* Associate house(s) with a character and 
     * then redirect to the characters_with_houses page after adding 
     */
    router.post('/', function(req, res){
        console.log("We get the multi-select houses dropdown as ", req.body.homes)
        var mysql = req.app.get('mysql');
        // let's get out the certificates from the array that was submitted by the form 
        var houses = req.body.homes
        var character = req.body.character_id
        for (let house of houses) {
          console.log("Processing house id " + house)
          var sql = "INSERT INTO GoT_House_Members (character_id, house_id) VALUES (?,?)";
          var inserts = [character, house];
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

    /* Delete a person's certification record */
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