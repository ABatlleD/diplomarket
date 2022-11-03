import React from 'react'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'

function AppPagination() {
  return (
    <div className='flex flex-row'>
      <div className='border'>
        <NavigateBefore />
      </div>
      <div className='border'>1</div>
      <div className='border'>
        <NavigateBefore />
      </div>
    </div>
  )
}

export default AppPagination
