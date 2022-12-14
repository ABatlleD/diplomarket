import React from 'react'
import { PlusIcon } from './icons/plus-icon'
import { MinusIcon } from './icons/minus-icon'

function AppCounter({
  value,
  onDecrement,
  onIncrement,
  disabled,
  size
}) {
  return (
    <div className='flex flex-row'>
      <div
        className='bg-background-300 rounded-md p-[0.3rem] hover:cursor-pointer hover:opacity-90'
        onClick={onDecrement}
      >
        <MinusIcon
          width={size?.width || 21}
          height={size?.height || 21}
          className='mt-[0.15rem]'
        />
      </div>
      <p className={`text-sm md:text-base ${size?.width < 20 ? 'mt-[0.1rem]' : 'mt-[0.5rem]'} text-center ${size?.width < 15 ? 'md:w-10 w-4' : 'md:mt-[0.4rem] md:w-10 w-8'}`}>{value || 0}</p>
      {!disabled && (
        <div
          className='bg-background-300 rounded-md p-[0.3rem] hover:cursor-pointer hover:opacity-90'
          onClick={onIncrement}
        >
          <PlusIcon
            width={size?.width || 21}
            height={size?.height || 21}
            className='mt-[0.1rem]'
          />
        </div>
      )}
    </div>
  )
}

export default AppCounter
