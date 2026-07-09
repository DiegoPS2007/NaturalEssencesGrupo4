const preguntas = [
  {
    titulo: "¿Cómo describirías tu tipo de piel?",
    opciones: [
      { icono: "img/testPiel/pielgrasa.jpg", titulo: "Grasa", descripcion: "Brillo constante todo el día" },
      { icono:"img/testPiel/pielseca.jpg", titulo: "Seca", descripcion: "Sensación de tirantez" },
      { icono: "img/testPiel/pielmixta.jpg", titulo: "Mixta", descripcion: "Zona T grasa, mejillas secas" },
      { icono: "img/testPiel/pielnormal.png", titulo: "Normal", descripcion: "Equilibrada la mayor parte del tiempo" }
    ]
  },
  {
    titulo: "¿Cuál es tu principal preocupación de piel?",
    opciones: [
      { icono: "img/testPiel/manchas.jpg", titulo: "Manchas", descripcion: "Busco unificar el tono" },
      { icono: "img/testPiel/arrugas.jpg", titulo: "Arrugas", descripcion: "Quiero prevenir signos de edad" },
      { icono:"img/testPiel/acne.jpg", titulo: "Acné", descripcion: "Tengo brotes frecuentes" },
      { icono: "img/testPiel/deshidratacion.jpg", titulo: "Deshidratación", descripcion: "Mi piel se siente tirante" }
    ]
  },
  {
    titulo: "¿Con qué frecuencia sientes que tu piel se irrita?",
    opciones: [
      { icono: "img/testPiel/casinunca.png", titulo: "Casi nunca", descripcion: "Mi piel es bastante resistente" },
      { icono: "img/testPiel/confrecuencia.png", titulo: "Con frecuencia", descripcion: "Reacciono a muchos productos" },
      { icono: "img/testPiel/conalgunosproductos.png", titulo: "Solo con algunos productos", descripcion: "Tengo cuidado con lo que uso" },
      { icono: "img/testPiel/constantemente.png", titulo: "Constantemente", descripcion: "Mi piel es muy reactiva" }
    ]
  },
  {
    titulo: "¿Cómo se ven tus poros generalmente?",
    opciones: [
      { icono: "img/testPiel/porosabiertos.jpg", titulo: "Muy visibles", descripcion: "Sobre todo en nariz y frente" },
      { icono: "img/testPiel/poroscerrados.jpg", titulo: "Poco visibles", descripcion: "Mi piel se ve bastante lisa" },
      { icono: "img/testPiel/porosdilatados.jpg", titulo: "Visibles solo en zona T", descripcion: "El resto de mi rostro es liso" },
      { icono: "img/testPiel/porossudoriparos.jpg", titulo: "Muy poco definidos", descripcion: "Casi no se notan" }
    ]
  },
  {
    titulo: "¿Cuántas horas duermes en promedio?",
    opciones: [
      { icono:"img/testPiel/cincohoras.jpg", titulo: "Menos de 5", descripcion: "Duermo muy poco" },
      { icono: "img/testPiel/seishoras.jpg", titulo: "5 a 6 horas", descripcion: "Un poco por debajo de lo ideal" },
      { icono: "img/testPiel/sietehoras.jpg", titulo: "7 a 8 horas", descripcion: "Duermo lo recomendado" },
      { icono: "img/testPiel/nuevehoras.jpg", titulo: "Más de 8", descripcion: "Duermo bastante bien" }
    ]
  },
  {
    titulo: "¿Cuánta agua tomas al día?",
    opciones: [
      { icono: "img/testPiel/agua.jpg", titulo: "Muy poca", descripcion: "Menos de 1 litro" },
      { icono: "img/testPiel/agua.jpg", titulo: "Moderada", descripcion: "Entre 1 y 2 litros" },
      { icono: "img/testPiel/agua.jpg", titulo: "Buena cantidad", descripcion: "Entre 2 y 3 litros" },
      { icono: "img/testPiel/agua.jpg", titulo: "Abundante", descripcion: "Más de 3 litros" }
    ]
  },
  {
    titulo: "¿Usas protector solar a diario?",
    opciones: [
      { icono: "img/testPiel/protectorsolar.jpg", titulo: "Nunca", descripcion: "No suelo usarlo" },
      { icono: "img/testPiel/protectorsolar.jpg", titulo: "A veces", descripcion: "Solo si voy a exponerme al sol" },
      { icono: "img/testPiel/protectorsolar.jpg", titulo: "Casi siempre", descripcion: "Intento no olvidarlo" },
      { icono: "img/testPiel/protectorsolar.jpg", titulo: "Siempre", descripcion: "Es parte esencial de mi rutina" }
    ]
  },
  {
    titulo: "¿Qué resultado buscas principalmente?",
    opciones: [
      { icono: "img/testPiel/controlbrillo.jpg", titulo: "Control de brillo", descripcion: "Quiero matificar mi piel" },
      { icono: "img/testPiel/hidratacion.jpg", titulo: "Hidratación", descripcion: "Necesito nutrir mi piel" },
      { icono: "img/testPiel/luminosidad.jpg", titulo: "Luminosidad", descripcion: "Quiero un aspecto radiante" },
      { icono: "img/testPiel/firmeza.jpg", titulo: "Firmeza", descripcion: "Busco prevenir la flacidez" }
    ]
  }
];

