import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../components/Pokemon.css';

function Pokemon({pokemonURL}) {
    const [pokemonState, setPokemonState] = useState({});

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const {data} = await axios.get(`${pokemonURL}`);
                console.log(data);
                setPokemonState(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchPokemon();
    }, [])

    return (
        <span className="pokemon-card">
        {Object.keys(pokemonState).length > 0 &&
            <>
                <h1> {pokemonState.forms[0].name} </h1>
                <img src={pokemonState.sprites.front_default} alt="image-pokemon"/>
                <h3> moves: {pokemonState.moves.length} </h3>
                <h3> weight: {pokemonState.weight}</h3>
                <h3> abilities:
                    <ul>
                        {pokemonState.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}-${pokemonState.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>

                </h3>
            </>
        }
       </span>
    );
}

export default Pokemon;
