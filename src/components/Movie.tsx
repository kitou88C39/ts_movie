import React from 'react';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

type Props = {
  title: string;
  poster_path: string;
  overview: string;
};

const Movie: React.FC<Props> = ({ title, poster_path, overview }) => {
  return (
    <div className='.flex flex-wrap .m-3 w-80 relative group overflow-hidden'>
      <img
        className='max-w-full pt-10'
        src={IMG_API + poster_path}
        alt={title}
      />
      <div className='movie-info'>
        <h1 className='text-xl font-bold'>『 {title} 』</h1>
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-4 text-white transition ease-in-out delay-300 translate-y-full bg-black group-hover:translate-y-0'>
        <h2 className='text-xl'>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
