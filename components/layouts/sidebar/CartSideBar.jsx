import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined'

function CartSideBar ({ cartSideBar = false, setCartSideBar = () => {} }) {
  return (
    <AnimatePresence>
      {cartSideBar && (
        <>
          <div className="flex flex-row">
            <motion.div
              onClick={() => setCartSideBar((cartSideBar) => false)}
              animate={{
                opacity: 0.5
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className='fixed top-0 left-0 w-full h-screen opacity-100'
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{
                x: 0
              }}
              exit={{
                x: '100%'
              }}
              transition={{ type: 'spring', bounce: 0, duration: 1 }}
              className="fixed z-50 bg-background-100 text-text-100 shadow-lg top-0 right-0 w-full max-w-sm h-screen p-5"
            >
              <div className='flex flex-col justify-between h-full'>
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
                  <RemoveShoppingCartOutlinedIcon sx={{ fontSize: '10rem' }} />
                  <h1 className='mt-4 text-2xl font-bold'>NO PRODUCTS</h1>
                </div>
                <div className="flex flex-row justify-between p-2 hover:cursor-pointer rounded-full bg-button mt-4">
                  <h1 className='text-background-100 text-2xl ml-6 mt-1'>Pay</h1>
                  <div className='bg-background-100 py-2 px-4 rounded-full text-lg font-semibold text-button'>
                    $123.45
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

CartSideBar.propTypes = {
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func
}

export default CartSideBar
