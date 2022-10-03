import React from 'react'
import SearchBar from '../SearchBar'
import AppButton from '../AppButton'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import LockIcon from '@mui/icons-material/Lock'
import { Divider } from '@mui/material'
import LangSelector from './LangSelector'

function BottomOptions() {
  const [t] = useTranslation()

  return (
    <>
      <div className='bg-background-300 flex flex-col md:flex-row md:justify-between p-2 md:p-4'>
        <div className='hidden md:flex'>
          <AppButton
            sx={{
              fontSize: {
                xs: 10,
                sm: 10,
                md: 15
              },
              paddingY: 1,
              paddingX: 1
            }}
            className='bg-button'
          >
            {t('layout.navbar.categories')} <span className='mt-[-1px]'><ArrowForwardIosIcon fontSize='small' /></span>
          </AppButton>
        </div>
        <div className='md:w-[86%]'>
          <SearchBar />
        </div>
        <div className='flex md:hidden flex-row justify-around mt-4'>
          <AppButton
            sx={{
              fontSize: 10,
              paddingY: 1,
              paddingX: 1
            }}
            className='bg-button'
          >
            {t('layout.navbar.categories')} <span className='mt-[-1px]'><ArrowForwardIosIcon fontSize='small' /></span>
          </AppButton>
          <AppButton
            sx={{
              fontSize: 10
            }}
            className='bg-button'
          >
            <span className='mt-[-1px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> Miami <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
          </AppButton>
          <div className='mt-1 mr-[-7px]'>
            <LangSelector />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className='flex flex-row mt-3 ml-1 text-text-100' onClick={() => {}}>
            USD <span className='mt-[-3px]'><LockIcon fontSize='small' /></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomOptions
