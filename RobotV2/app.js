const {
    cv
  } = require('./vision/utils');
const { runVideoFaceDetection } = require('./vision/commons');
const CronJob = require('cron').CronJob;
const si = require('systeminformation');
const git = require('simple-git')();
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

const batteryCheck = new CronJob('0 * * * * *', () => {
  //console.log('You will see this message every minute');
  si.battery((info) => {
    if (info.percent < 20) {
      talking.setSubject('mijnbatterijisbijnaplat');
    }
  });
});
const updateCheck = new CronJob('0 * * * * *', () => {
  talking.setSubject('ikgaeveneendutjedoen');
  talking.saySomething('', true);
  setTimeout(() => {
    git.pull(() => {
      // update should be pulled
      console.log('updated');
    });
  }, 5000);
});

batteryCheck.start();
updateCheck.start();

runVideoFaceDetection(webcamPort, detectFaces);