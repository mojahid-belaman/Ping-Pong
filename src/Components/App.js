import { useEffect, useRef, useState } from 'react';
import {update} from './UpdateMovement';
import {userOne, userTwo} from './Data'
import {Game} from './Game';
import classes from './App.module.css';


function App() {

  const canvasRef =  useRef(true);
  let context;
  let cWidth;
  let cHeight;
  let upPressedOne = false;
  let downPressedOne = false;
  let upPressedTwo = false;
  let downPressedTwo = false;
  
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
        Game(context, cWidth, cHeight, isCheck);
        if (upPressedOne && userOne.y > 10) {
          userOne.y -=10;
        }
        if (downPressedOne && userOne.height + userOne.y < cHeight - 10) {
          userOne.y +=10;
        }
        if (upPressedTwo && userTwo.y > 10) {
          userTwo.y -=10;
        }
        if (downPressedTwo && userTwo.height + userTwo.y < cHeight - 10) {
          userTwo.y +=10;
        }
      }
      else {
        Game(context, cWidth, cHeight, isCheck);
      }

      //NOTE - Call function render(); 60 times every 1000ms = 1sec
      requestAnimationFrame(render);
    }
    
    render();

    canvas.addEventListener('click', () => {
      setCheck(true);
    })

  }, [isCheck]);

  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('keydown', keyDownHandler);

  function keyDownHandler(e) {
    if(e.key == "w") {
        upPressedOne = true;
    }
    else if(e.key == "s") {
        downPressedOne = true
    }
    else if(e.key == "ArrowUp") {
        upPressedTwo = true
    }
    else if(e.key == "ArrowDown") {
        downPressedTwo = true
    }
  }
  function keyUpHandler(e) {
    if(e.key == "w") {
      upPressedOne = false;
    }
    else if(e.key == "s") {
      downPressedOne = false;
    }
    else if(e.key == "ArrowUp") {
      upPressedTwo = false;
    }
    else if(e.key == "ArrowDown") {
        downPressedTwo = false;
    }
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
