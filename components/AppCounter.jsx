import React from 'react'
import PropTypes from 'prop-types'
import { PlusIcon } from './icons/plus-icon'
import { MinusIcon } from './icons/minus-icon'
import useWindowSize from '../hooks/WindowSize'

function AppCounter({
  value,
  onDecrement,
  onIncrement,
  disabled
}) {
  const size = useWindowSize()

  return (
    <div className='flex flex-row md:h-6'>
      <div
        className='bg-background-300 rounded-md p-[0.3rem] hover:cursor-pointer hover:opacity-90'
        onClick={onDecrement}
      >
        <MinusIcon
          width={size.width < 768 ? 10 : 20}
          height={size.width < 768 ? 12 : 20}
          className='mt-[0.15rem]'
        />
      </div>
      <p className='text-sm md:text-base w-4 mt-[0.2rem] md:mt-0 md:w-10 text-center'>{value || 0}</p>
      {!disabled && (
        <div
          className='bg-background-300 rounded-md p-[0.3rem] hover:cursor-pointer hover:opacity-90'
          onClick={onIncrement}
        >
          <PlusIcon
            width={size.width < 768 ? 12 : 20}
            height={size.width < 768 ? 12 : 20}
            className='mt-[0.1rem]'
          />
        </div>
      )}
    </div>
  )
}

AppCounter.propTypes = {
  value: PropTypes.number,
  onDecrement: PropTypes.any,
  onIncrement: PropTypes.any,
  disabled: PropTypes.bool
}

export default AppCounter
