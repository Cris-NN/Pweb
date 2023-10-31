const TOTAL_DE_PREGUNTAS = 8
const quiz = construirOpciones();
let numeroOpcion = 0;
let puntos = 0


function finalizar(){
    fieldset = document.querySelector("fieldset")
    span = document.createElement("span")
    span.className="comenzar"
    span.textContent = `Total de puntos: ${puntos}`
    fieldset.appendChild(span)
}

function empezar() {
    if (!document.querySelector("#nombre").value) return;
    document.querySelector("#nombre").disabled = true;
    document.querySelector(".comenzar").remove();
    section = document.createElement("section");
    section.className = "quiz";
    fieldset = document.createElement("fieldset");
    insertarQuiz(fieldset);
    imgOmitir = document.createElement("img");
    imgOmitir.className = "siguiente-imagen";
    imgOmitir.src = "img/siguiente.png";
    imgOmitir.title = "Omitir";
    botonOmitir = document.createElement("button");
    botonOmitir.className = "siguiente";
    botonOmitir.appendChild(imgOmitir);

    section.appendChild(fieldset);
    section.appendChild(botonOmitir);

    document.querySelector("main").appendChild(section);

    eventListener()

}

function siguiente() {
    numeroOpcion++;
    document.querySelector("fieldset").innerHTML = ""
    if(numeroOpcion > TOTAL_DE_PREGUNTAS-1){
        finalizar()
    }else{
    insertarQuiz(document.querySelector("fieldset"));
    eventListener()
    }
}

function eventListener(){
    const botones = document.querySelectorAll(".boton");
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            boton.innerText == quiz[numeroOpcion].respuesta ? puntos++ : console.log("MAL")
            siguiente();
        });
    });

    const omitir = document.querySelector(".siguiente-imagen");
    omitir.addEventListener("click", function () {
        puntos--;
        siguiente();
    });
}

function insertarQuiz(fieldset) {
    img = document.createElement("img");
    span = document.createElement("span");
    fieldset.appendChild(img);
    fieldset.appendChild(span);
    div = document.createElement("div");
    div.className = "opcion";
    img.className = "imgquiz";
    span.className = "pregunta";
    img.src = `imgQuiz/${quiz[numeroOpcion].imagen}`;
    span.textContent = quiz[numeroOpcion].pregunta;
    let opciones = []
    opciones[0] = quiz[numeroOpcion].respuesta
    opciones[1] = quiz[numeroOpcion].opcion1
    quiz[numeroOpcion].opcion2 ? opciones[2] = quiz[numeroOpcion].opcion2 : null
    quiz[numeroOpcion].opcion3 ? opciones[3] = quiz[numeroOpcion].opcion3 : null
    opciones = reordenarArray(opciones);
    for (let j = 0; j < opciones.length; j++) {
        div = document.createElement("div");
        div.className = "opcion";
        boton = document.createElement("button");
        boton.className = "boton";
        boton.textContent = opciones[j];
        div.appendChild(boton);
        fieldset.appendChild(div);
    }
}

function construirOpciones() {
    let quizProvisorio = [];

    quizProvisorio.push({
        imagen: "jupiter.jpg",
        pregunta: "¿A cual de los siguientes planetas corresponde la imagen?",
        respuesta: "Jupiter",
        opcion1: "Sol",
        opcion2: "marte",
        opcion3: "saturno",
    });
    quizProvisorio.push({
        imagen: "saturno.webp",
        pregunta: "¿A cual de los siguientes planetas corresponde la imagen?",
        respuesta: "Saturno",
        opcion1: "La tierra",
        opcion2: "venus",
        opcion3: "jupiter",
    });
    quizProvisorio.push({
        imagen: "agujero.webp",
        pregunta: "¿Que es?",
        respuesta: "Agujero de gusano",
        opcion1: "Agujero negro",
        opcion2: "Andromeda",
        opcion3: "Una galaxia",
    });
    quizProvisorio.push({
        imagen: "laLunaEs.png",
        pregunta: "",
        respuesta: "Un satelite Natural",
        opcion1: "Una estrella",
        opcion2: "Una estrella muerta",
    });

    quizProvisorio.push({
        imagen: "planetaMisterioso.png",
        pregunta: "¿Cual es el planeta mas grande del sistema solar?",
        respuesta: "Jupiter",
        opcion1: "La tierra",
        opcion2: "Marte",
        opcion3: "El Sol",
    });
    quizProvisorio.push({
        imagen: "planetaMisterioso.png",
        pregunta: "¿Cual es el planeta mas chico del sistema solar?",
        respuesta: "Mercurio",
        opcion1: "La tierra",
        opcion2: "Marte",
        opcion3: "La luna",
    });

    quizProvisorio.push({
        imagen: "pregunta1.png",
        pregunta: "",
        respuesta: "8",
        opcion1: "7",
        opcion2: "9",
        opcion3: "6",
    });
    quizProvisorio.push({
        imagen: "viaLactea.jpg",
        pregunta: "¿Como se llama la galaxia en la que vivimos?",
        respuesta: "Via lactea",
        opcion1: "Andromeda",
        opcion2: "Tierra",
        opcion3: "Sol",
    });

    return reordenarArray(quizProvisorio);
}

function reordenarArray(array) { //Funcion extraida de Google, algoritmo de Knuth
    const newArray = [...array]; // Copia el array original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray; // Retorna el nuevo array reordenado
}