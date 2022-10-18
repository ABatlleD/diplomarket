import React from 'react'
import TextField from '@mui/material/TextField'

function SignIn() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-24 hover:cursor-pointer" alt="..." />
        </div>
        <div className="Email mb-4 w-1/3">
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
        <div className="Password mb-4 w-1/3">
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{
              width: '100%'
            }}
          />
        </div>
        <div className="Submit"></div>
        <div className="Links"></div>
      </div>
    </>
  )
}

export default SignIn
