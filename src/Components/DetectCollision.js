  //NOTE - Detect Collision Between padelle and Ball
export function detectCollosion(ball, player) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    //NOTE - if all of this are true means there is a collision 
    return (ball.right > player.left && ball.top < player.bottom &&
            ball.left < player.right && ball.bottom > player.top);
  }