const {
    cv
  } = require('./vision/utils');
const { runVideoFaceDetection } = require('./vision/commons');
const CronJob = require('cron').CronJob;
const si = require('systeminformation');
const git = require('simple-git')();
const fs = require('fs');
const path = require('path');
const loudness = require('mwl-loudness');
//const recognizer = new cv.FisherFaceRecognizer();
const recognizer = new cv.LBPHFaceRecognizer();
const talking = require('./speech/talking');
//const doStuff = require('./motor/dostuff');


const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

const webcamPort = 0;

function detectFaces(img) {
  // restrict minSize and scaleFactor for faster processing
  const options = {
    minSize: new cv.Size(100, 100),
    scaleFactor: 1.2,
    minNeighbors: 10
  };
  return classifier.detectMultiScaleGpu(img.bgrToGray(), options).objects;
}

function trainFaces() {
  let trainImages = [];
  let labels = [];
  talking.names = fs.readdirSync('output/');
  let nameNr = 0;
  talking.names.forEach(folder => {
    
    let files = fs.readdirSync('output/' + folder + '/');
    if (files) {
      files.forEach(file => {
        //console.log(file);
        let trainImage = cv.imread(path.resolve('output/' + folder + '/', file));
        trainImage = trainImage.bgrToGray();
        trainImages.push(trainImage);
        labels.push(nameNr);            
      });
    }
    nameNr++;
  });
  recognizer.train(trainImages, labels);
}

const batteryCheck = new CronJob('0 */1 * * * *', () => {
  //console.log('You will see this message every minute');
  console.log('batteryCheck');
  talking.clearThingsSaid();
  si.battery((info) => {
    if (info.percent < 20) {
      talking.setSubject('mijnbatterijisbijnaplat');
    }
  });
});
// const updateCheck = new CronJob('0 */15 * * * *', () => {
//   console.log('updateCheck');
//   talking.setSubject('ikgaeveneendutjedoen');
//   talking.saySomething('', true);
//   setTimeout(() => {
//     git.pull(() => {
//       // update should be pulled
//       console.log('updated');
//     });
//   }, 5000);
// });

trainFaces();

loudness.setVolume(100, function (err) {
  // Done
});

talking.setSubject('ikheblekkergeslapen');
talking.saySomething('', true);

batteryCheck.start();
//updateCheck.start();

try {
  runVideoFaceDetection(webcamPort, detectFaces, recognizer);
}
catch(err) {
  talking.setSubject('helpikzieniks');
  talking.saySomething('', true);
}

// test
