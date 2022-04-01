import {userOne, userTwo, trace, ball} from './Data';


export function Game(context, cWidth, cHeight, isCheck) {
    drawRect(0, 0, cWidth, cHeight, '#000', context);
    drawBorder(0, 0, cWidth, 0, '#d50000', context);
    drawBorder(0, cHeight, cWidth, cHeight, '#d50000', context); 
    drawTextOne(userOne.score, cWidth / 4, cHeight / 5, '#FFF', context);
    drawTextTwo(userTwo.score, 3*cWidth / 4, cHeight / 5, '#FFF', context);
    if (!isCheck)
        drawTextGame("START GAME", cWidth/6, 3*cHeight/5, '#64dd17', context);
    drawSeparator(trace.x, trace.y, trace.width, trace.height, '#00c853', context, cHeight);
    drawRect(userOne.x, userOne.y, userOne.width, userOne.height, '#FFF', context);
    drawRect(userTwo.x, userTwo.y, userTwo.width, userTwo.height, '#FFF', context);
    DrawCircle(ball.x, ball.y, ball.radius, '#ffff00', context);
}

function drawRect(x, y, w, h, color, context) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  }

  function DrawCircle(x, y, r, color, context) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  function drawTextOne(text, x, y, color, context) {
    context.fillStyle = color;
    context.font = "50px";
    context.fillText(text, x, y);
  }
  
  function drawTextGame(text, x, y, color, context) {
    context.fillStyle = color;
    context.font = "50px 'Press Start 2P', cursive";
    context.fillText(text, x, y);
  }
  
  function drawBorder(x1, y1, x2, y2, color, context) {

    context.strokeStyle = color;
    context.lineWidth = 15;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  function drawSeparator(x, y, w, h, color, context, cHeight) {
    for (let index = 15; index < cHeight - 15; index+=15) {
        drawRect(x, y + index, w, h, color, context);
    }
  }

  function drawTextTwo(text, x, y, color, context) {
    context.fillStyle = color;
    context.font = "50px";
    context.fillText(text, x, y);
  }
