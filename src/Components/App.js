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
