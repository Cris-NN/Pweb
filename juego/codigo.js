let numeroAleatorio = generarNumero();
let numeroDeIntentos = 3;
let texto = document.getElementById("texto");

function reiniciar(){
    numeroAleatorio = generarNumero()
    numeroDeIntentos = 3;

    let boton = document.getElementById("boton")
    let reiniciar = document.getElementById("reiniciar")
    
    boton.disabled = false;    
    reiniciar.disabled = true;
    texto.innerHTML = "";
}

function generarNumero(){
    /*let h = Math.random();
    h = h * 100;
    h = Numer.parseInt(h);*/

    let numeroAleatorio = Number.parseInt(Math.random() * 100);
    return numeroAleatorio;
}

function comparar(){
    let boton = document.getElementById("boton")
    let reiniciar = document.getElementById("reiniciar")

    numero = Number.parseInt(document.getElementById("numero").value);

    if(numeroDeIntentos > 0){
        if(numeroAleatorio == numero){
            texto.innerText = "FELICITACIONES GANASTE";
        }else{
            texto.innerText = "Numero de intentos : " + (numeroDeIntentos-1);
            numeroDeIntentos--         
        }
    }else{
        deshabilitarBoton(boton, reiniciar)
        texto.innerText = "Perdiste te quedaste sin intentos, el numero era: " + numeroAleatorio;
    }

    console.log(numeroAleatorio);
    console.log(numero);
}

function deshabilitarBoton(boton, reiniciar){
    boton.disabled = true;    
    reiniciar.disabled = false;
}

//Made by comision 2023 2do Cuatri