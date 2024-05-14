import React from 'react'

const Header = () => {
  return (
    <div className='absolute top-0 h-[60px] w-full bg-white'>
      <h1 className='text-lg  font-bold cursor-pointer '>
        <a href='/'>
          <img src='\src\assets\logo.png' alt='logo' className='inline-block px-2 scale-95 hover:scale-90' />
        </a>
      </h1>
    </div>
  )
}

export default Header
