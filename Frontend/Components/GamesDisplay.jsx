import React from 'react'

import { useState, useEffect } from 'react';

export default function GamesDisplay() {
    const [games, setGames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    const handleGameInfo = async(game) => {
        try{
            setError(null);
            preventDefault();
            const response = await fetch(`http://localhost:8000/GameHaven/games/${game}`) //use backticks and dollar sign notation for dynamic urls.
            if(!response.ok){ //check to see if the response is valud or not.
                throw new Error('failed to get game information')
            }
            data = response.json(); //setting it to a json
            setGames(data); //then setting the game field.
        }
        catch(err){
            setError(err.message);
        }
    }

//    filtered = ["name_original", "background_image", "released", "updated", "website", "platforms", "stores", "tags", "description_raw"] #The fields I want from the API response

    return (
        <>
            <H1>This is Game Haven</H1>
            <input type="text" placeholder='Search for a game' onChange={handleGameInfo}/>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {games ?( 
                <>
                <h1>{games.name_original}</h1>
                <h4>Release date: {games.released}</h4>
                <p>{games.description}</p>
                <img src={games.background_image} alt={games.name_original}></img>
                </>
            ): "No games were found"}
        </>
    )


}