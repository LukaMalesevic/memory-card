import { useState } from 'react';
import Card from './Card';

async function getRandomPokemon(){
  try{
    const response  = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000');
    const data = await response.json();
    const pokemonList = data.results;
    let randomPokemon = getRandomElements(pokemonList, 12);
    randomPokemon.forEach(pokemon => {
        pokemon.show = true;
    });
    return randomPokemon;
  }catch(error){
    console.log('Error fetching data:', error)
  }
}

function getRandomElements(array, count){
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const randomPokemon = await getRandomPokemon();


export default function App(){
    const [currentPokemons, nextPokemons] = useState(randomPokemon);
    const [score, nextScore] = useState(0);
    const [bestScore, nextBestScore] = useState(0);
    return(
        <>
        <h1 className='title'>Pokemon Memory Game</h1>
        <h2 className='rules'>Get points by clicking on an image but dont click on any more than once!</h2>
        <h2 className='score'>Score: {score}</h2>
        <h2 className='best-score'>Best score: {bestScore}</h2>
        <div className='card-container'>
        {currentPokemons.map((pokemon) => <Card score={score} nextScore={nextScore} bestScore={bestScore} nextBestScore={nextBestScore} currentPokemons={currentPokemons} nextPokemons={nextPokemons}
        key={pokemon.name} name={pokemon.name} imageUrl={(pokemon.url)} show={pokemon.show} />)}
        </div>
        </>
    );
}