module.exports = function(){
    var express = require('express');
    var router = express.Router();


 function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT loc_id as id, loc_name AS name FROM GoT_Locations ORDER BY loc_name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations  = results;
            complete();
        });
    }


    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT char_id AS id, first_name AS fname, last_name AS lname, status AS life_status, L1.loc_name AS homeland, L2.loc_name AS current_location FROM GoT_Character C INNER JOIN life_status LS ON LS.status_id = C.life_status LEFT JOIN GoT_Locations L1 ON L1.loc_id = C.homeland LEFT JOIN GoT_Locations L2 ON L2.loc_id = C.current_location ORDER BY lname, fname", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

 function getCharactersbyHomeland(req, res, mysql, context, complete){
      var query = "SELECT char_id AS id, first_name AS fname, last_name AS lname, GoT_Locations.loc_id AS homeland FROM GoT_Character INNER JOIN GoT_Locations ON homeland = GoT_Locations.loc_id WHERE GoT_Character.homeland = ?";
      console.log(req.params)
      var inserts = [req.params.homeland]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

        function getCharactersWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT GoT_Character.char_id AS id, first_name AS fname, last_name AS lname, GoT_Locations.loc_id AS homeland FROM GoT_Character INNER JOIN GoT_Locations ON homeland = GoT_Locations.loc_id WHERE GoT_Character.homeland LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

        function getCharacter(res, mysql, context, id, complete){
        var sql = "SELECT char_id as id, first_name AS fname, last_name AS lname, life_status, homeland, current_location FROM GoT_Character WHERE char_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.character = results[0];
            complete();
        });
    }


      function getStatus(res, mysql, context, complete){
        mysql.pool.query("SELECT status_id AS id, status AS name FROM life_status ORDER BY status", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.status = results;
            complete();
        });
      }

        /*Display all characters. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacter.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharacters(res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        getStatus(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('characters', context);
            }

        }
    });


        /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:homeland', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacter.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharactersbyHomeland(req,res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('characters', context);
            }

        }
    });



        /*Display all characters whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
		context.jsscripts = ["deletecharacter.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharactersWithNameLike(req, res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('characters', context);
            }
        }
    });



    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedlocation.js", "updatecharacter.js"];
        var mysql = req.app.get('mysql');
        getCharacter(res, mysql, context, req.params.id, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-character', context);
            }

        }
    });

        /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body.homeland)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO GoT_Character (first_name, last_name, life_status, homeland, current_location) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.life_status, req.body.homeland, req.body.current_location];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/characters');
            }
        });
    });


        /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE GoT_Character SET first_name=?, last_name=?, life_status=?, homeland=?, current_location=? WHERE char_id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.life_status, req.body.homeland, req.body.current_location];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

        /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM GoT_Character WHERE char_id = ?";
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
