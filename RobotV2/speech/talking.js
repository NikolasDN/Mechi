const player = require('play-sound')(opts = { player: 'mpg123' });
let subject = 'ikheblekkergeslapen';
let target = null;

function saySomething() {
    if (target == null) return;

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

    console.log(greeting);
    player.play("./speech/" + greeting + ".mp3", (err) => {
        if (err) throw err;
    });
    if (subject) {
        console.log(subject);
        player.play("./speech/" + subject + ".mp3", (err) => {
            if (err) throw err;
        });
    }

    // cleanup
    subject = null;
    target = null;
}

function setTarget(value) {
    target = value;
}

module.exports = {
    saySomething,
    setTarget
}