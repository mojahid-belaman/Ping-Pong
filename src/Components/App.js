import { useEffect, useRef } from 'react';
import classes from './App.module.css'

function App() {

  const canvasRef =  useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#FFF';
    context.beginPath();
    context.arc(95,95,15, 0, 360);
    context.stroke();
  });

  return (
    <canvas className={classes.myCanvas} ref={canvasRef}>
    </canvas>
  );
}

export default App;
