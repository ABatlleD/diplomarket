import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RecipientsForm from '../forms/RecipientsForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const ciValid = /[0-9]{2}(?:0[0-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}/

function MyAddresses({ address }) {
  const { t } = useTranslation()
  const { addressees, countries, municipalities, provinces } = address
  const [loading, setLoading] = React.useState(false)
  const [getAddressees, setAddressees] = React.useState(addressees)
  const [getCountries, setCountries] = React.useState(countries)
  const [getMunicipalities, setMunicipalities] = React.useState(municipalities)
  const [getProvinces, setProvinces] = React.useState(provinces)
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

  const addressee = {
    addressees: [getAddressees, setAddressees],
    countries: [getCountries, setCountries],
    municipalities: [getMunicipalities, setMunicipalities],
    provinces: [getProvinces, setProvinces]
  }

  const handleNext = async () => {
    setLoading(true)
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
    } else if (!activeCountries && !activeMunicipalities && !activeProvinces) { toast.error('Rellene todos los datos.') } else if (!!activeAddressees.email && !activeAddressees.email.replace(/\s+/g, '').match(emailRegex)) { toast.error('Introduzca un email válido.') } else if (!activeAddressees.ci.match(ciValid)) { toast.error('Introduzca un ci válido.') } else {
      const saveAddressee = await axios.post('/api/addressees', {
        addressee: [
          activeAddressees,
          activeCountries,
          activeMunicipalities,
          activeProvinces
        ]
      })
      toast.info(saveAddressee.data.message ?? 'Contacte al administrator')
    }
    setLoading(false)
  }

  return (
    <>
      <ToastContainer />
        <div className='w-full'>
          <Typography component="h1" variant="h4" align="center">
          {t('profile.recipients.title')}
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <RecipientsForm address={addressee} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  className='bg-button'
                  disabled={loading}
                  color={'error'}
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {t('profile.recipients.submit')}
                </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </div>
    </>
  )
}

MyAddresses.propTypes = {
  address: PropTypes.any
}

export default MyAddresses
