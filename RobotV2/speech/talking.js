const player = require('play-sound')(opts = { player: 'mpg123' });
let subject = null;
let names = [];
let isTalking = false;
let lastTarget = '';
let lastSubject = null;

function saySomething(target) {
    if (isTalking) return;
    if (target == null) return;   

    // niks zeggen als het exact hetzelfde is
    if (lastTarget == target && lastSubject == subject) {
        return;
    }

    // niet opnieuw dezelfde persoon groeten
    if (lastTarget == target && lastSubject == null) {
        return;
    }

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

    isTalking = true;
    player.play("./speech/" + greeting + ".mp3", (err) => {
        if (err) throw err;

        if (target != '') {
            lastTarget = target;
            player.play("./speech/" + target + ".mp3", (err) => {
                if (err) throw err;

                if (subject) {
                    lastSubject = subject;
                    player.play("./speech/" + subject + ".mp3", (err) => {
                        if (err) throw err;

                        isTalking = false;

                        // cleanup
                        subject = null;
                    });
                }
                else {
                    isTalking = false;

                    // cleanup
                    subject = null;
                }
            });
        }
        else {
            isTalking = false;

            // cleanup
            subject = null;
        }        
    });
    
}

function setSubject(s) {
    subject = s;
}

module.exports = {
    saySomething,
    setSubject,
    names
}