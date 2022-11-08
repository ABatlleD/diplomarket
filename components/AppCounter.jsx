import React from 'react'
import cn from 'classnames'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import PropTypes from 'prop-types'

function AppCounter({
  value,
  onDecrement,
  onIncrement,
  variant,
  className,
  disabled
}) {
  const t = (msg) => {
    return msg
  }

  return (
    <div
      className={cn('flex justify-center align-items-center soverflow-hidden', className)}
    >
      {variant === 'pillVertical'
        ? (<button
        onClick={onIncrement}
        disabled={disabled}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '6px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        <AddIcon />
      </button>)
        : (<button
        onClick={onDecrement}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '10px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        <span className="sr-only">{t('text-minus')}</span>
        <RemoveIcon />
      </button>)}
      <div
        style={{ padding: '0 6px', textAlign: 'center', fontSize: '16px' }}
      >
        {value}
      </div>
      {variant === 'pillVertical'
        ? (<button
        onClick={onDecrement}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '10px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        <span className="sr-only">{t('text-minus')}</span>
        <RemoveIcon />
      </button>)
        : (<button
        onClick={onIncrement}
        disabled={disabled}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '6px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        <AddIcon />
      </button>)}
    </div>
  )
}

AppCounter.propTypes = {
  value: PropTypes.number,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  variant: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default AppCounter
