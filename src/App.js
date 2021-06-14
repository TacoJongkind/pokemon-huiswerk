import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";
import ReactPaginate from 'react-paginate';

function App() {
    const [offset, setOffset] = useState(0);
    const [pokenames, setPokenames] = useState(null);
    const [perPage] = useState(20)
    // useEffect -> api pokemon -> [{ name: "bulbasaur"}, { name: "ivysaur"}]

    useEffect(() => {
        console.log("fetch names here", pokenames);

        async function fetchNames() {
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon"
            );

            console.log("wat zit in response.data.results", response.data.results);
            setPokenames(response.data.results);
        }

        fetchNames();
    }, []);
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    console.log(pokenames);

    return (
        <div>
            {pokenames ? (
                <div>
                    {pokenames.map((pokemon) => {
                        return <PokemonCard nameOfPokemon={pokemon.name} />;
                    })}
                </div>
            ) : (
                <h3>Loading</h3>
            )}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                /*pageCount={pageCount}*/
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        </div>
    );
}

export default App;
