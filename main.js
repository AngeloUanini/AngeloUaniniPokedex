const pokemon = [
    {nombre:"bulbasur", ID:"1"},
    {nombre:"charmander", ID:"2"},
    {nombre:"squirtle", ID:"3"},
    {nombre:"pikachu", ID:"4"}
]

function pokedex() {
    let bandera = true

    while (bandera){
        let opcion = Number(
        prompt(
            "Como quiere buscar?\n 1- Nombre del pokemon\n 2- ID del pokemon\n 3- Salir"
        )
    )
     if(opcion === 1){
        buscarPokemon('nombre')
    }else if(opcion === 2){
        buscarPokemon('ID')
    }else if(opcion === 3){
        bandera = false
        alert('Hasta Luego!')
    }else{
        alert("Esa opcion no existe")
    }
    }
}

function buscarPokemon(criterio) {
    const arrayBusqueda = []
    
    for(let i = 0; i < pokemon.length; i++){
        arrayBusqueda.push(pokemon[i][criterio])
    }

    let textoPregunta
    if(criterio === 'nombre'){
        textoPregunta = 'Cual es el nombre del pokemon que usted busca?'
    }else {
        textoPregunta = 'Cual es el ID del pokemon que usted busca?'
    }

    let pokemonABuscar = prompt(textoPregunta)

    let index =arrayBusqueda.indexOf(pokemonABuscar)

    if(index === -1){
        alert('Este pokemon no se encuentra en la pokedex')
    } else if(criterio ==='nombre'){
        alert('El pokemon se encuentra en la pokedex, su ID es: '+ pokemon[index].ID)
    }else{
        alert('El pokemon se encuentra en la pokedex, su nombre es: '+ pokemon[index].nombre)
    }
}
pokedex()

