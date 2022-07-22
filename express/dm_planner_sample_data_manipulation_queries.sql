-- -----------------------------------------------------
-- Queries for Dungeon Masters page
-- -----------------------------------------------------

-- View table of all dungeon masters
SELECT * FROM Dungeon_Masters;

-- Create a new dungeon master
INSERT INTO Dungeon_Masters (dungeon_master_name, lucky_dice)
VALUES (:dungeon_master_name_input, :lucky_dice_input);

-- Delete a dungeon master using the id of the dungeon master selected on the Dungeon Masters page
DELETE FROM Dungeon_Masters WHERE dungeon_master_id= :dungeon_master_id_selected;

-- Update a dungeon master's information
UPDATE Dungeon_Masters
SET dungeon_master_name = :dungeon_master_name_input, lucky_dice = :lucky_dice_input
WHERE dungeon_master_id= :dungeon_master_id_selected;

-- -----------------------------------------------------
-- Queries for Scenarios page
-- -----------------------------------------------------

-- View table of all scenarios
SELECT scenario_id, scenario_name, summary, target_level, session_time, 
Dungeon_Masters.dungeon_master_name, Dungeons.dungeon_name
FROM Scenarios
INNER JOIN Dungeon_Masters ON Scenarios.dungeon_master_id = Dungeon_Masters.dungeon_master_id
INNER JOIN Dungeons ON Scenarios.dungeon_id = Dungeons.dungeon_id;

-- Populate a dropdown for associating with a dungeon master
SELECT dungeon_master_id, dungeon_master_name FROM Dungeon_Masters;

-- Populate a dropdown for associating with a dungeon
SELECT dungeon_id, dungeon_name FROM Dungeons;

-- Create a new scenario
INSERT INTO Scenarios (scenario_id, scenario_name, summary, target_level, session_time, 
dungeon_master_id, dungeon_id)
VALUES (:scenario_id_input, :scenario_name_input, :summary_input, :target_level_input, 
:session_time_input, :dungeon_master_id_from_dropdown, :dungeon_id_from_dropdown);

-- Delete a scenario using the id of the scenario selected on the Scenarios page
DELETE FROM Scenarios WHERE scenario_id= :scenario_id_selected;

-- Update a scenario's information
UPDATE Scenarios
SET scenario_name = :scenario_name_input, summary = :summary_input, 
target_level = :target_level_input, session_time = :session_time_input, 
dungeon_master_id = :dungeon_master_id_from_dropdown, dungeon_id = :dungeon_id_from_dropdown
WHERE scenario_id= :scenario_id_selected;

-- -----------------------------------------------------
-- Queries for Dungeons page
-- -----------------------------------------------------

-- View table of all dungeons
SELECT dungeon_id, dungeon_name, description, light_level, Biomes.biome_name
FROM Dungeons
INNER JOIN Biomes ON Dungeons.biome_id = Biomes.biome_id;

-- Populate a dropdown for associating with a biome
SELECT biome_id, biome_name from Biomes;

-- Create a new dungeon
INSERT INTO Dungeons (dungeon_name, description, light_level, biome_id)
VALUES (:dungeon_name_input, :description_input, :light_level_input, :biome_id_from_dropdown);

-- Delete a dungeon using the id of the dungeon selected on the Dungeons page
DELETE FROM Dungeons WHERE dungeon_id= :dungeon_id_selected;

-- Update a dungeon's information
UPDATE Dungeons
SET dungeon_name = :dungeon_name_input, description = :description_input, 
light_level = :light_level_input, biome_id = :biome_id_from_dropdown
WHERE dungeon_id= :dungeon_id_selected;

-- -----------------------------------------------------
-- Queries for Monsters page
-- -----------------------------------------------------

-- View table of all monsters
SELECT * FROM Monsters;

-- Create a new monster
INSERT INTO Monsters (monster_name, description, challenge_rating, health_points, strength, 
dexterity, constitution, intelligence, wisdom, charisma, armor_class, talent)
VALUES (:monster_name_input, :description_input, :challenge_rating_input, :health_points_input, 
:strength_input, :dexterity_input, :constitution_input, :intelligence_input, :wisdom_input, 
:charisma_input, :armor_class_input, :talent_input);

-- Delete a monster using the id of the monster selected on the Monsters page
DELETE FROM Monsters WHERE monster_id = :monster_id_selected;

-- Update a monster's information
UPDATE Monsters
SET monster_name = :monster_name_input, description = :description_input, 
challenge_rating = :challenge_rating_input, health_points = :health_points_input, 
strength = :strength_input, dexterity = :dexterity_input, constitution = :constitution_input, 
intelligence = :intelligence_input, wisdom = :wisdom_input, charisma = :charisma_input, 
armor_class = :armor_class_input, talent = :talent_input
WHERE monster_id = :monster_id_selected;

