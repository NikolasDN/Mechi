const player = require('play-sound')(opts = { player: 'mpg123' });
let subject = 'ikheblekkergeslapen';
let lastTalk = Date.now();

function saySomething(target) {
    // check time
    if (Date.now() < lastTalk + 10000) return;
    if (target == null) return;
    lastTalk = Date.now();

    // greeting
    let greeting = "hallo";
    let date = new Date();
    let current_hour = date.getHours();
    if (current_hour >= 6 && current_hour < 10) {
        greeting = "goeiemorgen";
    }
    if (current_hour >= 12 && current_hour < 15) {
        greeting = "goeiemiddag";
    }
    if (current_hour >= 18 && current_hour < 21) {
        greeting = "goeieavond";
    }
    if (current_hour >= 21 && current_hour < 24) {
        greeting = "slaapwel";
    }
    
    if (subject) {
        console.log(subject);
        player.play("./speech/" + subject + ".mp3", (err) => {
            if (err) throw err;
        });
    }
    else {
        console.log(greeting);
        player.play("./speech/" + greeting + ".mp3", (err) => {
            if (err) throw err;
        });
    }

    // cleanup
    subject = null;
    target = null;
}

function setSubject(s) {
    subject = s;
}

module.exports = {
    saySomething,
    setSubject
}