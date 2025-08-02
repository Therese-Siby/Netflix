import React, { useEffect, useState } from 'react'
import { API_KEY, imageURL } from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState()
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                const results = response.data.results;
                const randomIndex = Math.floor(Math.random()* results.length)
                setMovie(results[randomIndex]);
            })
            .catch((error) => {
                console.error("Error fetching banner data:", error);
            });
    }, []);

    return (

        <div 
        style={{
            backgroundImage:movie? `url(${imageURL + movie.backdrop_path})` : ""
        }}
        className='banner'>
            <div className='content'>
                <h1 className='title'>{movie?.title || movie?.name}</h1>
                <div className='banner_buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'> {movie? movie.overview : ''}</h1>
            </div>
            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner