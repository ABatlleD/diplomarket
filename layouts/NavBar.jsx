import React from 'react'
import TopBar from '../components/layouts/navbar/TopBar'
import BottomOptions from '../components/layouts/navbar/BottomOptions'

function Footer() {
  return (
    <>
      <div className='flex flex-col'>
        <TopBar />
        <BottomOptions />
      </div>
    </>
  )
}

export default Footer
