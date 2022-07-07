import { useEffect, useState } from 'react';
import Movie from './components/Movie';
import NavBar from './components/NavBar';
import axios from 'axios';
import loading_spinner from './assets/loading_spinner.gif';
import { Link } from 'react-router-dom';

async function getMovies(pageNo: number) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`
  );
  console.log(res.data.results);
  return res.data.results;
}

function App() {
  const [movies, setMovies] = useState('Loading');
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    getMovies(pageNo)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [pageNo]);

  if (movies === 'Loading' || !movies || movies.length === 0)
    return (
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <img src={loading_spinner} alt='loading' height='200px' width='200px' />
      </div>
    );
  else
    return (
      <div className='flex flex-col h-full max-h-screen bg-black '>
        <NavBar />
        <div className='w-[250] mt-5 pb-10 font-bold pt-8'>
          <button
            className='px-4 mr-2 bg-white border-2 rounded-full hover:border-black hover:font-bold'
            onClick={() => {
              if (pageNo > 1) setMovies('Loading');
              setPageNo(pageNo - 1);
            }}
          >
            Previous
          </button>

          <ul>
            {movies.length > 0 &&
              Array.isArray(movies) &&
              movies.length > 0 &&
              movies.map((movie) => (
                <li key={movie.id}>
                  <Link to={movie.id}>{pageNo}</Link>
                </li>
              ))}
          </ul>

          <button
            className='px-4 ml-2 bg-white border-2 rounded-full hover:border-black hover:font-bold'
            onClick={() => {
              if (pageNo > 1000) setMovies('Loading');
              setPageNo(pageNo + 1);
            }}
          >
            Next
          </button>
        </div>
        <div className='box-border bg-black text-white font-sans .m-0 grid grid-cols-5 gap-5 items-center'>
          {movies.length > 0 &&
            Array.isArray(movies) &&
            movies.length > 0 &&
            movies.map((movie: any) => <Movie key={movie.id} {...movie} />)}
        </div>
      </div>
    );
}

export default App;
