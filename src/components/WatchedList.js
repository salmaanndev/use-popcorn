import React from 'react'
import WatchedMovie from './WatchedMovie'


const WatchedList = ({ watched, handleDeleteWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
            ))}
        </ul>
    )
}

export default WatchedList
