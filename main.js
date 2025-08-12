const pokemons = [
  {
    id: "0001",
    nombre: "Bulbasur",
    tipo: ["Planta", "Veneno"],
    imagen: "./images/Bulbasur.png",
  },

  {
    id: "0002",
    nombre: "Ivysaur",
    tipo: ["Planta", "Veneno"],
    imagen: "./images/Ivysaur.png",
  },

  {
    id: "0003",
    nombre: "Venusaur",
    tipo: ["Planta", "Veneno"],
    imagen: "./images/Venusaur.png",
  },

  {
    id: "0004",
    nombre: "Charmander",
    tipo: ["Fuego"],
    imagen: "./images/Charmander.png",
  },

  {
    id: "0005",
    nombre: "Charmeleon",
    tipo: ["Fuego"],
    imagen: "./images/Charmeleon.png",
  },

  {
    id: "0006",
    nombre: "Charizard",
    tipo: ["Fuego", "Volador"],
    imagen: "./images/Charizard.png",
  },

  {
    id: "0007",
    nombre: "Squirtle",
    tipo: ["Agua"],
    imagen: "./images/Squirtle.png",
  },

  {
    id: "0008",
    nombre: "Wartortle",
    tipo: ["Agua"],
    imagen: "./images/Wartortle.png",
  },

  {
    id: "0009",
    nombre: "Blastoise",
    tipo: ["Agua"],
    imagen: "./images/Blastoise.png",
  },
];

const botonAgregar = document.querySelectorAll(".boton");
const listaEquipo = document.querySelector(".listaEquipo");
const botonVaciar = document.querySelector(".vaciarEquipo");

const equipo = [];

botonAgregar.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    agregarAlEquipo(pokemons[index]);
  });
});

function agregarAlEquipo(pokemon) {
  if (equipo.find((p) => p.id === pokemon.id)) {
    alert(`${pokemon.nombre} ya esta en el equipo`);
    return;
  }
  equipo.push(pokemon);
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

botonVaciar.addEventListener("click", () => {
  equipo.length = 0;
  renderizarEquipo();
});
