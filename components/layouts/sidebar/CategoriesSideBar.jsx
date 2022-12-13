import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import resources from '../../../restapi/resources'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    resources.categories.all()
      .then(response => setCategories(response.data.results))
  }, [])

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
            {categories.map((item) => (
              <CategoriesAccordion key={item.id} category={item} items={item.subcategorias} />
            ))}
          </div>
      </Drawer>
    </React.Fragment>
  )
}

export default CategoriesSideBar
