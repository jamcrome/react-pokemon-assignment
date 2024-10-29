import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [type, displayType] = useState("Your Random Type Is...")
  const [onClick] = useState(false)

  useEffect(()=> {
    if (type === "Your Random Type Is...") {
      return;
    }
    const displayType = async() => {
      await getPokemonType()
    }
    displayType()
  }, [onClick])

  const createImg = (name, src) => {
    let div = document.createElement("div")
    let label = document.createElement('label')
    label.innerHTML=name
    let pokemonImg = document.createElement('img')
    pokemonImg.src = src
    pokemonImg.width = 100
    pokemonImg.height = 100
    div.appendChild(pokemonImg)
    div.appendChild(label)
    div.style.display='flex'
    div.style.flexDirection='row'
    div.style.textAlign = 'center'
    document.getElementById('img-container').appendChild(div)
  }

  const getRandomPokemon = async(data) => {
    for (let i=0; i<6; i++) {
      let randomPoke = Math.floor(Math.random()*data.length)
      let name = data[randomPoke]['pokemon']['name']
      let pokemonUrl = data[randomPoke]['pokemon']['url']
      let pokeData = await axios.get(pokemonUrl)
      let img = pokeData.data.sprites['front_default']
      createImg(name, img)
    }
  }

  const getPokemonType = async() => {
    let randomType = Math.floor(Math.random()*20)
    let resp = await axios.get(`https://pokeapi.co/api/v2/type/${randomType}`)
    let data = resp.data.pokemon
    let type = resp.data['name']
    displayType(type)
    getRandomPokemon(data)    
  }

  return (
    <>
      <h1>{type}</h1>
      
        <button onClick={getPokemonType}>Get Random Pokemon Type</button>
        <div id="img-container">

        </div>
    </>
  )
}

export default App
