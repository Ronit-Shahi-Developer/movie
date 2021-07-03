import "./App.css";
import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


function App() {
const [token, setToken, deleteToken] = useCookies(['mr-token']);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    console.log(`${process.env.REACT_APP_API_URL}`)
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token['mr-token']}`,
      },
    })
      .then((resp) => resp.json()) //convert to json
      .then((resp) => setMovies(resp))
      .catch((error) => console.log(error));
  });


  useEffect(() => {
      
    console.log(token)
     if(!token['mr-token']) window.location.href = '/';
 }, [token])
 
  
  const removeClicked = (movie) =>{
    const newMovies = movies.filter(mov => mov.id !== movie.id); 
    setMovies(newMovies);
    
  }
  const editClicked = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);

  };

  
  const updatedMovie = (movie) => {
    const newMovies= movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  };

  const newMovie =() => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const newMovieCreated = movie => {
    const newMovies = [...movies, movie]
    setMovies(newMovies);


  }

const logoutUser = () =>{
deleteToken(['mr-token']);
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        </header>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      <div className="layout">
        <div>
        <MovieList
          movies={movies}
          movieClicked={loadMovie}
          editClicked={editClicked}
          removeClicked={removeClicked}
        />
        <button onClick={newMovie}> New Movie</button>
</div>
        <MovieDetail movies={selectedMovie} updateMovie={loadMovie} />
        { editedMovie ? 
        <MovieForm movie={editedMovie} updatedMovie={updatedMovie} newMovieCreated={newMovieCreated}/>:null}
      </div>
    </div>
  );
}

export default App;
