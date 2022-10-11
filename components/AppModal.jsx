import React from 'react'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function AppModal(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant='contained' color='error' {...props}>
          {props.children}
        </Button>
      </ThemeProvider>
    </>
  )
}

AppModal.propTypes = {
  props: PropTypes.node,
  children: PropTypes.any
}

export default AppModal