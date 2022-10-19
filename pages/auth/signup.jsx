import React, { useState } from 'react'
import { InputAdornment, IconButton, TextField, Button, Checkbox } from '@mui/material'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function SignUp() {
  const [values, setValues] = useState({
    confirmPassword: '',
    password: '',
    showConfirmPassword: false,
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const privacy = (
    <Link href={'/privacy'}>
      <span className='text-footer-background-200 underline hover:cursor-pointer font-bold'>privacy policy</span>
    </Link>
  )

  const terms = (
    <Link href={'/terms'}>
      <span className='text-footer-background-200 underline hover:cursor-pointer font-bold'>terms of service</span>
    </Link>
  )

  return (
    <>
      <div className='flex flex-col items-center my-4'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
        </div>
        <div className="Fullname mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Fullname"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
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
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            autoComplete="current-password"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
            }}
            sx={{
              width: '100%'
            }}
          />
        </div>
        <div className="ConfirmPassword mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-password-input"
            label="Confirm Password"
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            autoComplete="current-password"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
            }}
            sx={{
              width: '100%'
            }}
          />
        </div>
        <div className="Address mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Address"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="Phone mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Phone"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="Country mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Country"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="State mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="State"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="City mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="City"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="Zip Code mb-4 w-11/12 md:w-1/3">
          <TextField
            id="outlined-required"
            label="Zip Code"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="ZipCode flex flex-row mb-4 w-11/12 md:w-1/3">
          <Checkbox labe />
          <p className='text-justify text-footer-background-100 font-semibold ml-2'>
            By signing up you agree to our {terms} and {privacy}.
          </p>
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
            <Link href={'/auth/signin'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Do you have an account?</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
