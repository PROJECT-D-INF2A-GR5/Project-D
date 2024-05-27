import React from 'react'

const Header = () => {
  return (
    <div className='absolute top-0 h-[60px] w-full'>
      <h1 className='text-lg  font-bold cursor-pointer '>
        <a href='/'>
          <img src='\src\assets\logo.png' alt='logo' className='inline-block hover:scale-95' />
        </a>
      </h1>
    </div>
  )
}

export default Header
