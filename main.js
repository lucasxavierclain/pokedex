

const data = Array(150)
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => data.fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json())
)
const pokemonPromises = generatePokemonPromises()

function newPage(value) {

  window.open(`https://www.google.com.br/search?hl=pt-BR&tbm=isch&sxsrf=ALeKk03dgUs5mUpHGu_BIvFhoFeylignpw%3A1614265408390&source=hp&biw=1225&bih=574&ei=QLw3YJCtFYLY5OUPvZuK2Aw&q=${value}&oq=${value}&s_lcp=CgNpbWcQAzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADoHCCMQ6gIQJ1CcDVicDWCUM2gBcAB4AIABWIgBWJIBATGYAQCgAQKgAQGqAQtnd3Mtd2l6LWltZ7ABCg&sclient=img&ved=0ahUKEwiQzfOhp4XvAhUCLLkGHb2NAssQ4dUDCAY&uact=5`)
}
Promise.all(pokemonPromises)
  .then(pokemons => {
    const listPokemons = pokemons.reduce((acumulador, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      acumulador += `<li class="cards ${types[0]}">
          
          <img class="card-image " alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
          <div class="type-pokemon"><h2>${pokemon.id} - </h2><h2 class="name-pokemon"> ${pokemon.name}</h2></div><hr/>
          <h4>Type</h4>
          <p class="card-subtitle">${types.join(" | ")}</p><hr/>
          <p class="info">Search about this <button onclick="newPage(this.value)"  
          value=${pokemon.name}>Pokémon</button></p>
          </li>`;


      return acumulador
    }, ``)
    const li = document.querySelector('[data-list]')
    li.innerHTML = listPokemons
  }
  )

function numberPokemons() {
  const quantidade = document.querySelector('[data-number-pokemons]')
  quantidade.innerHTML = `Pokedex (${data.length})`
}
window.onload = numberPokemons