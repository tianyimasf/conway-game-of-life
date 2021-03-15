# Conway-s-Game-of-Life
How to play this game?
Click on the grids to select the initial set of living cells. Click "start" to start the simulation. Click "Help" to see game rules and a set of example fun combinations.

What does this web program do?
The first half is setting up canvas, button, grids and let the user select seeds to start the game. The second half is actually coding up the game rule so that those seeds evolves on your screen. At last there are some misc jobs such as add some pause/restart functionalities, make de-selecting a grid possible, and add help and demo button and demo video.

What have I learned through this project?
- HTML/Javascript canvas: set colors, draw lines and rectangles
- Handling events: clicking on some area of the screen
- Handling button clicking and setting up page refreshing
- How to create and manipulate Javascript arrays and objects (associative arrays)
- Soft design tip\*\*\*: never modify an array when you are using it in a loop

What are the main functions of this program?
- chooseSeeds(x, y) initializes the game by selecting a set of cells
- erasePrevStep() erases the living cells (see first question for what's a living cell) from the previous step
- nextGameStep() calculates the next set of living cells based on the current set of living cells based on the game rules.
- drawNextStep() draws the next set of living cells.
- nextGameStep() function is the hardest to tackle since it needs to manipulate data in two associative arrays.

Is this program perfect?
No. Please give feedback whenever there is a bug, or anything.