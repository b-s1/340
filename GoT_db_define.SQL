-- Game of Thrones database definiton file by Clarissa Gasiciel and Biran Shah for CS340

DROP TABLE IF EXISTS life_status;

CREATE TABLE life_status (
status_id int(11) NOT NULL AUTO_INCREMENT,
status varchar(255) NOT NULL,
PRIMARY KEY (status_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


LOCK TABLES life_status WRITE;
INSERT INTO life_status (status) VALUES ('Dead'),('Alive'),('Undead');
UNLOCK TABLES;

DROP TABLE IF EXISTS GoT_Locations;
CREATE TABLE GoT_Locations (
loc_id int(11) NOT NULL AUTO_INCREMENT,
loc_name varchar(50) NOT NULL,
loc_type varchar(10) NOT NULL,
PRIMARY KEY (loc_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


LOCK TABLES GoT_Locations WRITE;
INSERT INTO GoT_Locations (loc_name, loc_type) VALUES ('Castamere', 'Castle'),('Castlerly Rock', 'Castle'),('Castle Black', 'Castle'),('Castle Cerwyn', 'Castle'),('Castle Stokeworth', 'Castle'),('The Citadel', 'Castle'),('The Crag', 'Castle'),('Deepwood Motte', 'Castle'),('DragonStone', 'Castle'),('The Dreadfort', 'Castle'),('Eastwatch-by-the-Sea', 'Castle'),('The Eyrie', 'Castle'),('Flint''s Finger', 'Castle'),('Golden Tooth', 'Castle'),('Greyguard', 'Castle'),('Last Hearth', 'Castle'),('Moat Cailin', 'Castle'),('The Nightfort', 'Castle'),('Oldcastle', 'Castle'),('Pyke', 'Castle'),('Ramsgate', 'Castle'),('Raventree Hall', 'Castle'),('Red Keep', 'Castle'),('Riverrun', 'Castle'),('Runestone', 'Castle'),('Saltshore', 'Castle'),('The Shadow Tower', 'Castle'),('Stone Hedge', 'Castle'),('Storm''s End', 'Castle'),('Summerhall', 'Castle'),('Torrhen''s Square', 'Castle'),('The Twins', 'Castle'),('Widow''s Watch', 'Castle'),('Winterfell', 'Castle'),('Asshai', 'City'),('Astapor', 'City'),('Braavos', 'City'),('King''s Landing','City'),('Lannisport','City'),('Lorath','City'),('Lys','City'),('Mantarys','City'),('Meereen','City'),('Myr','City'),('Norvos','City'),('Old Valyria','City'),('Oldtown','City'),('Pentos','City'),('Qarth','City'),('Qohor','City'),('Sunspear','City'),('Tolos','City'),('Tyrosh','City'),('Volantis','City'),('White Harbor','City'),('Yunkai','City'),('Highgarden', 'Castle'),('Bear Island', 'Island'),('Clegane''s Keep', 'Castle'), ('Vaes Dothrak', 'City'),('Baelish Castle', 'Castle'),('Horn Hill','Castle'),('Beyond the Wall', 'North of The Wall'), ('Evenfall Hall', 'Castle'),('Tyrosh', 'City'), (
'Naath', 'Island'), ('Hellholt', 'Castle'), ('Cape Wrath', 'Lands');
UNLOCK TABLES;


DROP TABLE IF EXISTS Houses;
CREATE TABLE Houses (
house_id int(11) NOT NULL AUTO_INCREMENT,
house_name varchar(50) NOT NULL,
sigil varchar(100) NOT NULL,
base_city int(11) NOT NULL,
PRIMARY KEY (house_id),
KEY base_city (base_city),
FOREIGN KEY (base_city) REFERENCES GoT_Locations (loc_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES Houses WRITE;
INSERT INTO Houses (house_name, sigil, base_city) VALUES ('Stark', 'Grey Direwolf on white', 34),('Lannister', 'Gold Lion on Red', 2),('Barathoen','Crowned black stag jumping on gold', 29),('Arryn','White falcon flying on crescent moon',12),('Bolton','Upside down red extended man on an X-shaped cross',10),('Frey','Two connected gray stone towers over water',32),('Greyjoy','Upside down gold kraken on black',20),('Martell','Golden spear piercing red sun on orange',51),('Targaryen','Red three head dragon on black',9),('Tully','Trout jumping over water on red and blue',24),('Tyrell','Gold rose on green',57), ('House of Black and White', 'Faceless man', 37),('Mormont','Standing bear on white',58), ('Baelish', 'Black mockingbird on yellow', 61), ('Seaworth', 'Onion on black ship on grey', 68), ('Night''s Watch', 'Black Crow', 3) ;
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
INSERT INTO GoT_Character (first_name, last_name, life_status, homeland, current_location) VALUES ('Eddard', 'Stark', 1, 34, null), ('Robert', 'Baratheon', 1, 29, null), ('Jaime', 'Lannister', 2, 2,34),('Catelyn','Stark', 1,24, null ),('Cersi','Lannister',2 ,2 ,23 ),('Daenerys','Targaryen',2 ,9 , 34),('Jorah','Mormont',2 , 58, 34),('Viserys','Targaryen',1 ,38 , null ),('Jon','Snow',2 , 34,34 ),('Sansa','Stark',2 ,34 ,34 ),('Arya','Stark',2 ,34 ,34 ),('Robb','Stark',1 ,34 , null ),('Theon','Greyjoy', 2,24 ,38 ),('Bran','Stark',2 ,34 ,34 ),('Joffrey','Baratheon',1 ,38 , null ),('Sandor','Clegane', 2, 59, 55),('Tyrion','Lannister',2 , 2,34 ),('Khal','Drogo', 1, 60,null ),('Petyr','Baelish',2 ,61 ,null),('Davos','Seaworth',2 , 38,55 ),('Samwell','Tarly',2 ,62 ,34 ),('Stannis','Baratheon',1 ,29 ,null ),('Melisandre','',2 , 35, 54),('Jeor','Mormont',1 ,58 ,null ),('Bronn','',2 , null ,23 ),('Varys','',2 , 41, 55),('Shae','',1 ,40 ,null ),('Margaery','Tyrell',1 ,57 ,null ),('Tywin','Lannister',1 ,2 ,null ),('Talisa','Maegyr', 1,54 ,null ),('Ygritte','',1 ,63 ,null ),('Gendry','',2 ,38 , 11),('Tormund','Giantsbane',2 ,63 ,11 ),('Brienne of Tarth','', 2, 64,34),('Ramsay','Bolton',2 ,10 ,null ),('Gilly','',2 ,63,34 ),('Daario','Naharis', 1,65 ,43 ),('Missandei','',2 , 66,34 ),('Ellaria','Sand',1 , 67,null ),('Tommen','Baratheon',1 , 38,null ),('Jaqen','H''ghar',2 , 37,37 ),('Roose','Bolton',1 ,10 ,null ),('High','Sparrow',1 ,38 ,null ),('Night','King',3 ,63 , 11);
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
INSERT INTO GoT_House_Members VALUES (1, 1), (2, 3), (3,2), (1,4), (9,5),(9,6), (1,6), (13,6), (2,5),(9,8),(1,9),(9,9), (16,9),(1,10),(1,11),(12,11),(1,12),(1,13),(7,13),(1,14),(2,15),(2,17),(9,17),(9,18),(14,19),(1,19),(2,19),(4,19),(10,19),(1,20),(15,20), (1,21),(16,21), (3,22), (3, 23), (16,24),(2,25),(9,26),(2,27),(2,28),(11,28),(2,29),(1,30),(1,32),(1,33),(1,34),(5,35),(9,37),(9,38),(9,39),(8,39),(3,40),(12,41),(1,42),(5,42);
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
INSERT INTO GoT_House_Location VALUES (2, 2), (38, 2), (23,2), (34,1), (29,3),(2,3),(23,3),(12,4),(10,5),(32,6),(24,6),(20,7),(51,8),(9,9),(24,10),(57,11),(37,12),(58,13),(61,14),(68,15),(2,16);
UNLOCK TABLES;

