const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(() => {
    led.writeSync(led.readSync() ^ 1);
}, 200);

// Stop blinking the LED after 5 seconds
// setTimeout(_ => {
//   clearInterval(iv); // Stop blinking
//   led.unexport();    // Unexport GPIO and free resources
// }, 5000);