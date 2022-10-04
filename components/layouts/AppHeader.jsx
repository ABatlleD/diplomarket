import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

function AppHeader({ title }) {
  return (
    <Head>
      <title>Diplomarket | {title}</title>
    </Head>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string
}

export default AppHeader
