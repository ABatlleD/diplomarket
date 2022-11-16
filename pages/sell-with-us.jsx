import React from 'react'
import MainLayout from '../layouts/MainLayout'

function Contact() {
  return (
    <>
      <div>Sell With Us View</div>
    </>
  )
}

Contact.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Contact
