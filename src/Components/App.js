import { useEffect, useRef, useState } from 'react';
import {userOne, userTwo, trace, ball} from './Data';
import {update} from './UpdateMovement';
import classes from './App.module.css';


function App() {

  const canvasRef =  useRef(true);
  let context;
  let cWidth;
  let cHeight;
  
  const [isCheck, setCheck] = useState(false);
  
  useEffect(() => {
    
    const canvas = canvasRef.current;
    context = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    const render = () => {
      if (isCheck)
      {
        //NOTE - Movements, Collision detection, Score Update
        update(cWidth, cHeight);
        
        drawRect(0, 0, cWidth, cHeight, '#000');
        drawBorder(0, 0, cWidth, 0, '#d50000');
        drawBorder(0, cHeight, cWidth, cHeight, '#d50000'); 
        drawTextOne(userOne.score, cWidth / 4, cHeight / 5, '#FFF');
        drawTextTwo(userTwo.score, 3*cWidth / 4, cHeight / 5, '#FFF');
        drawSeparator(trace.x, trace.y, trace.width, trace.height, '#00c853');
        drawRect(userOne.x, userOne.y, userOne.width, userOne.height, '#FFF');
        drawRect(userTwo.x, userTwo.y, userTwo.width, userTwo.height, '#FFF');
        DrawCircle(ball.x, ball.y, ball.radius, '#ffff00');
      }
      else {
        drawRect(0, 0, cWidth, cHeight, '#000');
        drawBorder(0, 0, cWidth, 0, '#d50000');
        drawBorder(0, cHeight, cWidth, cHeight, '#d50000'); 
        drawTextOne(userOne.score, cWidth / 4, cHeight / 5, '#FFF');
        drawTextTwo(userTwo.score, 3*cWidth / 4, cHeight / 5, '#FFF');
        drawTextGame("START GAME", cWidth/6, 3*cHeight/5, '#64dd17');
        drawSeparator(trace.x, trace.y, trace.width, trace.height, '#00c853');
        drawRect(userOne.x, userOne.y, userOne.width, userOne.height, '#FFF');
        drawRect(userTwo.x, userTwo.y, userTwo.width, userTwo.height, '#FFF');
        DrawCircle(ball.x, ball.y, ball.radius, '#ffff00');

      }

      //NOTE - Call function render(); 60 times every 1000ms = 1sec
      requestAnimationFrame(render);
    }
    
    render();

    canvas.addEventListener('click', (e) => {
      setCheck(true);
    })

  }, [isCheck]);

  function drawRect(x, y, w, h, color) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  }

  function DrawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  function drawTextOne(text, x, y, color) {
    context.fillStyle = color;
    context.font = "50px";
    context.fillText(text, x, y);
  }
  
  function drawTextGame(text, x, y, color) {
    context.fillStyle = color;
    context.font = "50px 'Press Start 2P', cursive";
    context.fillText(text, x, y);
  }
  
  function drawBorder(x1, y1, x2, y2, color) {

    context.strokeStyle = color;
    context.lineWidth = 15;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  function drawSeparator(x, y, w, h, color) {
    for (let index = 15; index < cHeight - 15; index+=15) {
        drawRect(x, y + index, w, h, color);
    }
  }

  function drawTextTwo(text, x, y, color) {
    context.fillStyle = color;
    context.font = "50px";
    context.fillText(text, x, y);
  }

  window.addEventListener('keypress', function(e) {
    if (e.key === 'w' && userOne.y > 10) {
      userOne.y -= 20;
    }
    else if (e.key === 's' && userOne.height + userOne.y < cHeight - 10) {
      userOne.y +=20;
    }
  })
  
  window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp' && userTwo.y > 10) {
      userTwo.y -=20;
    }
    else if (e.key === 'ArrowDown' && userTwo.height + userTwo.y < cHeight - 10) {
      userTwo.y +=20;
    }
  })

  return (
    <div className={classes.container}>
        <canvas 
          className={classes.myCanvas}
          ref={canvasRef}
          width='800px'
          height='400px'>
        </canvas>
    </div>
  );
}

export default App;
