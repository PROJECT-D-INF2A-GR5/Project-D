import React from 'react'
import './Switch.css'

interface  Props{
    spanText: string
    toggleValue: boolean
    onToggle: () => void
}

export const Switch = ({spanText,toggleValue, onToggle }:Props) => {
  return (
    <div>
        <label className='switch'>
            <input type='checkbox' checked={toggleValue} onChange={onToggle}/>
            <span className='slider'/>
        </label>

    </div>
  )
}
