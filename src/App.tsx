import { useEffect, useState } from 'react';
import Movie from './components/Movie';
import NavBar from './components/NavBar';
import axios from 'axios';
import loading_spinner from './assets/loading_spinner.gif';

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
      <div className='bg-black min-h-screen flex flex-col h-full '>
        <NavBar />
        <div className='w-[250] mt-5 pb-10 font-bold pt-8'>
          <button
            className='bg-white rounded-full px-4 mr-2 hover:border-black border-2 hover:font-bold'
            onClick={() => {
              if (pageNo > 1) setMovies('Loading');
              setPageNo(pageNo - 1);
            }}
          >
            Previous
          </button>
          {pageNo}
          <button
            className='bg-white rounded-full px-4 ml-2 hover:border-black border-2 hover:font-bold'
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
            movies.map((movie: any) => <Movie key={movie.id} {...movie} />)}
        </div>
      </div>
    );
}

export default App;
