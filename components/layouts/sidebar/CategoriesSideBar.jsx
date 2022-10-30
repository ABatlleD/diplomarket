import React from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import { useTreeCategories } from '../../../restapi/hooks'
import { serialize } from '../../../libs/serialize'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  const { categories, isLoading } = useTreeCategories()
  const menuItems = serialize(categories?.data)

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
        {!isLoading &&
          <div className='m-3'>
            {menuItems.map((item) => (
              <CategoriesAccordion key={item.name} title={item.label} items={item.items} />
            ))}
          </div>
        }
      </Drawer>
    </React.Fragment>
  )
}

CategoriesSideBar.propTypes = {
  categories: PropTypes.object,
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func
}

export default CategoriesSideBar
