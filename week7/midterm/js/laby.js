document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // labyrinth layout as an array of arrays, 1 represent wall sections, 0 represent traversable halls
    var laby = [
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var cellSize;
    var pawnSize;

    // scale the labyrith canvas to screen size
    function resizeCanvas(){
        var maxWidth = window.innerWidth * 0.9;
        var maxHeight = window.innerHeight * 0.7;

        var columns = laby[0].length;   // number of colmuns in labyrinth structure
        var rows = laby.length;         // number of rows

        // determine the size of each cell based on screen size, max size of 50 px
        var cellWidth = Math.floor(maxWidth / columns); 
        var cellHeight = Math.floor(maxHeight / rows);

        cellSize = Math.min(cellWidth, cellHeight, 50); 

        pawnSize = cellSize * 0.6; // scale player pawn to fit inside a cell
            

        // recalculate the offset after resizing
        var rect = canvas.getBoundingClientRect();
        var offsetX = rect.left;
        var offsetY = rect.top;

        draw(currentX, currentY);
    }

    // adjusts everything if the canvas is resized
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // set start location to middle of cell [0, 1]
    var currentX = (1 + 0.5) * cellSize;
    var currentY = (0 + 0.5) * cellSize;
    var frameCount = 60;
    var timer;
    var points;
    var currentFrame;
    var offsetX, offsetY;

    // draws the maze filling in all 1s from the array with wall sections
    function drawLaby() {
        ctx.fillStyle = "#2c3e50";
        for (var row = 0; row < laby.length; row++) {
            for (var col = 0; col < laby[row].length; col++) {
                if (laby[row][col] === 1) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    function animate() {
        if (currentFrame >= point.length) {  // prevents animation from accessing invalid array indices
            return;
        }
        var point = points[currentFrame++];
        draw(point.x, point.y);

        // refire the timer until out-of-points
        if (currentFrame < points.length) {
            timer = setTimeout(animate, 1000 / 60);
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
        
        // cencel current animation when animation is interrupted with new click and starts new animation
        if (timer) {
            clearTimeout(timer);
        }
        
        points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
        currentFrame = 0;
        currentX = mouseX;
        currentY = mouseY;
        animate();
    }

    canvas.addEventListener('mousedown', handleMouseDown);

    // draw the player pawn at set starting location
    draw(currentX, currentY);
});