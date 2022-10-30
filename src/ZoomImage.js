import React, { useRef, useMemo, useEffect, useState } from "react";

const SCROLL_SENSITIVITY = 0.0005;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;

const ZoomImage = ({ image }) => {
  
  const styles = {
    border: '2px solid red', 
};
  
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [draggind, setDragging] = useState(false);

  const touch = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const observer = useRef(null);
  const background = useMemo(() => new Image(), [image]);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const handleWheel = (event) => {
    const { deltaY } = event;
    if (!draggind) {
      setZoom((zoom) =>
        clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM)
      );
    }
  };

  const handleMouseMove = (event) => {
    if (draggind) {
      const { x, y } = touch.current;
      const { clientX, clientY } = event;
      setOffset({
        x: offset.x + (x - clientX),
        y: offset.y + (y - clientY),
      });
      touch.current = { x: clientX, y: clientY };
    }
  };

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    touch.current = { x: clientX, y: clientY };
    setDragging(true);
  };

  const handleMouseUp = () => setDragging(false);

  const draw = () => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current;
      const context = canvasRef.current.getContext("2d");

      // Set canvas dimensions
      canvasRef.current.width = "300";
      canvasRef.current.height = "300";

      // Clear canvas and scale it
      context.translate(-offset.x, -offset.y);
      context.scale(zoom, zoom);
      context.clearRect(0, 0, width, height);

      // Make sure we're zooming to the center
      const x = (context.canvas.width / zoom - background.width) / 2;
      const y = (context.canvas.height / zoom - background.height) / 2;

      // Draw image
      context.drawImage(background, x, y);
    }
  };

  // useEffect(() => {
  //   observer.current = new ResizeObserver((entries) => {
  //     entries.forEach(({ target }) => {
  //       // target is the canvas

  //       // this is the width and height of the image, the image is also called background
        
  //     });
  //   });
  //   observer.current.observe(containerRef.current);

  //   return () => observer.current.unobserve(containerRef.current);
  // }, []);

  useEffect(() => {
    background.src = image;
    // Canvasref.current checks if something exists in the canvas, in this case an image was added
    if (canvasRef.current) {
      background.onload = () => {   
        
        // const { width, height } = background;
     
        //the image is drawn on to the canvas, as there is no size determined the default canvas of 300 x150 is applied 
        canvasRef.current.getContext("2d").drawImage(background, 0, 0);
      };
    }
  }, [background]);

  useEffect(() => {
    draw();
  }, [zoom, offset]);

  return (
    <div ref={containerRef}>
      <canvas
        style={styles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  );
};

export default ZoomImage;