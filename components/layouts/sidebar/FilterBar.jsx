import React from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import LangSelector from '../navbar/LangSelector'
import LockIcon from '@mui/icons-material/Lock'
import useWindowSize from '../../../hooks/WindowSize'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AppButton from '../../AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

function FilterBar ({ filterBar = false, setFilterBar = () => {} }) {
  const { t } = useTranslation()
  const size = useWindowSize()

  return (
    <React.Fragment>
      <Drawer
        anchor={'left'}
        open={filterBar}
        onClose={() => setFilterBar(false)}
      >
        <div className='flex flex-row justify-between mx-4 mt-4'>
          <div className='flex mt-3 mr-[-7px]'>
            <LangSelector />
          </div>
          <div
            className='hidden md:flex flex-row mt-4 md:mt-6 ml-1 md:ml-[-10px] text-text-100 xl:text-sm'
            onClick={() => {}}
          >
            USD <span className='mt-[-3px]'><LockIcon fontSize={size.width < 1024 ? 'large' : 'small'} /></span>
          </div>
            <button
              onClick={() => setFilterBar((filterBar) => !filterBar)}
              className="bg-white text-black h-4 w-4 pt-[1.3rem] mr-2 block rounded-full"
            >
              <HighlightOffIcon />
            </button>
        </div>
        <div className='mt-6 mx-4'>
          <AppButton
            sx={{
              fontSize: 15,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: '100%'
            }}
            className='bg-button rounded-full'
          >
            <span className='mt-[-3px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> Miami <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
          </AppButton>
        </div>
          <div className='flex flex-col items-center'>
          <div
            onClick={() => setFilterBar((filterBar) => false)}
            className='mt-8 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/products/all'>
              {t('layout.navbar.allProducts')}
            </Link>
          </div>
          <div
            onClick={() => setFilterBar((filterBar) => false)}
            className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/about'>
              {t('layout.navbar.about')}
            </Link>
          </div>
          <div
            onClick={() => setFilterBar((filterBar) => false)}
            className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/contact'>
              {t('layout.navbar.contact')}
            </Link>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

FilterBar.propTypes = {
  filterBar: PropTypes.bool,
  setFilterBar: PropTypes.func
}

export default FilterBar
