import React from 'react'
import TopBar from '../components/layouts/TopBar'
import BottomOptions from '../components/layouts/BottomOptions'

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
