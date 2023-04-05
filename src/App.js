import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from './components/pokemon/Pokemon';
import axios from "axios";
import Button from "./components/button/Button";
import logo from "../src/assets/International_Pokémon_logo.svg.png"

function App(){
   const [pokemon, setPokemon] = useState({});
   const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
   const [error, toggleError] =useState(false);
   const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetch20Pokemons() {
            toggleLoading(true);
            toggleError(false);
            try {
                const result = await axios.get(endpoint);
                console.log(result.data);
                setPokemon(result.data);
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
            toggleLoading(false);
        }
        fetch20Pokemons();
    }, [endpoint])

    return(
        <div className="pokes">
            {pokemon &&
                <>
                    <img alt="pokekom-logo" width="600px" src={logo}/>
            <section className="button-section">
            <Button clickHandler={() => setEndpoint(pokemon.previous)} disabled={!pokemon.previous} > Vorige
            </Button>
            <Button clickHandler={()=> setEndpoint(pokemon.next)} disabled={!pokemon.next}> Volgende
            </Button>
                    </section>
            {pokemon.results && pokemon.results.map((pokemon) => {
                return <Pokemon key={pokemon.name} pokemonURL={pokemon.url}/>
            })}
                </>
            }
            {loading && <p>Pagina is aan het laden....</p>}
            {error && <p>Er ging iets mis bij het ophalen van de Pokemon-data...</p>}
        </div>
    )
}

export default App;