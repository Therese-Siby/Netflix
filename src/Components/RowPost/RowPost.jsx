import React from 'react'
import './RowPost.css'
import YouTube from 'react-youtube'
import axios from '../../axios'
import { imageURL} from '../../constants/constants'
import { useEffect, useState } from 'react'
function RowPost(props) {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        axios.get(props.url).then(response=>{
           console.log(response.data);
            setMovies(response.data.results)
        })
        .catch((error)=>{
            console.log("Error appeared",error);
            
        })
    },[])
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
            {movies.map((obj)=>{
                return<img 
                key={obj.id}
                className={props.isSmall? 'smallPoster': 'poster' }
                alt='poster'
                src={`${imageURL+obj.backdrop_path}`} />

    })}
                
                
            </div>
            <YouTube opts={opts} videoId="2g811Eo7K8U" />
        </div>
    )
}

export default RowPost                