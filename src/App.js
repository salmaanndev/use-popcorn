import ErrorMessage from "./components/ErrorMessage";
import ListBox from "./components/ListBox";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import SearchBar from "./components/SearchBar";
import SelectedMovie from "./components/SelectedMovie";
import WatchedBox from "./components/WatchedBox";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import { useEffect, useState } from "react";

export const KEY = "e98e82c0";

function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //const tempQuery = "interstellar"

  /* useEffect(()=>{
     console.log('After initial Render');
   }, [])
 
   useEffect(()=>{
     console.log('After every Render');
   });
 
   console.log('During Render') */

  const handleSelectMovie = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  }

  const handleDeleteWatched = (id) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  

  useEffect(() => {

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal })

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies")
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movies not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (error) {
        
        if (error.name !== "AbortError") {
          console.log(error.message);
          setError(error.message);
        }

      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return
    }

    fetchMovies();
    return function () {
      controller.abort();
    }
  }, [query]);



  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox>
          {selectedId ? <SelectedMovie watched={watched} onAddWatched={handleAddWatched} onClosedMovie={handleCloseMovie} selectedId={selectedId} /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} handleDeleteWatched={handleDeleteWatched} />
            </>}
        </WatchedBox>
      </Main>
    </>
  );
}

export default App;
