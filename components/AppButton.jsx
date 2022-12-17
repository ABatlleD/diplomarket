import React from 'react'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: '"Josefin Sans", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

function AppButton(props) {
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

export default AppButton
