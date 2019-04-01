const {
    cv
  } = require('./vision/utils');
const { runVideoFaceDetection } = require('./vision/commons');
const CronJob = require('cron').CronJob;
const talking = require('./speech/talking');


const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

const webcamPort = 0;

function detectFaces(img) {
  // restrict minSize and scaleFactor for faster processing
  const options = {
    minSize: new cv.Size(100, 100),
    scaleFactor: 1.2,
    minNeighbors: 10
  };
  return classifier.detectMultiScale(img.bgrToGray(), options).objects;
}

const batteryCheck = new CronJob('* * * * * *', function() {
  //console.log('You will see this message every minute');
  
});
batteryCheck.start();

runVideoFaceDetection(webcamPort, detectFaces);