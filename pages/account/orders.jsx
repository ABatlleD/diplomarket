import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'

function Orders() {
  return (
    <></>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Orders
