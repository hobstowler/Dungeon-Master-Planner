-- -----------------------------------------------------
-- Queries for Dungeon Masters page
-- -----------------------------------------------------

-- Retrieve metadata for Dungeon Masters table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Dungeon_Masters';

-- Retrieve dungeon masters to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT dungeon_master_id AS "Dungeon Master ID", dungeon_master_name AS "Dungeon Master Name", lucky_dice AS "Lucky Dice" 
FROM Dungeon_Masters
WHERE dungeon_master_name LIKE '%$:nameQuery%';

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

-- Retrieve metadata for Scenarios table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Scenarios';

-- Retrieve scenarios to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT scenario_id AS "Scenario ID", scenario_name AS "Scenario Name", summary AS "Summary", target_level AS "Target Level", 
session_time AS "Session Time", Dungeon_Masters.dungeon_master_name AS "Dungeon Master", Dungeons.dungeon_name AS "Dungeon"
FROM Scenarios
INNER JOIN Dungeon_Masters on Dungeon_Masters.dungeon_master_id = Scenarios.dungeon_master_id
LEFT JOIN Dungeons ON Dungeons.dungeon_id = Scenarios.dungeon_id
WHERE scenario_name LIKE '%:nameQuery%';

-- Create a new scenario
INSERT INTO Scenarios (scenario_name, summary, target_level, session_time, 
dungeon_master_id, dungeon_id)
VALUES (:scenario_name_input, :summary_input, :target_level_input, 
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

-- Retrieve metadata for Dungeons table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Dungeons'

-- Retrieve dungeons to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT dungeon_id AS "Dungeon ID", dungeon_name AS "Dungeon Name", Dungeons.description AS "Description", light_level AS "Light Level", Biomes.biome_name AS "Biome"
FROM Dungeons
LEFT JOIN Biomes on Biomes.biome_id = Dungeons.biome_id
WHERE dungeon_name LIKE '%:nameQuery%';

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

-- Retrieve metadata for Monsters table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Monsters';

-- Retrieve monsters to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT monster_id AS "Monster ID", monster_name AS "Monster Name", description AS "Description", challenge_rating AS "Challenge Rating", 
health_points AS "Health Points", strength AS "Strength", dexterity AS "Dexterity", constitution AS "Constitution", 
intelligence AS "Intelligence", wisdom AS "Wisdom", charisma AS "Charisma", armor_class AS "Armor Class", talent AS "Talent(s)"
FROM Monsters
WHERE monster_name LIKE '%:nameQuery%';

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

-- Retrieve metadata for Items table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Items';

-- Retrieve items to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT item_id AS "Item ID", item_name AS "Item Name", Items.description AS "Description", weight AS "Weight", value AS "Value (in copper)", Types.type_name AS "Type"
FROM Items
LEFT JOIN Types ON Items.type_id = Types.type_id
WHERE item_name LIKE '%:nameQuery%'

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

-- Retrieve metadata for Biomes table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Biomes';

-- Retrieve biomes to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT biome_id AS "Biome ID", biome_name AS "Biome Name", description AS "Description"
FROM Biomes
WHERE biome_name LIKE '%:nameQuery%';

-- Create a new biome
INSERT INTO Biomes (biome_name, description)
VALUES (:biome_name_input, :description_input);

-- Delete a biome using the id of the biome selected on the Biomes page (only allowed when no FK references exist)
DELETE FROM Biomes WHERE biome_id = :biome_id_selected;

-- Update a biome's information
UPDATE Biomes
SET biome_name = :biome_name_input, description = :description_input
WHERE biome_id = :biome_id_selected;

-- -----------------------------------------------------
-- Queries for Types page
-- -----------------------------------------------------

-- Retrieve metadata for Types table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Types';

-- Retrieve types to display based on an optional search term (WHERE is only included if a value is provided for nameQuery)
SELECT type_id AS "Type ID", type_name AS "Type Name", description AS "Description"
FROM Types
WHERE type_name LIKE '%:nameQuery%';

-- Create a new type
INSERT INTO Types (type_name, description)
VALUES (:type_name_input, :description_input);

-- Delete a type using the id of the type selected on the Types page (only allowed when no FK reference exists)
DELETE FROM Types WHERE type_id= :type_id

-- Update a type's information
UPDATE Types
SET type_name = :type_name_input, description = :description_input
WHERE type_id = :type_id_selected;

-- -----------------------------------------------------
-- Queries for Dungeons_Has_Monsters page
-- -----------------------------------------------------

-- Retrieve metadata for Types table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Dungeons_Has_Monsters';

-- View intersection table of all monsters associated with dungeons
SELECT dungeon_has_monster_id, dungeon_name, monster_name, quantity
FROM Dungeons_Has_Monsters
INNER JOIN Dungeons ON Dungeons_Has_Monsters.dungeon_id = Dungeons.dungeon_id
INNER JOIN Monsters ON Dungeons_Has_Monsters.monster_id = Monsters.monster_id
ORDER BY dungeon_name;

-- View all monsters in a particular dungeon
SELECT dungeon_has_monster_id, Monsters.monster_id, Monsters.monster_name, Monsters.description, Dungeons_Has_Monsters.quantity 
FROM Dungeons_Has_Monsters 
INNER JOIN Monsters ON Dungeons_Has_Monsters.monster_id = Monsters.monster_id
WHERE Dungeons_Has_Monsters.dungeon_id = :id_of_selected_dungeon;

-- View all dungeons that host a particular monster
SELECT dungeon_has_monster_id, Dungeons.dungeon_id, Dungeons.dungeon_name, Dungeons.description, Dungeons_Has_Monsters.quantity 
FROM Dungeons_Has_Monsters 
INNER JOIN Dungeons ON Dungeons_Has_Monsters.dungeon_id = Dungeons.dungeon_id
WHERE Dungeons_Has_Monsters.monster_id = :id_of_selected_monster;

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

-- Retrieve metadata for Scenarios_Has_Items table
SELECT * FROM `Information_Schema`.`columns` WHERE table_name='Dungeons_Has_Monsters';

-- View intersection table of all items associated with scenarios
SELECT scenario_has_item_id, scenario_name, item_name, quantity
FROM Scenarios_Has_Items
INNER JOIN Scenarios ON Scenarios_Has_Items.scenario_id = Scenarios.scenario_id
INNER JOIN Items ON Scenarios_Has_Items.item_id = Items.item_id
ORDER BY scenario_name;

-- View all items in a particular scenario
SELECT scenario_has_item_id, Items.item_id, item_name, Items.description, quantity 
FROM Scenarios_Has_Items 
INNER JOIN Items ON Scenarios_Has_Items.item_id = Items.item_id
WHERE Scenarios_Has_Items.scenario_id = :id_of_selected_scenario;

-- View all scenarios that host a particular item
SELECT scenario_has_item_id, Scenarios.scenario_id, scenario_name, Scenarios.summary, quantity 
FROM Scenarios_Has_Items
INNER JOIN Scenarios ON Scenarios_Has_Items.scenario_id = Scenarios.scenario_id
WHERE Scenarios_Has_Items.item_id = :id_of_selected_item;

-- Create a new relationship between Scenarios and Items
INSERT INTO Scenarios_Has_Items (scenario_id, item_id, quantity)
VALUES (:scenario_id_from_dropdown, :item_id_from_dropdown, :quantity_input);

-- Delete a relationship using the id of the relationship selected on the Scenarios Has Items page
DELETE FROM Scenarios_Has_Items WHERE scenario_has_item_id = :scenario_has_item_id_selected;

-- Update a relationship's information
UPDATE Scenarios_Has_Items
SET scenario_id = :scenario_id_from_dropdown, item_id = :item_id_from_dropdown, quantity = :quantity_input
WHERE scenario_has_item_id = :scenario_has_item_id_selected;


-- -----------------------------------------------------
-- Populate Dropdown Menus
-- -----------------------------------------------------

-- Retrieves metadata on foreign key usage for the table_name and column_name being referenced
SELECT * FROM Information_Schema.key_column_usage WHERE table_name= :table_with_fk and column_name= :column_with_fk;

-- Retrieves [fk_table]_id and [fk_table]_name from selected Table
SELECT :[fk_table]_id, :[fk_table]_name FROM :fk_table;