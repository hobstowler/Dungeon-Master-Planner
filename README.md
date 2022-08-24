# The Dungeon Master's Planner App

View the app here: https://dungeon-master-planner.herokuapp.com/

![image](https://user-images.githubusercontent.com/91224707/186285878-ef46c6b9-b2b8-4e02-9fda-c0c6e678a1f3.png)

## Introduction

Anyone who has ever played a role playing game like Dungeons and Dragons (or even if you’ve just watched a couple of seasons of Stranger Things) knows that the amount of time and planning that a dungeon master puts into their campaigns is extraordinary. A good dungeon master who wants to set up a fun campaign for their players is therefore organized. You might have seen the binders full of dozens of monsters, dungeons, and all of the associated loot tables that the dungeon master has to keep track of for their campaigns, but what if they could have all of that at their fingertips instead with an interface that not only lets them keep track of, but also make adjustments to when they need to? A central database could be the answer to the dungeon master’s problems.

Instead of having a dozen sheets of monster stats, a single table could hold everything and display it all at once, conveniently grouped by their associated dungeons and loot tables and ready to pull up at a moment’s notice. No more shuffling. No more lost pages.

The Planner database will store data on these items and monsters available through the core rules, as well as the homebrew items, monsters, and dungeons that the dungeon masters create. Dungeon Masters will then be able to compile their chosen Items, Monsters, and Dungeons into individual Scenarios, which are linked to their profiles for easy access. Additionally, we will include several lookup tables for storing possible Biomes for Dungeons and Types for Items.

# C.R.U.D. App

At its heart, this is just a simple CRUD app pointed at a database that holds all of the dungeon master's scenarios.

## Create

Create new entries in the database with integrated forms. Fill in the details and click 'Add New' when you're done.

![image](https://user-images.githubusercontent.com/91224707/186285893-a914f8b7-8c21-4f8b-94ea-8eb5aa786016.png)


## Read

Read from the database by visiting each table's page. Some pages will have the option to see a detailed view of the intersection between two tables. Just click 'See Details' to check out the detailed view.

![image](https://user-images.githubusercontent.com/91224707/186286049-e8145f25-7e90-45b5-9b5e-a242facc976c.png)

## Update

Update existing entries in the database by clicking on the edit icon next to a row and submitting the changes through the integrated form.

![image](https://user-images.githubusercontent.com/91224707/186286141-48483e40-f8c6-4ad9-ae86-a86811b5f308.png)

## Delete

Delete anything by clicking the 'delete' icon next to any row and watch the change cascade through the database.
