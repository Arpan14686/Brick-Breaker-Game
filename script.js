const game = document.getElementById("game");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");

let paddleX = 160;
let ballX = 200;
let ballY = 250;
let dx = 2;
let dy = -2;


let bricks = [];
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 7; c++) {
    let brick = document.createElement("div");
    brick.classList.add("brick");
    brick.style.left = (c * 55 + 10) + "px";
    brick.style.top = (r * 25 + 10) + "px";
    game.appendChild(brick);
    bricks.push(brick);
  }
}


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= 20;
  }
  if (e.key === "ArrowRight" && paddleX < 320) {
    paddleX += 20;
  }
  paddle.style.left = paddleX + "px";
});


function update() {
  ballX += dx;
  ballY += dy;

  
  if (ballX <= 0 || ballX >= 388) dx *= -1;
  if (ballY <= 0) dy *= -1;

 
  if (
    ballY >= 470 &&
    ballX >= paddleX &&
    ballX <= paddleX + 80
  ) {
    dy *= -1;
  }

  bricks.forEach((brick, index) => {
    if (!brick) return;

    let rect = brick.getBoundingClientRect();
    let ballRect = ball.getBoundingClientRect();

    if (
      ballRect.left < rect.right &&
      ballRect.right > rect.left &&
      ballRect.top < rect.bottom &&
      ballRect.bottom > rect.top
    ) {
      brick.remove();
      bricks[index] = null;
      dy *= -1;
    }
  });

 
  if (ballY > 500) {
    alert("Game Over");
    document.location.reload();
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  requestAnimationFrame(update);
}

update();