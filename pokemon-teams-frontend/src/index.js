const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

const releasePokemon = id =>
   fetch (POKEMONS_URL + `/${id}`, { method: 'DELETE' })
      .then(r=>console.log(r.status))

const addPokemon = id =>
   fetch (POKEMONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
         { 'trainer_id': id }
      )
   }).then(r=>console.log(r.status))

const listener = (e) => {
   if (e.target.getAttribute('class','release')) {
      releasePokemon(parseInt(e.target.dataset.pokemonId))
      e.target.parentElement.remove()
   }
   if (e.target.getAttribute('class','add')) {
      addPokemon(parseInt(event.target.dataset.trainerId))
   }
}

const showTrainer  = trainer => {
   const div = document.createElement('div')
   div.className = 'card'
   div.setAttribute('data-id',`${trainer.id}`)
   div.innerHTML = `
   <p>${trainer.name}</p>
   <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>`
   trainer.pokemons.forEach((pokemon)=>div.innerHTML += `
   <li>${pokemon.nickname}(${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
   </li>`)
   div.addEventListener('click',listener)
   main.append(div)
   }

const showTrainers = (trainers) => trainers
   .forEach(showTrainer)

const getTrainers = () => fetch(TRAINERS_URL).then(r => r.json())
   .then(showTrainers)

getTrainers()