const resultados = {
  grasa: {
    imagen: "img/testPiel/pielgrasa.jpg",
    titulo: "Piel Grasa",
    descripcion: "Tu piel produce sebo en exceso, sobre todo en la zona T. Necesitas productos ligeros que controlen el brillo sin resecar."
  },
  seca: {
    imagen: "img/testPiel/pielseca.jpg",
    titulo: "Piel Seca",
    descripcion: "Tu piel tiende a la tirantez y descamación. Necesitas productos ricos en emolientes que aporten hidratación profunda."
  },
  mixta: {
    imagen: "img/testPiel/pielmixta.jpg",
    titulo: "Piel Mixta",
    descripcion: "Tu zona T necesita control de brillo mientras tus mejillas buscan hidratación. Una rutina equilibrada con productos ligeros pero nutritivos es ideal para ti."
  },
  normal: {
    imagen: "img/testPiel/pielnormal.png",
    titulo: "Piel Normal",
    descripcion: "Tu piel mantiene un buen equilibrio natural. Con una rutina de mantenimiento constante puedes conservar su salud y luminosidad."
  }
};

const productosRecomendados = [
  {
    etiqueta: "NUEVO",
    imagen: "img/general/productos/larochePosay.webp",
    marca: "Marca/Colección",
    rating: "4.7",
    nombre: "la roche Posay",
    precioAnterior: "S/ 85.99",
    precioActual: "S/ 82.99"
  },
  {
    etiqueta: "NUEVO",
    imagen: "img/general/productos/theOrdinary.webp",
    marca: "Marca/Colección",
    rating: "4.9",
    nombre: "The Ordinary",
    precioAnterior: "S/ 55.99",
    precioActual: "S/ 68.99"
  },
  {
    etiqueta: "OFERTA",
    esOferta: true,
    imagen: "img/general/productos/serum.jpg",
    marca: "Categoria",
    rating: "4.4",
    nombre: "Serum Amonico",
    precioAnterior: "S/ 85.99",
    precioActual: "S/ 49.99"
  }
];

const coleccionesRecomendadas = [
  {
    imagen: "img/general/productos/coleccionLoreal.webp",
    marca: "Marca",
    rating: "4.7",
    nombre: "Coleccion Loreal",
    precioAnterior: "S/ 85.99",
    precioActual: "S/ 68.99"
  },
  {
    imagen: "img/general/productos/coleccionSerums.webp",
    marca: "Marca",
    rating: "4.7",
    nombre: "Coleccion de Serum",
    precioAnterior: "S/ 85.99",
    precioActual: "S/ 70.00"
  }
];

let preguntaActual = 0;
let opcionSeleccionadaIndex = null;
let respuestasUsuario = [];

const preguntaContador = document.getElementById("preguntaContador");
const preguntaTitulo = document.getElementById("preguntaTitulo");
const opcionesGrid = document.getElementById("opcionesGrid");
const progresoLinea = document.getElementById("progresoLinea");
const panelPregunta = document.getElementById("panelPregunta");
const panelResultado = document.getElementById("panelResultado");
const btnRepetirTest = document.getElementById("btnRepetirTest");
const tituloPrincipal = document.getElementById("tituloPrincipal");

