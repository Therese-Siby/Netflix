import React from 'react'
import './RowPost.css'
import YouTube from 'react-youtube'
import axios from '../../axios'
import { imageURL,API_KEY} from '../../Constants/Constants'
import { useEffect, useState } from 'react'
function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [URLid,setURLid] = useState('')
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
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const handleMovie = (id) => {
  console.log(id);
  axios
    // .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
.get(`/tv/${id}/videos?api_key=${API_KEY}&language=en-US`)

    .then((response) => {
        if(response.data.results.length!==0){
             setURLid(response.data.results[0].key);
        } else {
        console.log("No video available");
      }

    });
};

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
            {movies.map((obj)=>{
                return<img onClick={()=>handleMovie(obj.id)}
                key={obj.id}
                className={props.isSmall? 'smallPoster': 'poster' }
                alt='poster'
                src={`${imageURL+obj.backdrop_path}`} />

    })}
                
                
            </div>
{ URLid && <YouTube opts={opts} videoId={URLid} /> }
        </div>
    )
}

export default RowPost                