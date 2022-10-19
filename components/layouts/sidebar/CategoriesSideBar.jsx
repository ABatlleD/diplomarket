import React from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CategoriesAccordion from '../../categories/CategoriesAccordion'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  return (
    <React.Fragment>
      <Drawer
        anchor={'left'}
        open={categoriesSideBar}
        onClose={() => setCategoriesSideBar(false)}
      >
        <div className='flex flex-row justify-between m-4'>
          <h2 className="text-4xl text-footer-background-100 capitalize leading-loose">Categories</h2>
          <button
            onClick={() => setCategoriesSideBar((categoriesSideBar) => !categoriesSideBar)}
            className="bg-white text-footer-background-100 h-4 w-4 pt-7 block rounded-full"
          >
            <HighlightOffIcon />
          </button>
        </div>
        <Divider sx={{ bgcolor: '#b12024', marginX: '1rem' }} />
        <div className='m-3'>
          {categories.map((category) => (
            <CategoriesAccordion key={categories.id} title={category.title} items={category.subcategories} />
          ))}
        </div>
      </Drawer>
    </React.Fragment>
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
