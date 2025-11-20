document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("labyCanvas");
    var ctx = canvas.getContext("2d");
    var retryButton = document.getElementById("retry");
    var defeatImage = document.getElementById("defeat");

    // labyrinth layout as an array of arrays, 1 represent wall sections, 0 represent traversable halls
    var laby = [
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 2, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 3, 1]
    ];

    var cellSize;
    var pawnSize;
    var currentX, currentY;
    var frameCount = 60;
    var timer;
    var points;
    var currentFrame;
    var offsetX, offsetY;
    var minoCaught = false;

    // counts how many times pawn has moved
    var clickCount = 0;
    var pendingMove = false;
    var moveStartX, moveStartY;

    function updateClickCounter() {
        document.getElementById("clickTracker").textContent = "Click Counter: " + clickCount;
        if (typeof updateClicks === 'function' && currentPlayer) {
            updateClicks(clickCount);
        }
    }
    updateClickCounter(); 

    // checks if the minotaur catches the player then displays defeat screen
    function minoCheck() {
        if (clickCount < 15){
            return;
        }
        else{
            minoCaught = true;
            canvas.style.display = 'none';
            retryButton.style.display = 'block';
            defeatImage.style.display = "unset";
        }
    }

    // scale the labyrith canvas to screen size
    function resizeCanvas(){
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.7;

        var columns = laby[0].length;   // number of colmuns in labyrinth structure
        var rows = laby.length;         // number of rows

        // determine the size of each cell based on screen size, max size of 50 px
        var cellWidth = Math.floor(canvas.width / columns); 
        var cellHeight = Math.floor(canvas.height / rows);

        cellSize = Math.min(cellWidth, cellHeight, 100); 

        canvas.width = columns * cellSize;
        canvas.height = rows * cellSize;
        pawnSize = cellSize * 0.6; // scale player pawn to fit inside a cell
            
        // set start location to middle of cell [0, 1]
        currentX = (1 + 0.5) * cellSize;
        currentY = (0 + 0.5) * cellSize;

        // recalculate the offset after resizing
        var rect = canvas.getBoundingClientRect();
        offsetX = rect.left;
        offsetY = rect.top;

        draw(currentX, currentY);
    }

    // adjusts everything if the canvas is resized
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // draws the labyrinth filling in all 1s from the array with wall sections
    function drawLaby() {
        for (var row = 0; row < laby.length; row++) {
            for (var col = 0; col < laby[row].length; col++) {
                if (laby[row][col] === 1) {
                    ctx.fillStyle = "#444A50FF";
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
                else if (laby[row][col] === 2) {
                    ctx.fillStyle = "#553317FF";
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
                else if (laby[row][col] === 3) {
                    ctx.fillStyle = "#5C5710FF";
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    // converts pixel to coordinates to position on the grid and checks if that cell is a wall
    function wallCheck(x, y) {
        var col = Math.floor(x / cellSize);
        var row = Math.floor(y / cellSize);

        // if click is outside the maze, treat it as a wall, prevents movement
        if (row < 0 || row >= laby.length || col < 0 || col >= laby[0].length) {
            return true;
        }
        // returns true if section is 1 aka wall
        return laby[row][col] === 1;
    }

    // same as wallCheck but for door cells
    function doorCheck(x, y) {
        var col = Math.floor(x / cellSize);
        var row = Math.floor(y / cellSize);

        if (row < 0 || row >= laby.length || col < 0 || col >= laby[0].length) {
            return true;
        }
        // returns true if section is 2 aka door
        return laby[row][col] === 2;
    }

    // check if collision is final door aka 3
    function escapeCheck(x, y) {
        var col = Math.floor(x / cellSize);
        var row = Math.floor(y / cellSize);

        if (row === 6 && col === 8) {
            if (typeof markEscaped == 'function') {
                markEscaped();
                alert('Congratulations! You escaped in ' + clickCount + ' clicks!');
                canvas.style.display = 'none';
                retryButton.style.display = 'block';
            }
            return true;
        }
        return false;
    }

    // when collision with door cell, door opens and changes to floor cell
    function openDoor(x, y) {
        var col = Math.floor(x / cellSize);
        var row = Math.floor(y / cellSize);
        laby[row][col] = 0;
    }

    // determines if the pawn collides with a wall or door and returns the point of collision if true and what it collided with
    function collisionCheck(x, y) {
        var halfSize = pawnSize / 2;

        var corners = [
            {x: x - halfSize, y: y - halfSize},
            {x: x + halfSize, y: y - halfSize},
            {x: x - halfSize, y: y + halfSize},
            {x: x + halfSize, y: y + halfSize}
        ]
        // check each corner if it's touching a wall portion of the labyrinth
        for (var i = 0; i < corners.length; i++) {
            if (wallCheck(corners[i].x, corners[i].y)) {
                return {collision: true, isDoor: false, x: corners[i].x, y: corners[i].y};
            }
            if (doorCheck(corners[i].x, corners[i].y)) {
                return {collision: true, isDoor: true, x: corners[i].x, y: corners[i].y}
            }
        }
        return {collision: false};
    }

    function animate() {
        // prevents animation from accessing invalid array indices
        if (currentFrame >= points.length) {  
            return;
        }
        var point = points[currentFrame++];

        // check for collision before moving
        var collision = collisionCheck(point.x, point.y);

        if (collision.collision) { 
            // if a collision is detected, stop the animation
            timer = null;
            escapeCheck(currentX, currentY);
            // draws pawn at the last valid position before collision
            if (currentFrame > 1) {  
                var lastValidPoint = points[currentFrame - 2];
                currentX = lastValidPoint.x;
                currentY = lastValidPoint.y;
                draw(currentX, currentY);
            }
            // updates click counter if pawn actually moved
            if (pendingMove && (currentX !== moveStartX || currentY !== moveStartY)) {
                clickCount++;
                updateClickCounter();
                minoCheck();
            }
            pendingMove = false;

            // if it was a door that stopped the movement, open and redraw map with no door in that spot
            if (collision.isDoor) {
                openDoor(collision.x, collision.y);
                draw(currentX, currentY);
                }
            return;
        }

        draw(point.x, point.y);

        // refire the timer until out-of-points
        if (currentFrame < points.length) {
            timer = setTimeout(animate, 1000 / 60);
        }
        //animation is completed and update current position and clear timer
        else {  
            currentX = point.x;
            currentY = point.y;
            timer = null;
        
            // updates click counter if pawn actually moved
            if (pendingMove && (currentX !== moveStartX || currentY !== moveStartY)) {
                clickCount++;
                updateClickCounter();
                minoCheck();
            }
            // minotaur snatches your defeat from the jaws of victory
            if (!minoCaught){
            escapeCheck(currentX, currentY);
            }
        }
    }

    function linePoints(x1, y1, x2, y2, frames) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var incrementX = dx / frames;
        var incrementY = dy / frames;
        var a = [];

        for (var frame = 0; frame <= frames; frame++) {
            a.push({
                x: x1 + (incrementX * frame),
                y: y1 + (incrementY * frame)
            });
        }
        return a;
    }

    function draw(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the labyrinth
        drawLaby();
        //draw the player pawn
        ctx.beginPath();
        ctx.fillStyle = "skyblue";
        ctx.strokeStyle = "gray";
        // draw the rectange around it's center rather than from it's corner
        var halfSize = pawnSize / 2;
        ctx.rect(x - halfSize, y - halfSize, pawnSize, pawnSize);
        ctx.fill();
        ctx.stroke();
    }

    function handleMouseDown(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
         // current coordinates are same as starting coordinates, return else up counter and refresh text
        
        // cancel current animation when animation is interrupted with new click and starts new animation from where the pawn is when click occurs
        if (timer) {
            clearTimeout(timer);
            if (points && currentFrame > 0 && currentFrame < points.length) {
                var lastPoint = points[currentFrame - 1];
                currentX = lastPoint.x;
                currentY = lastPoint.y;
            }

            // updates click counter when pawn changes movement in the middle of another movement.
            if (pendingMove && (currentX !== moveStartX || currentY !== moveStartY)) {
                clickCount++;
                minoCheck();
                updateClickCounter();
            }
        }
        
        moveStartX = currentX;
        moveStartY = currentY;
        pendingMove = true;

        points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
        currentFrame = 0;
        animate();

        // end game with defeat screen if minoCaught is true
        minoCheck()
        
    }

    canvas.addEventListener('mousedown', handleMouseDown);
});