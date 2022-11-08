import React from 'react'
import cn from 'classnames'
import { PlusIcon } from '../../components/icons/plus-icon'
import { MinusIcon } from '../../components/icons/minus-icon'
import PropTypes from 'prop-types'

function Counter({
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
        <PlusIcon className="md:w-4.5 h-3.5 w-3.5 stroke-2.5 md:h-4.5" />
      </button>)
        : (<button
        onClick={onDecrement}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '10px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        <span className="sr-only">{t('text-minus')}</span>
        <MinusIcon className="h-3 w-3 stroke-2.5" />
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
        <MinusIcon className="h-3 w-3 stroke-2.5" />
      </button>)
        : (<button
        onClick={onIncrement}
        disabled={disabled}
        style={{ backgroundColor: '#E1E8EE', width: '30px', padding: '6px 8px', height: '30px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
      >
        {/* <span className="sr-only">{t('text-plus')}</span> */}
        <PlusIcon className="md:w-4.5 h-3.5 w-3.5 stroke-2.5 md:h-4.5" />
      </button>)}
    </div>
  )
};

Counter.propTypes = {
  value: PropTypes.number,
  onDecrement: PropTypes.any,
  onIncrement: PropTypes.any,
  variant: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default Counter
