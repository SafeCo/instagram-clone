import React, { useRef, useMemo, useEffect, useState, useImperativeHandle } from "react";

const SCROLL_SENSITIVITY = 0.0005;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;

const ZoomImage = ({ image, getNewImage }, ref) => {

  // Alternative to forward ref would be to have the function constantly firing off which is very bad for performance
  useImperativeHandle(ref, ()=>{
    return{
      convertFunc: ()=> convertCanvas(canvasRef?.current),
    }
  })

  const circleStyle ={
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);

  const touch = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const background = useMemo(() => new Image(), [image]);

  //observer useEffect 
  const containerRef = useRef(null);
  const observer = useRef(null);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const handleWheel = (event) => {
    const { deltaY } = event;
    if (!dragging) {
      setZoom((zoom) =>
        clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM)
      );
    }
  };

  const handleMouseMove = (event) => {
    if (dragging) {
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
      canvasRef.current.width = "200";
      canvasRef.current.height = "200";

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

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        const { width, height } = background;
        // If width of the container is smaller than image, scale image down
        if (target.clientWidth < width) {
          // Calculate scale
          const scale = target.clientWidth / width;

          // Redraw image
          canvasRef.current.width = width * scale;
          canvasRef.current.height = height * scale;
          canvasRef.current
            .getContext("2d")
            .drawImage(background, 0, 0, width * scale, height * scale);
        }
      });
    });
    observer.current.observe(containerRef.current);

    return () => {
      if(containerRef.current){
        observer.current.unobserve(containerRef.current);
      }
      
    
    }
  }, []);

  useEffect(()=>{
    setZoom(1)
    setOffset({
      x: 0,
      y: 0,
    });
  },[background])

  useEffect(() => {
    background.src = image;
    // Canvasref.current checks if something exists in the canvas, in this case an image was added
    if (canvasRef.current) {
      background.onload = () => { 
        canvasRef.current.width = 200;
        canvasRef.current.height = 200;

        // to use below set drawimage to below height and width
        let imageWidth = canvasRef.current.width / 2 - background.width / 2
        let imageHeight = canvasRef.current.height / 2 - background.height / 2
        
       
        //the image is drawn on to the canvas, as there is no size determined the default canvas of 300 x150 is applied 
         canvasRef.current.getContext("2d").drawImage(background, imageWidth, imageHeight);
      };
    }
  }, [background]);

  useEffect(() => {
    draw();
  }, [zoom, offset]);


//Conversion functions
//Converts base64String to a file object
  function base64StringtoFile(base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

// extracts file extension from a base64 string
  function extractImageFileExtensionFromBase64(base64Data){
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
}


  //converts canvas image into base64 and then coversts it to file object
  const convertCanvas = (canvasExist)=>{
    const base64data = canvasExist.toDataURL()
    const fileExtension = extractImageFileExtensionFromBase64(base64data)
    const myFilename = "previewfile." + fileExtension
    const newCroppedFile = base64StringtoFile(base64data, myFilename)

    getNewImage(newCroppedFile)
  }


//container ref to do with observer, might want to remove
  return (
    <div 
      ref={containerRef}
      style={circleStyle}>
      <canvas

        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  );
};

export default React.forwardRef(ZoomImage);