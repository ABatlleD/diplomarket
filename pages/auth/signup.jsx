import React, { useState } from 'react'
import { InputAdornment, IconButton, TextField, Checkbox, Autocomplete, Button } from '@mui/material'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { COUNTRIES } from '../../libs/constants'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import resources from '../../restapi/resources'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layouts/AppHeader'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

function SignUp() {
  const { t } = useTranslation()
  const router = useRouter()
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    confirmPassword: '',
    password: '',
    address: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    terms: false,
    showConfirmPassword: false,
    showPassword: false
  })
  const [fullnameError, setFullnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [cityError, setCityError] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    prop === 'password' ? setPasswordError(false) : setConfirmPasswordError(false)
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

  const checkFieldError = () => {
    if (values.password === values.confirmPassword) {
      setPasswordError(false)
      setConfirmPasswordError(false)
    }
    if (!values.fullname) {
      setFullnameError(true)
    }
    if (!values.email || !values.email.replace(/\s+/g, '').match(emailRegex)) {
      setEmailError(true)
    }
    if (!values.password || values.password !== values.confirmPassword) {
      setPasswordError(true)
    }
    if (!values.confirmPassword || values.password !== values.confirmPassword) {
      setConfirmPasswordError(true)
    }
    if (!values.address) {
      setAddressError(true)
    }
    if (!values.phone) {
      setPhoneError(true)
    }
    if (!values.country) {
      setCountryError(true)
    }
    if (!values.state) {
      setStateError(true)
    }
    if (!values.city) {
      setCityError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!executeRecaptcha) {
      return toast.error('execute-recapcha')
    }
    checkFieldError()
    if (!(
      !!values.email &&
      !!values.fullname &&
      !!values.address &&
      !!values.country &&
      !!values.city &&
      !!values.state &&
      !!values.phone
    )) {
      return toast.error('register-fill-error')
    }
    if (!values.email.replace(/\s+/g, '').match(emailRegex)) {
      return toast.error('Introduzca un email válido.')
    }
    if (values.password !== values.confirmPassword) {
      return toast.error('Las contrasñas no coinciden.')
    }
    const data = {
      name: values.fullname,
      email: values.email,
      password: values.password,
      direccion: values.address,
      pais: values.country,
      ciudad: values.city,
      estado: values.state,
      telefono: values.phone,
      codigo_postal: values.zip,
      is_superuser: false
    }
    resources.auth.signup(data)
      .then((response) => {
        router.push('/auth/signin')
        return toast.success('Usuario guardado satisfactoriamente.')
      })
      .catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.email) {
            return toast.error(error.response.data.email[0])
          }
        } else {
          return toast.error('Ocurrió un error inesperado. Contacte con soporte técnico.')
        }
      })
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
      <AppHeader title={t('pages.signup')} />
      <ToastContainer />
      <div className='flex flex-col items-center my-4'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
        </div>
        <div className="Fullname mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Fullname"
            error={fullnameError}
            onChange={(e) => {
              setValues({
                ...values,
                fullname: e.target.value
              })
              setFullnameError(false)
            }}
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
            type={'email'}
            error={emailError}
            onChange={(e) => {
              setValues({
                ...values,
                email: e.target.value
              })
              setEmailError(false)
            }}
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
            error={passwordError}
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
            error={confirmPasswordError}
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
            error={addressError}
            onChange={(e) => {
              setValues({
                ...values,
                address: e.target.value
              })
              setAddressError(false)
            }}
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="Phone mb-4 w-11/12 md:w-1/3">
        <PhoneInput
          containerStyle={{ borderColor: 'red' }}
          specialLabel={'Phone*'}
          country={'us'}
          value={'1'}
          error={phoneError}
          onChange={(phone) => {
            setValues({
              ...values,
              phone
            })
            setPhoneError(false)
          }}
          inputStyle={{ width: '100%', height: '100%', marginBottom: '1rem' }}
        />
        </div>
        <div className="Country mb-4 w-11/12 md:w-1/3">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={COUNTRIES}
          error={countryError}
          onChange={(e, country) => {
            setValues({
              ...values,
              country
            })
            setCountryError(false)
          }}
          sx={{
            width: '100%',
            color: 'red'
          }}
          renderInput={(params) => <TextField {...params} label="Countrie*" />}
        />
        </div>
        <div className="State mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="State"
            error={stateError}
            onChange={(e) => {
              setValues({
                ...values,
                state: e.target.value
              })
              setStateError(false)
            }}
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
            error={cityError}
            onChange={(e) => {
              setValues({
                ...values,
                city: e.target.value
              })
              setCityError(false)
            }}
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
            type={'number'}
            onChange={(e) => {
              setValues({
                ...values,
                zip: e.target.value
              })
            }}
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
          />
        </div>
        <div className="ZipCode flex flex-row mb-4 w-11/12 md:w-1/3">
          <Checkbox onChange={() => {
            setValues({
              ...values,
              terms: !values.terms
            })
          }} />
          <p className='text-justify text-footer-background-100 font-semibold ml-2'>
            By signing up you agree to our {terms} and {privacy}.
          </p>
        </div>
        <div className="Submit mb-4 w-11/12 md:w-1/3">
          <Button
            variant="contained"
            disabled={!values.terms}
            sx={{
              width: '100%',
              backgroundColor: '#15224b !important'
            }}
            onClick={handleSubmit}
          >
            Sign Up
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
