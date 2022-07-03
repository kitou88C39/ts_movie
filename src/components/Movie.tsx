import React from 'react';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

type Props = {
  title: string;
  poster_path: string;
  overview: string;
};

const Movie: React.FC<Props> = ({ title, poster_path, overview }) => {
  return (
    <div className='.flex flex-wrap .m-3 w-80 relative'>
      <img
        className='max-w-full pt-10'
        src={IMG_API + poster_path}
        alt={title}
      />
      <div className='movie-info'>
        <h1 className='font-bold text-xl'>『 {title} 』</h1>
      </div>

      <div className='absolute bg-black  bottom-0 inset-x-0 overflow-auto max-h-full text-white .p-4 translate-y-full'>
        <h2 className='text-xl translate-y-0'>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
