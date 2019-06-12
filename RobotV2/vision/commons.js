const {
    cv,
    grabFrames,
    drawBlueRect
  } = require('./utils');
  const loadFacenet = require('./dnn/loadFacenet');
  const { extractResults } = require('./dnn/ssdUtils');
  const uuid = require('uuid/v1');
  const talking = require('../speech/talking');
  const learning = false;
  
  exports.runVideoFaceDetection = (src, detectFaces, recognizer) => grabFrames(src, 1, (frame) => {
    console.time('detection time');
    const frameResized = frame.resizeToMax(800);

    //cv.imwrite(`./output/${uuid()}.png`, frameResized);
  
    // detect faces
    const faceRects = detectFaces(frameResized);
    if (faceRects.length) {
      // draw detection
      faceRects.forEach(faceRect => {
        //drawBlueRect(frameResized, faceRect);

        const newImg = frameResized.getRegion(faceRect).resize(80, 80);
        if (learning) {          
          cv.imwrite(`./output/${uuid()}.png`, newImg);
        }        
        // recognition
        const img = newImg.bgrToGray();
        const result = recognizer.predict(img);
        //console.log('predicted: %s, confidence: %s', talking.names[result.label], result.confidence);
        let target = '';
        if (result.label) {
          target = talking.names[result.label];
          console.log('ik herken: ' + target);
        }

        talking.saySomething(target, false);
       } 
      );
      
    }
  
    //cv.imshow('face detection', frameResized);
    console.timeEnd('detection time');
  });
  
  function classifyImg(net, img) {
    // facenet model works with 300 x 300 images
    const imgResized = img.resizeToMax(300);
  
    // network accepts blobs as input
    const inputBlob = cv.blobFromImage(imgResized);
    net.setInput(inputBlob);
  
    // forward pass input through entire network, will return
    // classification result as 1x1xNxM Mat
    let outputBlob = net.forward();
    // extract NxM Mat
    outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3]);
  
    return extractResults(outputBlob, img);
  }
  
  exports.makeRunDetectFacenetSSD = function() {
    const net = loadFacenet();
    return function(img, minConfidence) {
      const predictions = classifyImg(net, img);
  
      predictions
        .filter(res => res.confidence > minConfidence)
        .forEach(p => drawBlueRect(img, p.rect));
  
      return img;
    }
  }