import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Headers from './component/Header';
import Movie from './component/Movie';
import Search from './component/Search';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

function App() {
  const [loading , setLoading] = useState(true);
  const [movies , setMovies] = useState([]);
  const [errorMessage , setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL).then(
      response => response.json()
    ).then(jsonResponse => {
      setMovies(jsonResponse.Search);
      setLoading(false);
    });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        setMovies(jsonResponse.Search);
        setLoading(false);
      } else {
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    });
  }

  return (
    <div className="App">
      <Headers text="HOOKED"/>
      {/* Have some doubt  */}
      <Search search={search} />
      <p>Sharing a few of our favourite movies</p>
      <div>
        {loading && !errorMessage ? ( <span>loading...</span>) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          )))}
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
