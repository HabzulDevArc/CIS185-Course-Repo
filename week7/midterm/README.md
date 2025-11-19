# Project Name: Labyrinth(not the David Bowie one)
## CIS 185 - Midterm Project
## Author: William Allen
## Date: Uhhhh 11/20/25 probably

---

## 1. Project Description
This is a browser game inspired by the ancient greek myth of the Minotaur. The player submits their name, selects a pawn, and attempt to escape the bovine beast's deadly lair. Players are recorded and listed on a scoreboard for all to see who was able to escape and who became cowfeed.

## 2. Target Audience
My professor is the main target audience but otherwise, perhaps children looking for a diverting game or anyone bored enough or looking to distract themselves from more important endeavors. 

## 3. Main Features
- Feature 1: interactive Canvas game
- Updating Scoreboard to compare your efforts with past attempts (currently only based off information stored in browsers Local Storage but could be saved and retrieved from a server in the future)

## 4. Technologies Used
- HTML5 (semantic structure, Canvas element) - CSS3 (styling) -JavaScript (form validation, Canvas manipulation, creating, manipulating, saving and reading JSON objects) 

## 5. File Structure
- index.html (main site and game) - scoreboard.html (displays the scoreboard) - css/styles (main stylesheet) - js/laby.js (JavaScript fuctionality for the labyCanvas element) - js/scoreboard.js (JavaScript functionality for storing player info and generating the content for scoreboard.html)

## 6. Challenges Faced 
- Retrofitting the JavaScript code from https://jsfiddle.net/m1erickson/GHSG4/ to move a rectangle around a Canvas element to my purposes of moving an object that would stop moving when coliding with other visual elements was difficult as I had to figure out what changes to make to their design. I solved this by measuring the location for the corners of the rectangle with each movement along it's path and checking their position against where that would be in respect to the laybrinth layout that is used to generate the visual components (the array of arrays that map the walls, doors and floors) relating the pixel location on the canvas to the array location and checking if it overlaps with a collideable area, then offsetting where rectangle landed by 2 frames to display it up against the collideable object instead of overlapping it. 

## 7. AI Tools Used
- claude.ai: troubleshooting and assistance in implementation of JavaScript functionality 

## 8. Future Improvements
- randomized Labyrinth layout option so no two playthroughs are the same(with accompanying seperate scoreboard)
- fog of war feature to make it so what's around corners/behind doors is not visibile based on pawn location within the Labyrinth
- sound effects for movement, collision with walls/doors/chests, clickcounter based events, victory/defeat sound

## 9. Credits
- Initial method for moving objects in Canvas with JavaScript from: https://jsfiddle.net/m1erickson/GHSG4/ 
- AI assistance from claude.ai
- hurloon.jpg from Wizards of the Coast by Anson Maddocks