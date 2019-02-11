DROP TABLE IF EXISTS life_status;

CREATE TABLE life_status (
status_id int(11) NOT NULL AUTO_INCREMENT,
status varchar(255) NOT NULL,
PRIMARY KEY (status_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


LOCK TABLES life_status WRITE;
INSERT INTO life_status VALUES (1, 'Dead'),(2, 'Alive'),(3, 'Undead');
UNLOCK TABLES;

DROP TABLE IF EXISTS GoT_Locations;
CREATE TABLE GoT_Locations (
loc_id int(11) NOT NULL AUTO_INCREMENT,
loc_name varchar(50) NOT NULL,
loc_type varchar(10) NOT NULL,
population int(11) DEFAULT NULL,
PRIMARY KEY (loc_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


LOCK TABLES GoT_Locations WRITE;
INSERT INTO GoT_Locations VALUES (1, 'Castamere', 'Castle', null),(2, 'Castlerly Rock', 'Castle', null),(3,'Castle Black', 'Castle', null),(4,'Castle Cerwyn', 'Castle', null),(5,'Castle Stokeworth', 'Castle', null),(6,'The Citadel', 'Castle', null),(7, 'The Crag', 'Castle', null),(8,'Deepwood Motte', 'Castle', null),(9,'DragonStone', 'Castle', null),(10,'The Dreadfort', 'Castle', null),(11,'Eastwatch-by-the-Sea', 'Castle', null),(12,'The Eyrie', 'Castle', null),(13,'Flint''s Finger', 'Castle', null),(14,'Golden Tooth', 'Castle', null),(15,'Greyguard', 'Castle', null),(16,'Last Hearth', 'Castle', null),(17,'Moat Cailin', 'Castle', null),(18,'The Nightfort', 'Castle', null),(19,'Oldcastle', 'Castle', null),(20,'Pyke', 'Castle', null),(21,'Ramsgate', 'Castle', null),(22,'Raventree Hall', 'Castle', null),(23,'Red Keep', 'Castle', null),(24,'Riverrun', 'Castle', null),(25,'Runestone', 'Castle', null),(26,'Saltshore', 'Castle', null),(27,'The Shadow Tower', 'Castle', null),(28,'Stone Hedge', 'Castle', null),(29,'Storm''s End', 'Castle', null),(30,'Summerhall', 'Castle', null),(31,'Torrhen''s Square', 'Castle', null),(32,'The Twins', 'Castle', null),(33,'Widow''s Watch', 'Castle', null),(34,'Winterfell', 'Castle', null),(35,'Asshai', 'City', null),(36,'Astapor', 'City', null);
UNLOCK TABLES;


DROP TABLE IF EXISTS Houses;
CREATE TABLE Houses (
house_id int(11) NOT NULL AUTO_INCREMENT,
house_name varchar(50) NOT NULL,
sigil varchar(50) NOT NULL,
base_city int(11) NOT NULL,
PRIMARY KEY (house_id),
KEY base_city (base_city),
FOREIGN KEY (base_city) REFERENCES GoT_Locations (loc_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES Houses WRITE;
INSERT INTO Houses VALUES (1, 'Stark', 'Grey Direwolf on white', 34),(2, 'Lannister', 'Gold Lion on Red', 2);
UNLOCK TABLES;

DROP TABLE IF EXISTS GoT_Character;
CREATE TABLE GoT_Character (
char_id int(11) NOT NULL AUTO_INCREMENT,
first_name varchar(50) NOT NULL,
last_name varchar(50) DEFAULT NULL,
life_status int(1) NOT NULL,
homeland int(3) DEFAULT NULL,
current_location int(3) DEFAULT NULL,
PRIMARY KEY (char_id),
FOREIGN KEY (life_status) REFERENCES life_status (status_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (homeland) REFERENCES GoT_Locations (loc_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (current_location) REFERENCES GoT_Locations (loc_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
 
LOCK TABLES GoT_Character WRITE;
INSERT INTO GoT_Character VALUES (1, 'Eddard', 'Stark', 1, 34, null), (2, 'Robert', 'Baratheon', 1, 29, null), (3,'Jaime', 'Lannister', 2, 2,34);
UNLOCK TABLES;


DROP TABLE IF EXISTS GoT_House_Members;
CREATE TABLE GoT_House_Members (
house_id int(2)  NOT NULL,
character_id int(3) NOT NULL,
PRIMARY KEY (house_id, character_id),
KEY character_id (character_id),
FOREIGN KEY (house_id) REFERENCES Houses (house_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (character_id) REFERENCES GoT_Character (char_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES GoT_House_Members WRITE;
INSERT INTO GoT_House_Members VALUES (1, 1), (2, 3);
UNLOCK TABLES;


DROP TABLE IF EXISTS GoT_House_Location;
CREATE TABLE GoT_House_Location (
location_id int(3)  NOT NULL,
house_id int(3) NOT NULL,
PRIMARY KEY (location_id,house_id),
KEY location_id (location_id),
FOREIGN KEY (location_id) REFERENCES GoT_Locations (loc_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (house_id) REFERENCES Houses (house_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES GoT_House_Location WRITE;
INSERT INTO GoT_House_Location VALUES (2, 2), (23, 2), (2, 1);
UNLOCK TABLES;

