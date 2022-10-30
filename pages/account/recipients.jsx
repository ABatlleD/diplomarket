import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'

function Recipients() {
  return (
    <></>
  )
}

Recipients.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Recipients
