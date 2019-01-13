console.log("Hallo allemaal");

console.log("mag ik spelen");

var nummertje1;
nummertje1 = 3;
var nummertje2;
nummertje2 = 8;
var nummertje3;
nummertje3 = nummertje1 - nummertje2;
console.log(nummertje3);
var naam1 = "lucas";
var naam2 = "jolan";
console.log(naam1 + naam2);

function vermenigvuldigen(getal1, getal2) {
    var resultaat;
    resultaat = getal1 * getal2;
    return resultaat;
}

function optellen(woordje1,woordje2) {
    var woordje;
    woordje = woordje1 + woordje2;
    return woordje;
}


var testje;
testje = vermenigvuldigen(nummertje1, 8);
console.log(testje);

var bla;
bla = optellen("ha","llo");
console.log(bla);


var zot = optellen(vermenigvuldigen(8, 9), 10);
console.log(zot);
