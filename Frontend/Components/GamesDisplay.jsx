import React from 'react'

import { useState, useEffect } from 'react';

function GamesDisplay() {
    const [games, setGames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    
    const handleGameInfo = async(game) => {
        event.preventDefault()
        try{
            setError(null);
            const response = await fetch(`http://127.0.0.1:8000/game/${game}/`) //use backticks and dollar sign notation for dynamic urls.
            if(!response.ok){ //check to see if the response is valud or not.
                throw new Error('failed to get game information')
            }
            const data = await response.json(); //setting it to a json
            console.log(data);
            setGames(data); //then setting the game field.
        }
        catch(err){
            setError(err.message);
        }
    }

    return (
        <form>
            <h1>This is Game Haven</h1>
            <input type="text" placeholder='Search for a game' onChange={e => setSearch(e.target.value)}/>
            <button onClick={() => handleGameInfo(search)}>Find Game</button>
            {games ?( 
                <>
                <h1>{games.name_original}</h1>
                <h4>Release date: {games.released}</h4>
                <img src={games.background_image} alt={games.name_original} width={350} height={350}></img>
                <p color='white'>{games.description_raw}</p>
                </>
            ): "No games were found"}

        {error && <p>Error: {error}</p>}
        </form>

        
    )


}

export default GamesDisplay