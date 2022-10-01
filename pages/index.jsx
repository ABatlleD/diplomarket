import React from 'react'
import MainLayout from '../layouts/MainLayout.jsx'

function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Home
    </h1>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
