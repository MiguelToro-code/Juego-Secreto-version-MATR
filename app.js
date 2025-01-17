
/*
Miguel Toro, 17-ene-2025
Versión modificada del juego desarrollado por Leo en el curso "Lógica de programación: explorar funciones y listas".
Se limitan los intentos para adivinar el número secreto a medida que los posibles números secretos van disminuyendo.
Así, al comenzar el juego los intentos posibles son 6, y cada tres juegos se resta un intento.
También se otorgan puntos dependiendo del intento en el cual se acierta.
Estos puntos también van disminuyendo a medida que disminuyen los intentos que va teniendo el juego.
Aún no es un juego 100% funcional, pero es lo que puedo con lo aprendido hasta el momento
*/
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 20;
let puntosPosibles = [100,80,60,40,20,10];
let puntosAcumulados = 0;

intentosMaximos = Math.floor(numeroMaximo/3);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    // si el usuario acertó, se muestran los puntos ganados y los acumulados
    // en caso contrario, se evalúa si ya usó todos los intentos posibles y se habilita otro juego
    // si le quedan intentos para acertar, se disminuyen los intentos restantes
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        puntosAcumulados += puntosPosibles[5-intentosMaximos + intentos];
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'} Juega otra vez`);
        asignarTextoElemento('h2',`Ganaste ${puntosPosibles[5-intentosMaximos + intentos]} puntos y tienes ${puntosAcumulados} puntos acumulados`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (intentos == intentosMaximos){
            asignarTextoElemento('h2','Lo siento');
            asignarTextoElemento('p',`Ese era tu último intento (el número secreto era ${numeroSecreto})`);
            limpiarCaja();
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p','El número secreto es menor');
            } 
            else {
                asignarTextoElemento('p','El número secreto es mayor');
            };
            asignarTextoElemento('h2',`Te quedan ${intentosMaximos-intentos} ${((intentosMaximos-intentos) === 1) ? 'intento' : 'intentos'}`);
            intentos++;
        }
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    intentosMaximos = Math.floor((20 - listaNumerosSorteados.length)/3);
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo} tendrás ${intentosMaximos} intentos para adivinar`);
    asignarTextoElemento('h2',`Posibles puntos a ganar ${puntosPosibles[6 - intentosMaximos]}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();