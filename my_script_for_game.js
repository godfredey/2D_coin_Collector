
const my_player=document.getElementById("player");
const walls = document.querySelectorAll(".wall"); 
const gameContainer = document.getElementById("game-container");
const coins = document.querySelectorAll(".coin");

const timerDisplay = document.getElementById("timer");
let seconds = 0;


setInterval(function() {
    seconds++;
    timerDisplay.textContent = "Time: " + seconds;
}, 1000);

if (my_player){
    let x = 0;   
    let y = 0;
    const speed = 5;
    const playerSize = 30;

    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;

    document.addEventListener("keydown", function(event) {
        let newX = x;
        let newY = y;

        if (event.key === "ArrowUp") {
            newY -= speed;
        } else if (event.key === "ArrowDown") {
            newY += speed;
        } else if (event.key === "ArrowLeft") {
            newX -= speed;
        }   else if (event.key === "ArrowRight") {
            newX += speed;
        }

        newX = Math.max(0, Math.min(newX, gameWidth - playerSize));
        newY = Math.max(0, Math.min(newY, gameHeight - playerSize));

    if (!isColliding(newX, newY, playerSize, walls)) {
            x = newX;
            y = newY;
            my_player.style.left = x + "px";
            my_player.style.top = y + "px";
            checkCoinCollision();
        }
     });

    function isColliding(x, y, size, walls) {
    for (const wall of walls) {
        const wallX = wall.offsetLeft;
        const wallY = wall.offsetTop;
        const wallW = wall.offsetWidth;
        const wallH = wall.offsetHeight;

        
        if (
            x < wallX + wallW &&
            x + size > wallX &&
            y < wallY + wallH &&
            y + size > wallY 
           
        ) {
            return true; 
        }
    }
    return false;
   }
    
    
 function checkCoinCollision() {
        for (const coin of coins) {
            const coinX = coin.offsetLeft;
            const coinY = coin.offsetTop;
            const coinSize = coin.offsetWidth;

            const overlapping =
                x < coinX + coinSize &&
                x + playerSize > coinX &&
                y < coinY + coinSize &&
                y + playerSize > coinY;

        if (overlapping) {          
            respawnCoin(coin);
        }
    }
}


function respawnCoin(coin) {

    let validPosition = false;
    const coinSize = coin.offsetWidth;

   while (!validPosition) {
        newCoinX = Math.random() * (gameWidth - coinSize);
        newCoinY = Math.random() * (gameHeight - coinSize);

        
        if (!isColliding(newCoinX, newCoinY, coinSize, walls)) {
            validPosition = true;
        } 
    }

    coin.style.left = newCoinX + "px";
    coin.style.top = newCoinY + "px";
}

   

}

 