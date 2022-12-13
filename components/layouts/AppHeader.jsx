import Head from 'next/head'
import React from 'react'

function AppHeader({ title }) {
  return (
    <Head>
      <title>Diplomarket | {title}</title>
    </Head>
  )
}

export default AppHeader
