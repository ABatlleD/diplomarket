import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'

function CartSideBar ({ cartSideBar = false, setCartSideBar = () => {} }) {
  return (
    <AnimatePresence>
      {cartSideBar && (
        <>
          <motion.div
            initial={{ x: '100%' }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{ type: 'spring', bounce: 0, duration: 1 }}
            className="fixed bg-background-100 text-text-100 shadow-lg top-0 right-0 w-full max-w-sm h-screen p-5"
          >
            <div className='flex flex-row justify-between'>
              <h2 className="text-4xl capitalize leading-loose">My Cart</h2>
              <button
                onClick={() => setCartSideBar((cartSideBar) => !cartSideBar)}
                className="bg-white text-black h-4 w-4 pt-7 block rounded-full"
              >
                &times;
              </button>
            </div>
            <Divider />
            <p className="leading-relaxed text-justify mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>
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
