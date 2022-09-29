import { useEffect, useState } from 'react';
import Movie from './components/Movie';
import NavBar from './components/NavBar';
import axios from 'axios';
import loading_spinner from './assets/loading_spinner.gif';
import ReactPaginate from 'react-paginate';

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
      <div className='flex flex-col h-full max-h-screen bg-black'>
        <NavBar />
        <div className='w-[250] mt-5 pb-10 font-bold pt-8'>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={1000}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={(e) => setPageNo(e.selected + 1)}
            containerClassName={
              'text-white justify-center items-center flex gap-x-5 gap-y-1.5'
            }
            pageClassName={
              'inline-flex justify-center items-center h-10 w-10 text-base font-bold bg-white rounded-full hover:border-black hover:font-bold '
            }
            pageLinkClassName={
              'inline-flex justify-center rounded-full align-middle text-black'
            }
            breakClassName={
              'inline-flex justify-center items-center h-10 w-10 text-base font-bold bg-white rounded-full'
            }
            breakLinkClassName={
              'inline-flex justify-center rounded-full align-middle text-black'
            }
            activeClassName={'bg-green-400'}
          />
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
