import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CategoriesAccordion from '../../categories/CategoriesAccordion'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  return (
    <AnimatePresence>
      {categoriesSideBar && (
        <>
          <div className="flex flex-row absolute">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{
                x: 0
              }}
              exit={{
                x: '-100%'
              }}
              transition={{ type: 'spring', bounce: 0, duration: 1 }}
              className="fixed z-50 bg-background-100 text-text-100 shadow-lg top-0 left-0 w-full max-w-sm h-full p-5"
            >
              <div className='flex flex-row justify-between'>
                <h2 className="text-4xl text-footer-background-100 capitalize leading-loose">Categories</h2>
                <button
                  onClick={() => setCategoriesSideBar((categoriesSideBar) => !categoriesSideBar)}
                  className="bg-white text-footer-background-100 h-4 w-4 pt-7 block rounded-full"
                >
                  <HighlightOffIcon />
                </button>
              </div>
              <Divider sx={{ bgcolor: '#b12024' }} />
              <div className='mt-8'>
                {categories.map((category) => (
                  <CategoriesAccordion key={categories.id} title={category.title} items={category.subcategories} />
                ))}
              </div>
            </motion.div>
            <motion.div
              onClick={() => setCategoriesSideBar((categoriesSideBar) => false)}
              animate={{
                opacity: 0.5
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className='absolute top-0 right-0 w-full h-screen opacity-100'
            />
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

CategoriesSideBar.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func
}

const categories = [
  {
    id: 1,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      },
      {
        id: 2,
        title: 'Subcategory 2'
      },
      {
        id: 3,
        title: 'Subcategory 3'
      }
    ]
  },
  {
    id: 2,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      }
    ]
  },
  {
    id: 3,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      },
      {
        id: 2,
        title: 'Subcategory 2'
      },
      {
        id: 3,
        title: 'Subcategory 3'
      }
    ]
  },
  {
    id: 4,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      },
      {
        id: 2,
        title: 'Subcategory 2'
      }
    ]
  },
  {
    id: 5,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      }
    ]
  },
  {
    id: 6,
    title: 'Category 1',
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1'
      },
      {
        id: 2,
        title: 'Subcategory 2'
      }
    ]
  }
]

export default CategoriesSideBar
