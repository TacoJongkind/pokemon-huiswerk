import axios from "axios";
import React, { useState, useEffect } from "react";

export default function PokemonCard(props) {
    const [pokemon, setPokemon] = useState(null);

    console.log("WHAT ARE THE PROPS:", props);
    console.log("STATE IN CARD:", pokemon);

    useEffect(() => {
        console.log("fetchnig??");
        async function fetchPokemon() {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${props.nameOfPokemon}`
            );
             console.log("welke data heb ik", response.data); // error?
            setPokemon(response.data);
        }

        fetchPokemon();
    }, []);

    return (
        <div>
            {pokemon ? (
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt=" " />

                    <div>
                        <h3>Moves:</h3>
                        {pokemon.moves.length}
                    </div>
                    <div>
                        <h3>Weight:</h3>
                        {pokemon.weight}
                    </div>
                    <div>
                        <h3>Abilities:</h3>
                        {pokemon.abilities.map((ability) => {
                            console.log("wat zijn de abilities",ability); // { ability: { name: "stomp" }}

                            return <p>{ability.ability.name}</p>;
                        })}
                    </div>

                </div>
            ) : (
                <h3>Loading</h3>
            )}
        </div>
    );
}
