import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import { AxiosClient } from '../../../config/restapi'
import useSWR from 'swr'
import { ENDPOINTS } from '../../../config/restapi/endpoints'

function CategoriesSideBar ({ categoriesSideBar = false, setCategoriesSideBar = () => {} }) {
  const { data } = useSWR(`${ENDPOINTS.CATEGORIES_TREE}`, fetchCategoriesTree)
  const [categories, setCategories] = useState({})

  useEffect(() => {
    if (data) {
      setCategories(data)
      console.log('🚀 ~ file: CategoriesSideBar.jsx ~ line 18 ~ useEffect ~ data', categories)
    }
  }, [data])

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
          {testCategories.map((category) => (
            <CategoriesAccordion key={category.id} title={category.title} items={category.subcategories} />
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

async function fetchCategoriesTree(url) {
  return await AxiosClient
    .get(url)
    .then(res => res.data)
    .catch(error => {
      console.log('🚀 ~ file: CategoriesSideBar.jsx ~ line 57 ~ fetchCategoriesTree ~ error', error)
    })
}

CategoriesSideBar.propTypes = {
  categories: PropTypes.object,
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func
}

const testCategories = [
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
