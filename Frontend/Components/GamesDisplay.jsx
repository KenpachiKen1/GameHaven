import React from 'react'
import { useState, useEffect } from 'react';
import { Input, Form } from 'antd';

function GamesDisplay({games, setGames}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [setGamesDisplay] = useState(null)

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleGameInfo = async(game) => {
        try{
            setError(null);
            const response = await fetch(`http://127.0.0.1:8000/games/game/${game}/`) //use backticks and dollar sign notation for dynamic urls.
            if(!response.ok){ //check to see if the response is valud or not.
                throw new Error('failed to get game information')
            }
            const data = await response.json(); //setting it to a json
            console.log(data);
            setGames(data); //then setting the game field.
            setGamesDisplay(data);
        }
        catch(err){
            setError(err.message);
        }

      
    }

    const updateFavoriteGame = async (game) => {
        try{
            setError(null)
            setLoading(true)
            const response = await fetch(`http://127.0.0.1:8000/games/game/user_favs/${game}/`, {
                method: 'POST',
                body: JSON.stringify({ user: "jackie" }) 
                });
            if(!response.ok){
                setError(true);
                throw new Error("failed to find your favorite game :(");
            }
            const data = await response.json()
            setGames(data)
            setGamesDisplay(data);
        } catch (err){
            setError(err.message)
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Search for your favorite game</h2>
            <Input.Search placeholder='Search' variant='Outlined' onChange={e => setSearch(e.target.value)} onSearch={() => updateFavoriteGame(search)}  styles={{
        input: {
            backgroundColor: 'white',
            color: '#333',
        },
        affixWrapper: {
            backgroundColor: '#f0f8ff',
            borderColor: '#1890ff',
        }
    }}/>
            {games ? (
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <img 
                    src={games.background_image} 
                    alt={games.name_original} 
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '16px',
                    }}
                />
                <div style={{
                    textAlign: 'left'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '0 0 8px 0',
                        color: '#333'
                    }}>
                        {games.name_original}
                    </h1>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        margin: '0 0 16px 0',
                        color: '#666'
                    }}>
                        Release date: {games.released}
                    </h3>
                    <p style={{
                        color: '#444',
                        lineHeight: '1.6',
                        fontSize: '14px',
                        margin: '0'
                    }}>
                        {games.description_raw ? games.description_raw.slice(0, 200) + "...": games.description.slice(0, 200) + "..."}
                    </p>
                </div>
            </div>
            ): ""}
            <h4 style={{paddingTop: 20, textAlign: 'center'}}>Big thanks to RAWG API for all of their game data</h4>
        </div>
    )
}

export default GamesDisplay