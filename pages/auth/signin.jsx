import React from 'react'
import { TextField, Button } from '@mui/material'
import Link from 'next/link'

function SignIn() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
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
        <div className="Password mb-4 w-11/12 md:w-1/3">
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
        <div className="Submit mb-4 w-11/12 md:w-1/3">
          <Button
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: '#15224b !important'
            }}
          >
            Sign In
          </Button>
        </div>
        <div className="Links flex flex-row justify-between w-11/12 md:w-1/3">
          <Link href={'/'}>
            <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Go back</p>
          </Link>
          <div className='flex flex-col'>
            <Link href={'/auth/signup'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Don&apos;t have an account?</p>
            </Link>
            <Link href={'/auth/forgot-password'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Forgot your password?</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
