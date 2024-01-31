
import Movie from './Movie';


const MovieList = ({movies, onSelectMovie}) => {
    
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID} onSelectMovie={onSelectMovie} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList
