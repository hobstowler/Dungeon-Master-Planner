SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Dungeon_Masters, Biomes, Dungeons, Dungeons_has_Monsters, Items, Monsters, Scenarios, Scenarios_has_Items, Types;

-- -----------------------------------------------------
-- Table Dungeon_Masters
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Dungeon_Masters (
  dungeon_master_id INT NOT NULL AUTO_INCREMENT,
  dungeon_master_name varchar(45) NOT NULL,
  lucky_dice varchar(45) NULL,
  PRIMARY KEY (dungeon_master_id),
  UNIQUE INDEX dungeon_master_id_UNIQUE (dungeon_master_id ASC) VISIBLE
);


-- -----------------------------------------------------
-- Table Biomes
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Biomes (
  biome_id INT NOT NULL AUTO_INCREMENT,
  biome_name varchar(45) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (biome_id),
  UNIQUE INDEX biome_id_UNIQUE (biome_id ASC) VISIBLE
);


-- -----------------------------------------------------
-- Table Dungeons
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Dungeons (
  dungeon_id INT NOT NULL AUTO_INCREMENT,
  dungeon_name varchar(45) NOT NULL,
  description TEXT NULL,
  light_level INT NOT NULL,
  biome_id INT NOT NULL DEFAULT 1,
  PRIMARY KEY (dungeon_id),
  UNIQUE INDEX dungeon_id_UNIQUE (dungeon_id ASC) VISIBLE,
  INDEX fk_Dungeons_Biomes1_idx (biome_id ASC) VISIBLE,
  CONSTRAINT fk_Dungeons_Biomes1
    FOREIGN KEY (biome_id)
    REFERENCES Biomes (biome_id)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table Scenarios
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Scenarios (
  scenario_id INT NOT NULL AUTO_INCREMENT,
  scenario_name varchar(45) NOT NULL,
  summary TEXT NULL,
  target_level INT NOT NULL,
  session_time DATE NULL,
  dungeon_master_id INT NOT NULL,
  dungeon_id INT NULL DEFAULT 1,
  PRIMARY KEY (scenario_id),
  UNIQUE INDEX scenario_id_UNIQUE (scenario_id ASC) VISIBLE,
  INDEX fk_Scenarios_Dungeon_Masters1_idx (dungeon_master_id ASC) VISIBLE,
  INDEX fk_Scenarios_Dungeons1_idx (dungeon_id ASC) VISIBLE,
  CONSTRAINT fk_Scenarios_Dungeon_Masters1
    FOREIGN KEY (dungeon_master_id)
    REFERENCES Dungeon_Masters (dungeon_master_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Scenarios_Dungeons1
    FOREIGN KEY (dungeon_id)
    REFERENCES Dungeons (dungeon_id)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table Monsters
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Monsters (
  monster_id INT NOT NULL AUTO_INCREMENT,
  monster_name varchar(45) NOT NULL,
  description TEXT NULL,
  challenge_rating INT NOT NULL,
  health_points INT NOT NULL,
  strength INT NOT NULL,
  dexterity INT NOT NULL,
  constitution INT NOT NULL,
  intelligence INT NOT NULL,
  wisdom INT NOT NULL,
  charisma INT NOT NULL,
  armor_class INT NOT NULL,
  talent varchar(256) NULL,
  PRIMARY KEY (monster_id),
  UNIQUE INDEX monster_id_UNIQUE (monster_id ASC) VISIBLE
);


-- -----------------------------------------------------
-- Table Types
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Types (
  type_id INT NOT NULL AUTO_INCREMENT,
  type_name varchar(45) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (type_id),
  UNIQUE INDEX type_id_UNIQUE (type_id ASC) VISIBLE
);


-- -----------------------------------------------------
-- Table Items
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Items (
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name varchar(45) NOT NULL,
  description TEXT NULL,
  weight DECIMAL(6,2) NOT NULL,
  value INT NOT NULL,
  type_id INT NOT NULL,
  PRIMARY KEY (item_id),
  UNIQUE INDEX item_id_UNIQUE (item_id ASC) VISIBLE,
  INDEX fk_Items_Types1_idx (type_id ASC) VISIBLE,
  CONSTRAINT fk_Items_Types1
    FOREIGN KEY (type_id)
    REFERENCES Types (type_id)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table Scenarios_has_Items
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Scenarios_Has_Items (
  scenario_has_item_id INT NOT NULL AUTO_INCREMENT,
  scenario_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  PRIMARY KEY (scenario_has_item_id),
  INDEX fk_Scenarios_Has_Items_Items1_idx (item_id ASC) VISIBLE,
  INDEX fk_Scenarios_Has_Items_Scenarios_idx (scenario_id ASC) VISIBLE,
  UNIQUE INDEX scenario_has_item_id_UNIQUE (scenario_has_item_id ASC) VISIBLE,
  CONSTRAINT fk_Scenarios_Has_Items_Scenarios
    FOREIGN KEY (scenario_id)
    REFERENCES Scenarios (scenario_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Scenarios_Has_Items_Items1
    FOREIGN KEY (item_id)
    REFERENCES Items (item_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table Dungeons_has_Monsters
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Dungeons_Has_Monsters (
  dungeon_has_monster_id INT NOT NULL AUTO_INCREMENT,
  dungeon_id INT NOT NULL,
  monster_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  PRIMARY KEY (dungeon_has_monster_id),
  INDEX fk_Dungeons_Has_Monsters_Monsters1_idx (monster_id ASC) VISIBLE,
  INDEX fk_Dungeons_Has_Monsters_Dungeons1_idx (dungeon_id ASC) VISIBLE,
  UNIQUE INDEX dungeon_has_monster_id_UNIQUE (dungeon_has_monsters_id ASC) VISIBLE,
  CONSTRAINT fk_Dungeons_Has_Monsters_Dungeons1
    FOREIGN KEY (dungeon_id)
    REFERENCES Dungeons (dungeon_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Dungeons_Has_Monsters_Monsters1
    FOREIGN KEY (monster_id)
    REFERENCES Monsters (monster_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


INSERT INTO Dungeon_Masters (dungeon_master_name, lucky_dice)
VALUES ('Damian Russ', 'sparkly purple d20'),
       ('Hobs Towler', 'some tiny dice inside of the dice'),
       ('Mysterious Stranger','they like rolling their eyes');

INSERT INTO Types (type_name, description)
VALUES ('weapon', 'Swords, shields, bows, arrows, etc. Things that hurt.'),
       ('scroll', 'Magic spell on a piece of paper. Very useful, if you can read.'),
       ('potion', 'Drink it and something happens. Might even be something good!'),
       ('armor', 'Get hurt slightly less. Better armor = less hurt.');

INSERT INTO Biomes (biome_name, description)
VALUES ('no biome', 'You have not chosen a biome.'),
       ('cave', 'Dark and gloomy; mostly rock and bat guano. Slightly damp. All good adventurers will explore one at least once.'),
       ('town', 'People live here. Good for resting and stocking up on goods, but maybe not the smartest place for a fight.'),
       ('field', 'Big and open. Lots of grass. Plenty of room for a fight, but not many places to take cover.'),
       ('city', 'Lots of people. Too many people. Has everything you could ever want. Really bad place for a fight, unless you''re a fan of collateral damage.');

INSERT INTO Monsters (monster_name, description, challenge_rating, health_points, strength, dexterity, constitution, intelligence, wisdom, charisma, armor_class, talent)
VALUES ('Giant Spider', 'Big. Lots of legs. Eight, to be exact.',
            1, 16, 11, 17, 12, 0, 10, 2, 14, 'Poison'),
       ('Bugbear', 'Not a bug, but maybe a bear. Furry, floppy ears, big eyes, and lots of teeth.',
            2, 16, 16, 13, 13, 10, 10, 9, 17, 'Stalker'),
       ('Darkmantle', 'Gross octopus thing that clings to cave ceilings and drops on unsuspecting adventurers.',
            1, 15, 11, 15, 14, 2, 11, 10, 15, NULL),
       ('Tarrasque', 'Basically Godzilla. Technically survivable, but wouldn''t it be easier to just give up?',
            25, 525, 41, 16, 34, 3, 15, 14, 40, 'Carapace, Powerful Leaper, Regeneration, Rush, Spines'),
       ('Gold Dragon, Great Wyrm', 'A golden dragon, and the goody two-shoes of dragonkind.',
            23, 465, 43, 6, 29, 26, 27, 26, 40, 'Change Shape, Detect Gems, Divine Aid, Fast Flight, Fire Aura, Luck, Weakening Breath'),
       ('Solar Angel', 'Metallic skin and three pairs of wings. Literally an amalgamation of Good. It takes a lot of dedication to get attacked by one, so congratulations.',
            23, 363, 28, 20, 30, 23, 27, 25, 44, 'Slaying Arrow, Spellcasting');

INSERT INTO Items (item_name, description, weight, value, type_id)
VALUES ('Scimitar', 'A one-handed curved sword that deals slashing damage.', 4, 1500, (select type_id from Types where type_name = 'weapon')),
       ('Longbow', 'Requires two hands and arrows.', 3, 7500, (select type_id from Types where type_name = 'weapon')),
       ('Scroll of Enlarge Person', 'Can make one of you really, really, big.', 0.1, 2500, (select type_id from Types where type_name = 'scroll')),
       ('Potion of Fly', 'Drink to forget gravity for a bit. Try to remember before the potion wears off.', 0.1, 75000, (select type_id from Types where type_name = 'potion')),
       ('Full Plate', 'Lets adventures live out their dreams of becoming a walking tin can.', 50, 150000, (select type_id from Types where type_name = 'armor'));

INSERT INTO Dungeons (dungeon_name, description, light_level, biome_id)
VALUES ('OH NO', 'You haven''t chosen or created a dungeon for this scenario yet!', -1,
            (select biome_id from Biomes where biome_name = 'no biome')),
       ('Cavesploration', 'A generic cave with few monsters, safe for new players.', 0,
            (select biome_id from Biomes where biome_name = 'cave')),
       ('Armageddon', 'A big, open field with nowhere to hide. Good for a final scenario, when you''re sick of your players and ready to start a new campaign.', 2,
            (select biome_id from Biomes where biome_name = 'field')),
       ('Metropopocalypse', 'Villains (that''s you!) attack a metropolis with some excellent security. For a scenario for an experienced party with no morals.', 2,
            (select biome_id from Biomes where biome_name = 'city')),
       ('Hit the Town', 'Allows for players to go shopping! Also features a mysterious figure.', 1,
            (select biome_id from Biomes where biome_name = 'town'));

INSERT INTO Scenarios (scenario_name, summary, target_level, session_time, dungeon_master_id, dungeon_id)
VALUES ('First Adventure', 'The party meets in a tavern, is approached by a mysterious cloaked stranger, and is asked to retrieve an artifact hidden in a nearby cave.', 1, '2022-07-23',
            (select dungeon_master_id from Dungeon_Masters where dungeon_master_name = 'Damian Russ'),
            (select dungeon_id from Dungeons where dungeon_name = 'Cavesploration')),
       ('Bad Things Happen', 'The party angers an Elder God and is forced to fight its minions.', 20, '2022-07-24',
            (select dungeon_master_id from Dungeon_Masters where dungeon_master_name = 'Hobs Towler'),
            (select dungeon_id from Dungeons where dungeon_name = 'Armageddon')),
       ('Second Adventure', 'The party delivers the artifact to the cloaked stranger, only to discover that they are the Big Bad! The party must track them down and recover the artifact before they use it to destroy the whole town!', 2, NULL,
            (select dungeon_master_id from Dungeon_Masters where dungeon_master_name = 'Damian Russ'),
            (select dungeon_id from Dungeons where dungeon_name = 'Hit the Town')),
       ('Bad Things Happen (But Not To Us)', 'The party befriends an Elder God and tries to conquer the world!', 20, '2022-07-24',
            (select dungeon_master_id from Dungeon_Masters where dungeon_master_name = 'Mysterious Stranger'),
            (select dungeon_id from Dungeons where dungeon_name = 'Metropopocalypse')),
       ('Strange Happenings', 'There''s a new cult in town, and the adventures must get to the bottom of their wicked plot!', 1, NULL,
            (select dungeon_master_id from Dungeon_Masters where dungeon_master_name = 'Hobs Towler'),
            (select dungeon_id from Dungeons where dungeon_name = 'Hit the Town'));

INSERT INTO Dungeons_Has_Monsters (dungeon_id, monster_id, quantity)
VALUES ((select dungeon_id from Dungeons where dungeon_name = 'Cavesploration'),
            (select monster_id from Monsters where monster_name='Giant Spider'), 1),
       ((select dungeon_id from Dungeons where dungeon_name = 'Cavesploration'),
            (select monster_id from Monsters where monster_name='Darkmantle'), 2),
       ((select dungeon_id from Dungeons where dungeon_name = 'Armageddon'),
            (select monster_id from Monsters where monster_name='Tarrasque'), 1),
       ((select dungeon_id from Dungeons where dungeon_name = 'Metropopocalypse'),
            (select monster_id from Monsters where monster_name='Gold Dragon, Great Wyrm'), 1),
       ((select dungeon_id from Dungeons where dungeon_name = 'Metropopocalypse'),
            (select monster_id from Monsters where monster_name='Solar Angel'), 1),
       ((select dungeon_id from Dungeons where dungeon_name = 'Hit the Town'),
            (select monster_id from Monsters where monster_name='Bugbear'), 1);

INSERT INTO Scenarios_Has_Items (scenario_id, item_id, quantity)
VALUES ((select scenario_id from Scenarios where scenario_name = 'First Adventure'), (select item_id from Items where item_name = 'Scimitar'), 1),
       ((select scenario_id from Scenarios where scenario_name = 'First Adventure'), (select item_id from Items where item_name = 'Longbow'), 1),
       ((select scenario_id from Scenarios where scenario_name = 'Bad Things Happen'), (select item_id from Items where item_name = 'Scroll of Enlarge Person'), 8),
       ((select scenario_id from Scenarios where scenario_name = 'Bad Things Happen'), (select item_id from Items where item_name = 'Potion of Fly'), 1),
       ((select scenario_id from Scenarios where scenario_name = 'Second Adventure'), (select item_id from Items where item_name = 'Scroll of Enlarge Person'), 2),
       ((select scenario_id from Scenarios where scenario_name = 'Bad Things Happen (But Not To Us)'), (select item_id from Items where item_name = 'Scroll of Enlarge Person'), 2),
       ((select scenario_id from Scenarios where scenario_name = 'Bad Things Happen (But Not To Us)'), (select item_id from Items where item_name = 'Potion of Fly'), 3),
       ((select scenario_id from Scenarios where scenario_name = 'Strange Happenings'), (select item_id from Items where item_name = 'Scimitar'), 1),
       ((select scenario_id from Scenarios where scenario_name = 'Strange Happenings'), (select item_id from Items where item_name = 'Scroll of Enlarge Person'), 2);

SET FOREIGN_KEY_CHECKS = 1