function renderizarPregunta() {
  tituloPrincipal.textContent = "TEST DE PIEL";

  const datos = preguntas[preguntaActual];

  preguntaContador.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  preguntaTitulo.textContent = datos.titulo;

  opcionesGrid.innerHTML = "";

  datos.opciones.forEach((opcion, index) => {
    const card = document.createElement("div");
    card.className = "opcion-card";
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${opcion.icono}" alt="${opcion.titulo}">
      <div class="opcion-titulo">${opcion.titulo}</div>
      <div class="opcion-descripcion">${opcion.descripcion}</div>
    `;

    card.addEventListener("click", () => seleccionarOpcion(index, card));
    opcionesGrid.appendChild(card);
  });

  actualizarBarraProgreso();
}

function seleccionarOpcion(index, cardElemento) {
  document.querySelectorAll(".opcion-card").forEach(c => c.classList.remove("seleccionada"));

  cardElemento.classList.add("seleccionada");
  opcionSeleccionadaIndex = index;

  respuestasUsuario[preguntaActual] = preguntas[preguntaActual].opciones[index].titulo;

  setTimeout(() => {
    avanzarSiguientePregunta();
  }, 400);
}

function avanzarSiguientePregunta() {
  if (preguntaActual < preguntas.length - 1) {
    preguntaActual++;
    opcionSeleccionadaIndex = null;
    renderizarPregunta();
  } else {
    mostrarResultado();
  }
}

function actualizarBarraProgreso() {
  const puntos = document.querySelectorAll(".progreso-punto");
  const totalPasos = puntos.length;

  puntos.forEach((punto, i) => {
    if (i <= preguntaActual) {
      punto.classList.add("activo");
    } else {
      punto.classList.remove("activo");
    }
  });

  const porcentaje = (preguntaActual / (totalPasos - 1)) * 100;
  progresoLinea.style.width = `${porcentaje}%`;
}

function determinarTipoPiel() {
  const respuestaPregunta1 = respuestasUsuario[0];

  if (respuestaPregunta1 === "Grasa") return "grasa";
  if (respuestaPregunta1 === "Seca") return "seca";
  if (respuestaPregunta1 === "Mixta") return "mixta";
  if (respuestaPregunta1 === "Normal") return "normal";

  return "mixta";
}

function mostrarResultado() {
  tituloPrincipal.textContent = "RESULTADO DE TEST DE PIEL";

  const tipoPiel = determinarTipoPiel();
  const datosResultado = resultados[tipoPiel];

  progresoLinea.style.width = "100%";
  document.querySelectorAll(".progreso-punto").forEach(p => p.classList.add("activo"));

  panelPregunta.style.display = "none";
  panelResultado.style.display = "block";

  document.getElementById("resultadoImagen").src = datosResultado.imagen;
  document.getElementById("resultadoTitulo").textContent = datosResultado.titulo;
  document.getElementById("resultadoDescripcion").textContent = datosResultado.descripcion;

  renderizarProductos();
  renderizarColecciones();
}

function renderizarProductos() {
  const contenedor = document.getElementById("productosGrid");
  contenedor.innerHTML = "";

  productosRecomendados.forEach(producto => {
    const card = document.createElement("div");
    card.className = "producto-card";

    card.innerHTML = `
      <div class="producto-etiqueta ${producto.esOferta ? 'oferta' : ''}">${producto.etiqueta}</div>
      <button class="btn-icono producto-favorito">♡</button>
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-marca">${producto.marca} <span class="producto-rating">★ ${producto.rating}</span></div>
      <div class="producto-nombre">${producto.nombre}</div>
      <div class="producto-precios">
        <span class="precio-tachado">${producto.precioAnterior}</span>
        <span class="precio-actual">${producto.precioActual}</span>
      </div>
      <button class="btn-oscuro btn-agregar">AÑADIR AL CARRITO</button>
    `;

    contenedor.appendChild(card);
  });
}

function renderizarColecciones() {
  const contenedor = document.getElementById("coleccionesGrid");
  contenedor.innerHTML = "";

  coleccionesRecomendadas.forEach(coleccion => {
    const card = document.createElement("div");
    card.className = "producto-card";

    card.innerHTML = `
      <button class="btn-icono producto-favorito">♡</button>
      <img class="producto-imagen" src="${coleccion.imagen}" alt="${coleccion.nombre}">
      <div class="producto-marca">${coleccion.marca} <span class="producto-rating">★ ${coleccion.rating}</span></div>
      <div class="producto-nombre">${coleccion.nombre}</div>
      <div class="producto-precios">
        <span class="precio-tachado">${coleccion.precioAnterior}</span>
        <span class="precio-actual">${coleccion.precioActual}</span>
      </div>
      <button class="btn-oscuro btn-agregar">AÑADIR AL CARRITO</button>
    `;

    contenedor.appendChild(card);
  });
}

btnRepetirTest.addEventListener("click", () => {
  preguntaActual = 0;
  opcionSeleccionadaIndex = null;
  respuestasUsuario = [];

  panelResultado.style.display = "none";
  panelPregunta.style.display = "block";

  renderizarPregunta();
});

renderizarPregunta();