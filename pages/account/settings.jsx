import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'
import { InputAdornment, IconButton, TextField, Button } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AppHeader from '../../components/layouts/AppHeader.jsx'
import { useTranslation } from 'react-i18next'

function Settings() {
  const { t } = useTranslation()

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

  return (
    <>
      <AppHeader title={t('pages.settings')} />
      <div className='flex flex-col'>
        <div className='flex flex-col items-center p-4 mb-8 border-2 border-button rounded-3xl'>
          <p className='font-semibold text-button text-4xl mb-8'>Actualizar a Premium</p>
          <p className='text-xl'>Esta funcionalidad no está disponible por el momento.</p>
        </div>
        <div className='flex flex-col border items-center p-4 rounded-3xl'>
          <p className='font-bold text-2xl text-footer-background-200 mb-8'>Cambiar Contraseña</p>
          <div className='flex flex-col md:flex-row w-full'>
            <div className="Password mr-2 w-11/12 md:w-10/12">
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
            <div className="ConfirmPassword mb-4 ml-2 w-11/12 md:w-10/12">
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
          </div>
          <div className="Submit w-11/12 md:w-1/3">
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#15224b !important'
              }}
            >
              Guardar Nueva Contraseña
            </Button>
        </div>
        </div>
      </div>
    </>
  )
}

Settings.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AccountLayout option={4}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Settings
