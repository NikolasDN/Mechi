const player = require('play-sound')(opts = { players: ['omxplayer', 'mpg123'] });
let subject = null;
let names = [];
let isTalking = false;
let thingsSaid = [];
let latency = 2000;

function saySomething(target) {
    if (isTalking) return;
    if (target == null) return;   

    console.log('ik kan nog spreken');

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

    let thingToSay = greeting + target + ((subject) ? subject : '');
    if (thingsSaid.includes(thingToSay)) return;
    thingsSaid.push(thingToSay);
    console.log(thingToSay);

    isTalking = true;
    
    player.play("./speech/" + greeting + ".mp3", { omxplayer: ['-o', 'local']}, (err) => {
        if (err) throw err;
    });

    if (target != '') {
        setTimeout(() => {
            //if (target != '') {
                player.play("./speech/" + target + ".mp3", { omxplayer: ['-o', 'local']}, (err) => {
                    if (err) throw err;
                });
                if (!subject) {
                    isTalking = false;
                }
            //}
        },latency);
    }    
    else {
        if (!subject) {
            isTalking = false;
        }
    }

    if (subject) {
        setTimeout(() => {
            player.play("./speech/" + subject + ".mp3", { omxplayer: ['-o', 'local']}, (err) => {
                if (err) throw err;

                //isTalking = false;

                // cleanup
                //subject = null;
            });
            isTalking = false;

            // cleanup
            subject = null;
        },(target == '' ? latency : latency * 2));
    }
    else {
        isTalking = false;
    }
    //             else {
    //                 isTalking = false;

    //             }
    //         });
    //     }
    //     else {
    //         isTalking = false;
    //     }        
    // });
    
}

function setSubject(s) {
    subject = s;
}

module.exports = {
    saySomething,
    setSubject,
    names,
    thingsSaid,
    isTalking
}