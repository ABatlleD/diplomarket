import React, { useState } from 'react'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'

function SignIn() {
  const { t } = useTranslation()

  const [values, setValues] = useState({
    username: '',
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = () => {
    console.log('🚀 ~ file: signin.jsx ~ line 33 ~ handleSubmit ~ values.username', values.username)
  }

  return (
    <>
      <AppHeader title={t('pages.signin')} />
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
            value={values.username}
            onChange={handleChange('username')}
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
        <div className="Submit mb-4 w-11/12 md:w-1/3">
          <Button
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: '#15224b !important'
            }}
            onClick={handleSubmit}
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
