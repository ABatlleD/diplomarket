import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PropTypes from 'prop-types'

function AddToCartBtn({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center text-button bg-background-100 justify-center px-3 py-1 text-sm font-semibold transition-colors duration-300 border-2 rounded-full sm:px-5 border-border-100 sm:justify-start text-accent bg-light hover:bg-accent hover:border-accent"
    >
      <ShoppingCartOutlinedIcon />
    </button>
  )
};

AddToCartBtn.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default AddToCartBtn
