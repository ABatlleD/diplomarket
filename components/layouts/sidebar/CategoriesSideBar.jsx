import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  return (
    <AnimatePresence>
      {categoriesSideBar && (
        <>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{
              x: '0'
            }}
            exit={{
              x: '-100%'
            }}
            transition={{ type: 'spring', bounce: 0, duration: 1 }}
            className="fixed bg-background-100 text-text-100 shadow-lg top-0 left-0 w-full max-w-sm h-screen p-5"
          >
            <div className='flex flex-row justify-between'>
              <h2 className="text-4xl capitalize leading-loose">Categories</h2>
              <button
                onClick={() => setCategoriesSideBar((categoriesSideBar) => !categoriesSideBar)}
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

CategoriesSideBar.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func
}

export default CategoriesSideBar
