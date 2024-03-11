import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

Card.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    nextScore: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
    nextBestScore: PropTypes.func.isRequired,
    nextPokemons: PropTypes.func.isRequired,
    currentPokemons: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired
}

async function getImage(imageUrl){
    try {
        const response = await fetch(imageUrl);
        const data = await response.json();
        const url = data.sprites.front_default;
        return url;
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
}

export default function Card(props){
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);


    function handleClickEvent(show, name){
        if(!show){
            props.nextScore(0);
            let newPokemonArray = [...props.currentPokemons];
            newPokemonArray.forEach(element => element.show = true);
            newPokemonArray.sort(() => Math.random() - 0.5);
            props.nextPokemons(newPokemonArray);

        }else{
            let score = props.score;
            score++;
            props.nextScore(score);
            if(score > props.bestScore) props.nextBestScore(score);
            let newPokemonArray = [...props.currentPokemons];
            newPokemonArray.forEach(element => {
                if(element.name === name) return element.show = false;
            });
            newPokemonArray.sort(() => Math.random() - 0.5);
            props.nextPokemons(newPokemonArray);
        }
    }
    
    useEffect(() => {
        async function fetchImage() {
            const url = await getImage(props.imageUrl);
            setBackgroundImageUrl(url);
        }
        fetchImage();
    }, [props.imageUrl]);

    const styleBg = {
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none'
    };

    return(
      <div className='card' onClick={(e) => handleClickEvent(props.show, props.name, e)}>
        <div className='picture-box' style={styleBg}></div>
        <h1 className='pokemon-name'>{props.name}</h1>
      </div>
    );
}
