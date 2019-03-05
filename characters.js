module.exports = function(){
  var express = require('express');
  var router = express.Router();

  //Select all characters from database
  function getChar(res, mysql, context, complete){
    //Select query for character info
    var selectQ = 'SELECT char_id AS id, first_name AS fname, last_name AS lname, status, loc_name AS home, loc_name AS currLoc, house_name AS house FROM GoT_Character C INNER JOIN life_status LS ON LS.status_id = C.life_status LEFT JOIN GoT_Locations L ON L.loc_id = C.homeland LEFT JOIN L ON L.loc_id = C.current_location LEFT JOIN GoT_House_Members HM ON HM.character_id = C.char_id INNER JOIN Houses H on H.house_id = HM.house_id';
    mysql.pool.query(selectQ, function(error, results, fields){
      //If error, display error message and end process
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }

      context.characters = results;
      complete();
    });
  }


  //Select locations from database
  function getLoc(res, mysql, context, complete){
    //Select query for location info
    var selectQ = 'SELECT loc_id AS id, loc_name AS name FROM GoT_Locations';
    mysql.pool.query(selectQ, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }

      context.locations = results;
      complete();
    });
  }


  //Select life status from database
  function getStatus(res, mysql, context, complete){
    var selectQ = 'SELECT status_id AS id, status AS name FROM life_status';
    mysql.pool.query(selectQ, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }

      context.lifeStatus = results;
      complete();
    });
  }


  //Select house from database
  function getHouse(res, mysql, context, complete){
    var selectQ = 'SELECT house_id AS id, house_name AS name FROM Houses';
    mysql.pool.query(selectQ, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }

      context.houses = results;
      complete();
    });
  }


  //Select characters belonging to particular house
  function getCharByHouse(req, res, mysql, context, complete){
    var query = "SELECT char_id AS id, first_name AS fname, last_name AS lname, status, loc_name AS home, loc_name AS currLoc, house_name AS house FROM GoT_Character C INNER JOIN life_status LS ON LS.status_id = C.life_status LEFT JOIN GoT_Locations L ON L.loc_id = C.homeland LEFT JOIN L ON L.loc_id = C.current_location LEFT JOIN GoT_House_Members HM ON HM.character_id = C.char_id INNER JOIN Houses H on H.house_id = HM.house_id WHERE house = ?";
    console.log(req.params);
    var inserts = [req.params.house];

    mysql.pool.query(query, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }

      context.characters = results;
      complete();
    });
  }


  //Display all characters in Database
  router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = [];
    var mysql = req.app.get('mysql');
    getChar(res, mysql, context, complete);
    getLoc(res, mysql, context, complete);
    getStatus(res, mysql, context, complete);
    getHouse(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 4){
        res.render('characters', context);
      }
    }
  });
}
