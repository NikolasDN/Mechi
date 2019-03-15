const {
    cv
  } = require('./vision/utils');
const { runVideoFaceDetection } = require('./vision/commons');
//const CronJob = require('cron').CronJob;
//const express = require('express');
//const app = express();

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

//const cronjob1 = new CronJob('*/5 * * * * *', () => {
// setInterval(() => {
//   console.log('looking');
//   runVideoFaceDetection(webcamPort, detectFaces);
// }, 5000);

// const port = process.env.PORT || 2345;
// app.listen(port, function () {
//   console.log('app listening on port: ', port);
//   cronjob1.start();
// });

//cronjob1.start();
runVideoFaceDetection(webcamPort, detectFaces);