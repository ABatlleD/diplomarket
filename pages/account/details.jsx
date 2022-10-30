import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'

function Details() {
  return (
    <></>
  )
}

Details.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Details
