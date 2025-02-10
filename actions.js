// Obtener los elementos del DOM
const siBtn = document.getElementById('siBtn');
const noBtn = document.getElementById('noBtn');
const imagen = document.getElementById('imagen');
const gif1 = document.getElementById('gif1');
const gif2 = document.getElementById('gif2');
const texto = document.getElementById('texto');

// Listas de imágenes, GIFs y textos para cada botón
const siOpciones = [
    { img: 'img/ouyea.png', text: '¿Pero si quieres salir o neh?', gif: 'img/kirbyqu.gif' },
    { img: 'img/gatocool.jpg', text: '¿Segura?', gif: 'img/cuteemoji.gif' },
    { img: 'img/bichoRomantico.jpg', text: ' ¿Muy segura? ', gif: 'img/cat-heart.gif' },
    { img: 'img/bichoRomantico.jpg', text: ' Entonces si salimos?', gif: 'img/kirbyyei.gif' }
];

const noOpciones = [
    { img: 'img/cheemstroste.jpg', text: 'Es pq no soy coreano, vdd?', gif: 'img/duck.gif' },
    { img: 'img/PerritoTroste.webp', text: '¿Enserio qué no? ', gif: 'img/kirbyqu.gif' },
    { img: 'img/BichoTroste.jpeg', text: 'Al menos lo intente', gif: 'img/sadKirby.gif' }
];

// Contadores para alternar entre opciones
let siIndex = 0;
let noIndex = 0;
let currentAudio = null; // Variable para almacenar el audio en reproducción
let lastButton = null; // Variable para rastrear el último botón presionado

// Función para cambiar cuando se presiona "Sí"
siBtn.addEventListener('click', () => {
    if (lastButton !== 'si') {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        currentAudio = new Audio('audio/pistabanda.mp3');
        currentAudio.play().catch(error => console.error("Error al reproducir el audio:", error));
    }
    lastButton = 'si';

    const opcion = siOpciones[siIndex];
    imagen.src = opcion.img;
    texto.textContent = opcion.text;
    gif1.src = opcion.gif;
    gif2.src = opcion.gif;

    // 🚀 Verificamos antes de incrementar si el siguiente índice será 0 (es decir, ya pasó por todas las opciones)
    console.log("Valor actual de siIndex:", siIndex);

    // 🚀 Si ya se presionaron las tres veces, mostrar el mensaje de "Plan"
    if (siIndex === siOpciones.length - 1) {
        mostrarMensajePlan(); // Llamar a la función que muestra el mensaje especial
        return; // Evita que se ejecute más código después
    }

    siIndex = (siIndex + 1) % siOpciones.length;
});

// Función para cambiar cuando se presiona "No"
noBtn.addEventListener('click', () => {
    if (lastButton !== 'no') {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio('audio/pipipipi.mp3');
        currentAudio.play().catch(error => console.error("Error al reproducir el audio:", error));
    }
    lastButton = 'no';

    const opcion = noOpciones[noIndex];
    imagen.src = opcion.img;
    texto.textContent = opcion.text;
    gif1.src = opcion.gif;
    gif2.src = opcion.gif;
    noIndex = (noIndex + 1) % noOpciones.length;
});



function mostrarMensajePlan() {
    // Limpiar el texto
    texto.textContent = ''; // Limpiar el texto
    imagen.style.display = 'none'; // Ocultar la imagen
    gif1.style.display = 'none'; // Ocultar el primer GIF
    gif2.style.display = 'none'; // Ocultar el segundo GIF
    siBtn.style.display = 'none'; // Ocultar el botón "Sí"
    noBtn.style.display = 'none'; // Ocultar el botón "No"

    // Eliminar el contenedor h1
    const h1 = document.querySelector('h1');
    h1.style.display = 'none'; // Ocultar el h1 que contiene el cuadro rosa

    // Crear el mensaje de "Plan"
    let mensajePlan = document.createElement('div');
    mensajePlan.className = 'mensaje-plan'; // Aplica la clase de estilo CSS
    mensajePlan.innerHTML = `
        <h2>Ouyea</h2>
        <p>¿Salimos a tomar algo el viernes?</p>
    `;
    
    // Agregar el mensaje al body
    document.body.appendChild(mensajePlan);

    // Mostrar la imagen del gato encima del mensaje
    displayCat();
}

// Función para mostrar la imagen del gato
function displayCat() {
    // Obtener el contenedor donde se mostrará la imagen
    var imageContainer = document.createElement('div'); // Crear un nuevo contenedor
    imageContainer.id = 'image-container'; // Asignar un id para el contenedor de la imagen

    // Crear una nueva imagen
    var catImage = new Image();
    catImage.src = 'img/cat.gif'; // Suponiendo que la imagen del gato se llama "cat.gif"
    catImage.alt = 'Cat'; // Texto alternativo para accesibilidad

    // Establecer un estilo específico solo para esta imagen
    catImage.style.position = 'absolute'; // Asegura que la imagen esté posicionada de forma absoluta
    catImage.style.top = '0%'; // Ajusta la imagen más arriba en la página
    catImage.style.left = '50%'; // Centra la imagen horizontalmente
    catImage.style.transform = 'translateX(-50%)'; // Asegura el centrado horizontal perfecto

    // Manejo de la carga de la imagen
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
        document.body.insertBefore(imageContainer, document.querySelector('.mensaje-plan'));
    };

    // Manejo de error en la carga de la imagen
    catImage.onerror = function() {
        console.error("No se pudo cargar la imagen del gato.");
        imageContainer.innerHTML = "<p>Error al cargar la imagen del gato. Intenta de nuevo.</p>";
        document.body.insertBefore(imageContainer, document.querySelector('.mensaje-plan'));
    };
}





