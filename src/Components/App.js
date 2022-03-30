import { useEffect, useRef, useState } from 'react';
import {userOne, userTwo, trace, ball} from './Data'
import classes from './App.module.css'

function App() {

  const canvasRef =  useRef(true);
  let context;
  let cWidth;
  let cHeight;

  useEffect(() => {
    const canvas = canvasRef.current;
  
    context = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    drawRect(0, 0, cWidth, cHeight, '#000');
    drawBorder(0, 0, cWidth, 0, '#FFF');
    drawBorder(0, cHeight, cWidth, cHeight, '#FFF');
    drawText(userOne.score, cWidth / 4, cHeight / 5, '#FFF');
    drawText(userOne.score, 3*cWidth / 4, cHeight / 5, '#FFF');
    drawTraceTiran(trace.x, trace.y, trace.width, trace.height);
    drawRect(userOne.x, userOne.y, userOne.width, userOne.height, '#FFF');
    drawRect(userTwo.x, userTwo.y, userTwo.width, userTwo.height, '#FFF');
    DrawCircle(ball.x, ball.y, ball.radius, '#FFF');
  });

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

  function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px fantasy";
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

  function drawTraceTiran(x, y, w, h, color) {
    for (let index = 15; index < cHeight - 15; index+=15) {
        drawRect(x, y + index, w, h, color);
    }
  }

  function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "50px Dela Gothic One, cursive";
    context.fillText(text, x, y);
  }

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
