let obj;
let dolarSp = document.getElementById('dolarb');
let dosSp = document.getElementById('dosmil');
let milSp = document.getElementById('mil');
let quinSp = document.getElementById('quinientos');
let cienSp = document.getElementById('cien');
let lastUpd = document.getElementById('last');
let iphone = document.getElementById('iphone');
let input = document.getElementById('usdCalc');
let submit = document.getElementById('subCalc')
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

let input2 = document.getElementById('pesosCalc');
let submit2 = document.getElementById('subCalc2')

let cantPesos = document.getElementById('cantidadPesos');
let cantUsd = document.getElementById('cantidadUsd');

let cantPesos2 = document.getElementById('cantidadPesos2');
let cantUsd2 = document.getElementById('cantidadUSD2');


const asignarValores = (objeto) => {
    const blue = objeto.blue;
    const bluePrice = blue.value_avg;
    const dos =  2000 / bluePrice;
    const mil =  1000 / bluePrice;
    const quin = 500 / bluePrice;
    const cien = 100 / bluePrice;
    const lastU =  objeto.last_update;
    const iphoneVal = '$' + 1200 * bluePrice;

    let last = lastU.slice(0, 18);
    let lastDay = last.slice(0, 10)
    let lastH = last.slice(11)
    let fullLast = lastDay + ' a las: ' + lastH;
    

    dolarSp.innerHTML = '$' + bluePrice;
    lastUpd.innerHTML = fullLast;
    milSp.innerHTML = '$' + mil.toFixed(2)
    quinSp.innerHTML = '$' + quin.toFixed(2)
    cienSp.innerHTML = '$' + cien.toFixed(2)
    dosSp.innerHTML = '$' + dos.toFixed(2)
    iphone.innerHTML = iphoneVal
    cantPesos.innerHTML = '$' + 0;
    cantUsd.innerHTML = '$' + 0;
    cantPesos2.innerHTML = '$' + 0;
    cantUsd2.innerHTML = '$' + 0;

}

const calculadora = (obj) => {
    let pesos
    let usd
    const blue = obj.blue;
    const bluePrice = blue.value_avg;
    let valorInput = parseFloat(input.value)

    if (valorInput >= 0) {
        usd = parseFloat(input.value);
        pesos = usd * bluePrice;
        pesos = pesos.toFixed(2)
    } else if (isNaN(valorInput)) {
        alert('Introduzca un numero válido');
        usd = 0;
        pesos = 0;
    } else {
        alert('Introduzca un numero racional positivo');
        usd = 0;
        pesos = 0;
    }

   

    // cantUsd.innerHTML = "$" + usd;
    cantPesos.innerHTML = "$" + pesos;
}

const calculadora2 = (obj) => {
    let pesos2
    let usd2
    const blue = obj.blue;
    const bluePrice = blue.value_avg;
    let valorInput = parseFloat(input2.value)
    
    if (valorInput >= 0) {
       
        pesos2 = parseFloat(valorInput);
        usd2 = pesos2 / bluePrice;
        usd2 = usd2.toFixed(2)
    } else if (isNaN(valorInput)) {
        alert('Introduzca un numero válido');
        usd2 = 0;
        pesos2 = 0;
    } else {
        alert('Introduzca un numero racional positivo');
        usd2 = 0;
        pesos2 = 0;
    }

    cantUsd2.innerHTML = "$" + usd2;
    cantPesos2.innerHTML = "$" + pesos2;
}

fetch('https://api.bluelytics.com.ar/v2/latest')
    .then(res => res.json())
    .then((data)=> {
        console.log(data);
        obj = data;
        console.log(obj);
        asignarValores(obj);
    })
    .catch(err => console.log(err));

submit.addEventListener('click', (eve)=> {
    eve.preventDefault();
    calculadora(obj);
})
input.addEventListener('change', (e)=> {
    e.preventDefault();
    calculadora(obj);
})


submit2.addEventListener('click', (eve)=> {
    eve.preventDefault();
    calculadora2(obj);
})
input2.addEventListener('change', (e)=> {
    e.preventDefault();
    calculadora2(obj);
})

