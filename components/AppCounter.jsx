import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import PropTypes from 'prop-types'

function AppCounter({
  value,
  onDecrement,
  onIncrement,
  disabled
}) {
  return (
    <div className='flex flex-row'>
      <div
        className='bg-background-300 rounded-md p-1 hover:cursor-pointer hover:opacity-90'
        onClick={onDecrement}
      >
        <RemoveIcon />
      </div>
      <p className='text-lg mt-1 font-semibold w-6 md:w-10 text-center'>{value || 0}</p>
      {!disabled && (
        <div
          className='bg-background-300 rounded-md p-1 hover:cursor-pointer hover:opacity-90'
          onClick={onIncrement}
        >
          <AddIcon />
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