-- -----------------------------------------------------
-- Queries for Items page
-- -----------------------------------------------------

-- View table of all items
SELECT item_id, item_name, Items.description, weight, value, Types.type_name FROM Items
INNER JOIN Types ON Items.type_id = Types.type_id;

-- Populate a dropdown for associating with a type
SELECT type_id, type_name from Types;

-- Create a new item
INSERT INTO Items (item_name, description, weight, value, type_id)
VALUES (:item_name_input, :description_input, :weight_input, :value_input, :type_id_from_dropdown);

-- Delete an item using the id of the item selected on the Items page
DELETE FROM Items WHERE item_id = :item_id_selected;

-- Update an item's information
UPDATE Items
SET item_name = :item_name_input, description = :description_input, weight = :weight_input, 
value = :value_input, type_id = :type_id_from_dropdown
WHERE item_id = :item_id_selected;

-- -----------------------------------------------------
-- Queries for Biomes page
-- -----------------------------------------------------

-- View table of all biomes
SELECT * FROM Biomes;

-- Create a new biome
INSERT INTO Biomes (biome_name, description)
VALUES (:biome_name_input, :description_input);

-- Delete a biome using the id of the biome selected on the Biomes page
-- NOT ALLOWED BY DATABASE

-- Update a biome's information
UPDATE Biomes
SET biome_name = :biome_name_input, description = :description_input
WHERE biome_id = :biome_id_selected;

-- -----------------------------------------------------
-- Queries for Types page
-- -----------------------------------------------------

-- View table of all types
SELECT * FROM Types;

-- Create a new type
INSERT INTO Types (type_name, description)
VALUES (:type_name_input, :description_input);

-- Delete a type using the id of the type selected on the Types page
-- NOT ALLOWED BY DATABASE

-- Update a type's information
UPDATE Types
SET type_name = :type_name_input, description = :description_input
WHERE type_id = :type_id_selected;

-- -----------------------------------------------------
-- Queries for Dungeons_Has_Monsters page
-- -----------------------------------------------------

-- View intersection table of all monsters associated with dungeons
SELECT dungeon_has_monster_id, dungeon_name, monster_name, quantity
FROM Dungeons_Has_Monsters
INNER JOIN Dungeons ON Dungeons_Has_Monsters.dungeon_id = Dungeons.dungeon_id
INNER JOIN Monsters ON Dungeons_Has_Monsters.monster_id = Monsters.monster_id
ORDER BY dungeon_name;

-- Populate a dropdown for associating with a dungeon
SELECT dungeon_id, dungeon_name from Dungeons;

-- Populate a dropdown for associating with a monster
SELECT monster_id, monster_name from Monsters;

-- Create a new relationship between Dungeons and Monsters
INSERT INTO Dungeons_Has_Monsters (dungeon_id, monster_id, quantity)
VALUES (:dungeon_id_from_dropdown, :monster_id_from_dropdown, quantity_input);

-- Delete a relationship using the id of the relationship selected on the Dungeons Has Monsters page
DELETE FROM Dungeons_Has_Monsters WHERE dungeon_has_monster_id = :dungeon_has_monster_id_selected;

-- Update a relationship's information
UPDATE Dungeons_Has_Monsters
SET dungeon_id = :dungeon_id_from_dropdown, monster_id = :monster_id_from_dropdown, quantity = :quantity_input
WHERE dungeon_has_monster_id = :dungeon_has_monster_id_selected;

-- -----------------------------------------------------
-- Queries Scenarios_Has_Items page
-- -----------------------------------------------------

-- View intersection table of all items associated with scenarios
SELECT scenario_has_item_id, scenario_name, item_name, quantity
FROM Scenarios_Has_Items
INNER JOIN Scenarios ON Scenarios_Has_Items.scenario_id = Scenarios.scenario_id
INNER JOIN Items ON Scenarios_Has_Items.item_id = Items.item_id
ORDER BY scenario_name;

-- Populate a dropdown for associating with a scenario
SELECT scenario_id, scenario_name from Scenarios;

-- Populate a dropdown for associating with an item
SELECT item_id, item_name from Items;

-- Create a new relationship between Scenarios and Items
INSERT INTO Scenarios_Has_Items (scenario_id, item_id, quantity)
VALUES (:scenario_id_from_dropdown, :item_id_from_dropdown, :quantity_input);

-- Delete a relationship using the id of the relationship selected on the Scenarios Has Items page
DELETE FROM Scenarios_Has_Items WHERE scenario_has_item_id = :scenario_has_item_id_selected;

-- Update a relationship's information
UPDATE Scenarios_Has_Items
SET scenario_id = :scenario_id_from_dropdown, item_id = :item_id_from_dropdown, quantity = :quantity_input
WHERE scenario_has_item_id = :scenario_has_item_id_selected;