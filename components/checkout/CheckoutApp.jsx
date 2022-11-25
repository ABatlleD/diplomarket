import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddressForm from '../forms/RecipientsForm'
import PaymentForm from '../forms/PaymentForm'
import Review from '../forms/ReviewForm'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../store/cart/cart.context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { isEmpty } from '../../libs/serialize'
import PropTypes from 'prop-types'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://diplomarket.com/">
        Diplomarket™
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const ciValid = /[0-9]{2}(?:0[0-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}/

function Checkout({ address }) {
  const { t } = useTranslation()
  const steps = [
    `${t('deliveryAddress')}`,
    `${t('paymentMethod')}`,
    `${t('pay')}`
  ]

  const { addressees, countries, municipalities, provinces, municipality_id } =
    address
  const { items } = useCart()
  const [getTypePay, setTypePay] = useState('paypal')
  const [getAddressees, setAddressees] = useState(addressees)
  const [getCountries, setCountries] = useState(countries)
  const [getMunicipalities, setMunicipalities] = useState(municipalities)
  const [getProvinces, setProvinces] = useState(provinces)
  const activeAddressees = getAddressees?.find(({ activo }) => activo === true)
  const activeCountries = getCountries?.find(
    ({ isActive }) => isActive === true
  )
  const activeMunicipalities = getMunicipalities?.find(
    ({ isActive }) => isActive === true
  )
  const activeProvinces = getProvinces?.find(
    ({ isActive }) => isActive === true
  )

  const [activeStep, setActiveStep] = useState(0)

  const addressee = {
    addressees: [getAddressees, setAddressees],
    countries: [getCountries, setCountries],
    municipalities: [getMunicipalities, setMunicipalities],
    provinces: [getProvinces, setProvinces],
    typePay: [getTypePay, setTypePay]
  }

  const handleNext = () => {
    if (!activeAddressees) toast.error('Seleccione el destinatario.')
    else if (
      !(
        !!activeAddressees.nombre_remitente &&
        !!activeAddressees.apellido1 &&
        !!activeAddressees.ci &&
        !!activeAddressees.telefono &&
        !!activeAddressees.direccion
      )
    ) {
      toast.error('Rellene todos los datos.')
    // eslint-disable-next-line eqeqeq
    } else if (!activeCountries && !activeMunicipalities && !activeProvinces) { toast.error('Rellene todos los datos.') } else if (activeMunicipalities?.id != municipality_id) {
      toast.error(
        'El municipio y provincia del destinatario debe coincidir con la ubicación de entrega.'
      )
    } else if (!!activeAddressees.email && !activeAddressees.email.replace(/\s+/g, '').match(emailRegex)) { toast.error('Introduzca un email válido.') } else if (!activeAddressees.ci.match(ciValid)) { toast.error('Introduzca un ci válido.') } else if (isEmpty(items)) toast.error('Su carrito esta vacío.')
    else setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm address={addressee} />
      case 1:
        return <PaymentForm address={addressee} />
      case 2:
        return <Review address={addressee} />
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <div
          className='md:border md:rounded-3xl md:border-text-200 my-6 md:my-12 p-4 md:p-6'
        >
          <Typography component="h1" variant="h4" align="center">
            {t('checkout.title')}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length
              ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #000000001. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
                )
              : (
              <React.Fragment>
                {getStepContent(activeStep, addressee)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      {t('checkout.back')}
                    </Button>
                  )}
                  {activeStep === steps.length - 1
                    ? (
                    <></>
                      )
                    : (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'rgb(177, 32, 36)' }}
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {t('checkout.next')}
                    </Button>
                      )}
                </Box>
              </React.Fragment>
                )}
          </React.Fragment>
        </div>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}

Checkout.propTypes = {
  address: PropTypes.any
}

export default Checkout
