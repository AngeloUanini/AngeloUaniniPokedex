const tipoClases = {
  grass: "tipoPlanta",
  poison: "tipoVeneno",
  fire: "tipoFuego",
  water: "tipoAgua",
  flying: "tipoVolador",
  bug: "tipoBicho",
  normal: "tipoNormal",
  electric: "tipoElectrico",
  ground: "tipoTierra",
  fairy: "tipoHada",
  psychic: "tipoPsiquico",
  rock: "tipoRoca",
  fighting: "tipoLucha",
  ghost: "tipoFantasma",
  ice: "tipoHielo",
  dragon: "tipoDragon",
  dark: "tipoSiniestro",
  steel: "tipoAcero",
};

const tipoTraducciones = {
  grass: "Planta",
  poison: "Veneno",
  fire: "Fuego",
  water: "Agua",
  flying: "Volador",
  bug: "Bicho",
  normal: "Normal",
  electric: "Eléctrico",
  ground: "Tierra",
  fairy: "Hada",
  psychic: "Psíquico",
  rock: "Roca",
  fighting: "Lucha",
  ghost: "Fantasma",
  ice: "Hielo",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
};

// Variables
const listaEquipo = document.querySelector(".listaEquipo");
const botonVaciar = document.querySelector(".vaciarEquipo");
const inputBusqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btnBuscar");
const pokedex = document.querySelector(".pokedex");

const equipo = [];
let offset = 1;    // desde dónde empieza
const limite = 10; // cuántos mostrar por carga

// Equipo
const equipoGuardado = JSON.parse(localStorage.getItem("equipoPokemon"));
if (equipoGuardado) {
  equipo.push(...equipoGuardado);
  renderizarEquipo();
}

function renderizarEquipo() {
  listaEquipo.innerHTML = "";
  equipo.forEach((pokemon) => {
    const li = document.createElement("li");
    li.textContent = `${pokemon.nombre} (N°${pokemon.id})`;
    listaEquipo.appendChild(li);
  });
}

function agregarAlEquipo(pokemon) {
  if (equipo.find((p) => p.id === pokemon.id)) {
    Swal.fire({
      icon: "warning",
      title: "Ups...",
      text: `${pokemon.nombre} ya está en tu equipo`,
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  if (equipo.length >= 6) {
    Swal.fire({
      icon: "error",
      title: "¡Equipo completo!",
      text: "No puedes tener más de 6 Pokémon",
      confirmButtonColor: "#d33",
    });
    return;
  }

  equipo.push(pokemon);
  renderizarEquipo();
  localStorage.setItem("equipoPokemon", JSON.stringify(equipo)); 
}

botonVaciar.addEventListener("click", () => {
  equipo.length = 0;
  renderizarEquipo();
  localStorage.removeItem("equipoPokemon"); 
});

//Traducciones
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function normalizarPokemon(data) {
  return {
    id: data.id.toString().padStart(4, "0"),
    nombre: capitalizar(data.name),
    tipos: data.types.map((t) => t.type.name),
    imagen: data.sprites.other["official-artwork"].front_default,
  };
}

//Tarjetas pokemon y renderizar
function renderPokemon(pokemon) {
  const article = document.createElement("article");
  article.classList.add("tarjetaPokemon");

  article.innerHTML = `
    <img class="imagenPokemon" src="${pokemon.imagen}" alt="Imagen de ${pokemon.nombre}">
    <div>
      <span class="id">N°${pokemon.id}</span>
      <h5 class="nombrePokemon">${pokemon.nombre}</h5>
    </div>
    <div class="centrarTipos">
      ${pokemon.tipos
        .map((tipo) => {
          const traduccion = tipoTraducciones[tipo] || tipo;
          return `<span class="${tipoClases[tipo]}">${traduccion}</span>`;
        })
        .join("")}
    </div>
    <div class="centrarBoton">
      <button class="boton">Agregar al Equipo</button>
    </div>
  `;

  const boton = article.querySelector(".boton");
  boton.addEventListener("click", () => {
    agregarAlEquipo(pokemon);
  });

  pokedex.appendChild(article);
}

// Cargar pokemon
async function cargarPokemon(id) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await respuesta.json();
  const pokemon = normalizarPokemon(data);
  renderPokemon(pokemon);
}

async function cargarVariosPokemons() {
  for (let id = offset; id < offset + limite; id++) {
    await cargarPokemon(id);
  }
  offset += limite;
}

function agregarBotonCargarMas() {
  const paginacionDiv = document.getElementById("paginacion");
  paginacionDiv.innerHTML = ""; 

  const btn = document.createElement("button");
  btn.textContent = "Cargar más Pokémon";
  btn.addEventListener("click", () => {
    cargarVariosPokemons();
  });

  paginacionDiv.appendChild(btn);
}


// Buscar pokemon
async function fetchPokemon(query) {
  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    );
    if (!respuesta.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await respuesta.json();
    const pokemon = normalizarPokemon(data);

    pokedex.innerHTML = "";
    renderPokemon(pokemon);
  } catch (error) {
    pokedex.innerHTML = `<p>${error.message}</p>`;
  }
}

function buscarPokemon() {
  const valor = inputBusqueda.value.trim().toLowerCase();
  if (valor) {
    fetchPokemon(valor);
  }
}

// Event listener
btnBuscar.addEventListener("click", buscarPokemon);

inputBusqueda.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    buscarPokemon();
  }
});

inputBusqueda.addEventListener("input", () => {
  if (inputBusqueda.value.trim() === "") {
    pokedex.innerHTML = "";
    cargarVariosPokemons();
  }
});

// Ejecucion
cargarVariosPokemons().then(() => {
  agregarBotonCargarMas();
});
