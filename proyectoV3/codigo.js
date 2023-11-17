let quiz = reordenarArray(quizOriginal)
const TOTAL_PREGUNTAS = 10
let tiempo = 0
let puntos = 0
let nombre = ""
let cambiar = 0

function iniciar() {
    if (!comprobarNombre()) return
    tiempo = new Date().getTime()
    $(".ranking").hide()
    $(".inicio").hide()
    insertarQuiz()
    $(".quiz").show()
    iniciarEventListeners()
}

function comprobarNombre() {
    if (!$('#nombre').val()) {
        alert("Debe ingresar un nombre")
        return false
    }
    nombre = $('#nombre').val()
    return true
}

function insertarQuiz() {
    (document.querySelector(".imgquiz")).src = "imgquiz/" + quiz[cambiar].imagen
    $(".pregunta").text(quiz[cambiar]?.pregunta || "")
    let opciones = reordenarArray(quiz[cambiar]?.opciones)
    document.querySelectorAll(".boton").forEach(b => {
        opciones.length ? $(b).text(opciones.pop()) : $(b).hide()
    })
}

function iniciarEventListeners() {
    const botones = document.querySelectorAll(".boton");
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            if (esCorrecto = (quiz[cambiar].respuesta == boton.innerText))
                puntos++
            imagenDeResultado(esCorrecto)
            siguienteQuiz()
        });
    });
}

async function imagenDeResultado(resultado) {
    img = document.createElement("img")
    img.id = "check"
    img.src = resultado ? "img/check.png" : "img/mal.jpg"
    main = document.querySelector(".main")
    $(".quiz").hide()
    main.appendChild(img)
}

async function siguienteQuiz(){
    await sleep(2000)
    document.querySelector("#check").remove();
    if (!(++cambiar >= TOTAL_PREGUNTAS)){
        insertarQuiz()
        $(".quiz").show()
    }else mostrarResultados()
}

function mostrarResultados(){
    tr = document.createElement("tr")
    $(tr).append($(document.createElement("td")).text(nombre))
    $(tr).append($(document.createElement("td")).text(puntos))
    $(tr).append($(document.createElement("td")).text(((new Date().getTime() - tiempo )/1000).toFixed(1) + "sg"))
    $("#puntajes").append(tr)
    $(".ranking").show()
}

function reordenarArray(array) { //Funcion extraida de Google, algoritmo de Knuth
    const newArray = [...array]; // Copia el array original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray; // Retorna el nuevo array reordenado
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}