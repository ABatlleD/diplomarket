import React from 'react'
import { TextField, Button } from '@mui/material'

function ForgotPassword() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
        </div>
        <div className="Text mb-4 w-11/12 md:w-1/3">
          <p className='text-justify font-bold text-footer-background-100'>Forgot your password? Enter your email address below and we will send you instructions so you can recover your account.</p>
        </div>
        <div className="Email mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Email"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="Submit mb-4 w-11/12 md:w-1/3">
          <Button
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: '#15224b !important'
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
