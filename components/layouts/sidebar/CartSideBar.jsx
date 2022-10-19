import React from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined'

function CartSideBar ({ cartSideBar = false, setCartSideBar = () => {} }) {
  return (
    <React.Fragment>
      <Drawer
        anchor={'right'}
        open={cartSideBar}
        onClose={setCartSideBar((cartSideBar) => !cartSideBar)}
      >
        <div className='flex flex-col justify-between h-full m-4'>
          <div>
            <div className='flex flex-row justify-between'>
              <h2 className="text-xl font-semibold text-button capitalize leading-loose">0 Products in Cart</h2>
              <button
                onClick={() => setCartSideBar((cartSideBar) => !cartSideBar)}
                className="bg-white text-button h-4 w-4 pt-2 mr-2 block rounded-full"
              >
                <HighlightOffIcon />
              </button>
            </div>
            <Divider sx={{ bgcolor: '#111b3c' }} />
          </div>
          <div className='flex flex-col items-center'>
            <RemoveShoppingCartOutlinedIcon sx={{ fontSize: '10rem', color: '#6e717a' }} />
            <h1 className='mt-4 text-2xl font-bold text-text-100'>NO PRODUCTS</h1>
          </div>
          <div className="flex flex-row justify-between p-2 hover:cursor-pointer rounded-full bg-button mt-4">
            <h1 className='text-background-100 text-2xl ml-6 mt-1'>Pay</h1>
            <div className='bg-background-100 py-2 px-4 rounded-full text-lg font-semibold text-button'>
              $123.45
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

CartSideBar.propTypes = {
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func
}

export default CartSideBar
