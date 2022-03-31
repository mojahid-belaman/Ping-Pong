import {userOne, userTwo, ball} from './Data';
import {detectCollosion} from './DetectCollision'

export function update(cWidth, cHeight) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //NOTE - When the ball collides with bottom and top wall we inverse the dy 
    if (ball.y + ball.radius > cHeight - 5 || ball.y - ball.radius < 0)
      ball.dy *= -1;

    //NOTE - We check if the ball hit the useOne or the userTwo paddle
    let user = (ball.x < cWidth / 2) ? userOne : userTwo;

    if (detectCollosion(ball, user)) {
      
      //NOTE - where the ball hit the player
      let collidePoint = (ball.y - (user.y + user.height / 2));
      
      //NOTE - Normalize the value of 'collidePoint', we need to get numbers between -1 and 1.
      //NOTE - (-use.height/2 < collidePoint < user.height/2)
      collidePoint = collidePoint / (user.height / 2);
     
      //NOTE - When the ball hits the top of a paddle we want the ball, to take a -45degrees angle
      //NOTE - When the ball hits the center of the paddle we want the ball to take a 0degrees angle
      //NOTE - When the ball hits the bottom of the paddle we want the ball to take a 45degrees angle
      //NOTE - Math.PI/4 = 45degrees
      let angleRad = (Math.PI / 4) * collidePoint;
     
      //NOTE - X direction of the ball when it's hit
      let direction = (ball.x < cWidth / 2) ? 1 : -1;
      
      //NOTE - Change the dx and dy direction
      ball.dx = direction * ball.speed * Math.cos(angleRad);
      ball.dy = ball.speed * Math.sign(angleRad);

      //NOTE - Speed up the ball everytime a paddle hit it
      ball.speed += 0.5;
    }

    //NOTE - Update the Score
    if (ball.x - ball.radius < 0) {
      userOne.score++;
      resetBall(cWidth, cHeight);
    }
    else if (ball.x + ball.radius > cWidth) {
      userTwo.score++;
      resetBall(cWidth, cHeight);
    }
}

//NOTE - When userOne or userTwo scores, we reset the ball
function resetBall(cWidth, cHeight) {
    ball.x = cWidth / 2;
    ball.y = cHeight / 2;
    ball.speed = 5;
    ball.dx = -ball.dx;
}