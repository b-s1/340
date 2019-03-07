-- Game of Thrones database manipulation queries.
-- All queries are usable for a SQL implementation as per project step 3 requirements, no JS included
-- order of functions per project requirement: 1. insert, 2. select, 3. delete, 4. update


-- 1.
-- INSERT

-- add new life status and description of life status
INSERT INTO life_status (status_id, status) VALUES (4, 'ghost');

-- add new location
INSERT INTO GoT_Locations (loc_name, loc_type, population) VALUES ('Sunspear', 'Castle', 100000);

-- add new house
INSERT INTO Houses (house_name, sigil, base_city) VALUES ('Martell', 'A red sun pierced by a gold spear on orange', 38);

-- add new character
INSERT INTO GoT_Character (first_name, last_name, life_status, homeland, current_location) VALUES ('Sansa', 'Stark', 2, 34, 34);

-- add new character into a house
INSERT INTO GoT_House_Members (house_id, character_id) VALUES (1,4);

-- add location for a new house
INSERT INTO GoT_House_Location (location_id, house_id) VALUES (38, 3);


-- 2
-- SELECT

-- Select all locations and order by name
SELECT loc_id as id, loc_name AS name FROM GoT_Locations ORDER BY loc_name;

-- group all the characters together by life status
SELECT * FROM life_status LEFT JOIN GoT_Character ON life_status.status_id = GoT_Character.life_status;

-- show all the houses
-- SELECT * FROM Houses;

-- shows all characters with last name 'Stark' who share the same homeland -- as a house does (ex: sansa stark and eddard stark both have the last name -- 'stark', and both have the same homeland as a house's base city.

SELECT GoT_Character.first_name, GoT_Character.last_name, Houses.base_city, Houses.house_name FROM Houses INNER JOIN GoT_Character ON Houses.base_city = GoT_Character.homeland WHERE GoT_Character.last_name = 'Stark';

-- shows the houses and locations
SELECT * FROM GoT_House_Location;

-- shows the house members per house
SELECT * FROM GOT_House_Members;

-- Display all character information replacing life status, homeland, and current location foreign keys with names
SELECT char_id AS id, first_name AS fname, last_name AS lname, status AS life_status, L1.loc_name AS homeland, L2.loc_name AS current_location FROM GoT_Character C INNER JOIN life_status LS ON LS.status_id = C.life_status LEFT JOIN GoT_Locations L1 ON L1.loc_id = C.homeland LEFT JOIN GoT_Locations L2 ON L2.loc_id = C.current_location ORDER BY lname, fname;


-- Filter characters by specified homeland
SELECT char_id AS id, first_name AS fname, last_name AS lname, status AS life_status, L1.loc_name AS homeland, L2.loc_name AS current_location FROM GoT_Character C INNER JOIN life_status LS ON LS.status_id = C.life_status LEFT JOIN GoT_Locations L1 ON L1.loc_id = C.homeland LEFT JOIN GoT_Locations L2 ON L2.loc_id = C.current_location WHERE homeland = ? ORDER BY lname, fname;

-- Select character with specified id
SELECT char_id AS id, first_name AS fname, last_name AS lname, life_status, homeland, current_location FROM GoT_Character WHERE char_id = ?;

-- Select all entries in life_status table
SELECT status_id AS id, status AS name FROM life_status ORDER BY status;



-- 3
-- DELETE

-- Delete a character
DELETE FROM GoT_Characters WHERE life_status = 1;


-- Delete character with specified id
DELETE FROM GoT_Character WHERE char_id = ?;


-- 4
-- UPDATE

-- change eddard stark homeland from winterfell to castlerly rock.
UPDATE GoT_Character SET homeland = 2 WHERE first_name = 'Eddard';


-- Update character information to user-specified values
UPDATE GoT_Character SET first_name=?, last_name=?, life_status=?, homeland=?, current_location=? WHERE char_id=?;
