import React, { useEffect, useState } from 'react'
import { KEY } from '../App'
import StarRating from './StarRating';
import Loader from './Loader';

const SelectedMovie = ({ selectedId, onClosedMovie, onAddWatched, watched }) => {

    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        }
        onAddWatched(newWatchedMovie);
        onClosedMovie();
    }

    useEffect(()=>{
        const callBack = (e) => {
            if(e.code === 'Escape') {
              onClosedMovie();
            }
        }

        document.addEventListener('keydown', callBack);

        return function() {
            document.removeEventListener('keydown', callBack);
        }

      }, [onClosedMovie])

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();

    }, [selectedId])

    useEffect(()=>{
        document.title = `Movie | ${title}`;
        return function() {
            document.title = 'usePopCorn';
        }
    }, [title])

    return (
        <div className='details'>
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className='btn-back' onClick={() => onClosedMovie()}>&larr;</button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            {!isWatched ?
                                (
                                    <>
                                        <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                                        {userRating > 0 && (<button className='btn-add' onClick={handleAdd}>+ Add to List</button>)}
                                    </>
                                )
                                : (
                                    <p>You rated with movie {watchedUserRating} ⭐</p>
                                )}
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }

        </div>
    )
}

export default SelectedMovie
