import React from 'react'

const Author = ({author}) => {
  return (
    <div className='flex mb-8 mt-12 p-4 relative rounded-lg bg-gray-200 shadow-lg'>
        <img 
          alt={author.name}
          height='50px'
          width='50px'
          src={author.photo.url}
          className='align-middle rounded-full'
        />
        <div className='flex align-middle flex-col justify-center ml-4'>
          <h3 className='font-semibold'>{author.name}</h3>
          <p className='font-light text-md text-gray-600'>{author.bio}</p>
        </div>
    </div>
  )
}

export default Author