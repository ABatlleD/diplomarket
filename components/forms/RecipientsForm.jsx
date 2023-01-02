import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import PhoneInput from 'react-phone-input-2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import 'react-phone-input-2/lib/material.css'
import { removeDuplicateObjects } from '../../libs/serialize'
import AddRecipient from '../modals/AddRecipient'
import { useTranslation } from 'react-i18next'

// Alternative Contact

function AddressForm({ address }) {
  const { t } = useTranslation()
  const { addressees, countries, municipalities, provinces } = address
  const [getAddressees, setAddressees] = addressees
  const [getCountries, setCountries] = countries
  const [getMunicipalities, setMunicipalities] = municipalities
  const [getProvinces, setProvinces] = provinces
  const activeAddressees = getAddressees.find(({ activo }) => activo === true)
  const activeCountries = getCountries.find(({ isActive }) => isActive === true)
  const activeMunicipalities = getMunicipalities.find(({ isActive }) => isActive === true)
  const activeProvinces = getProvinces.find(({ isActive }) => isActive === true)
  const [openAddRecipient, setOpenAddRecipient] = useState(false)
  const handleChangeProvinces = (event) => {
    const activeProvincesToFalse = activeProvinces ?? []
    if (activeProvincesToFalse) {
      activeProvincesToFalse.isActive = false
    }
    if (event.target.value) {
      const findActiveProvinces = getProvinces.find(({ name }) => name === event.target.value)
      if (findActiveProvinces) {
        findActiveProvinces.isActive = true
      }
      const provinces = removeDuplicateObjects([...getProvinces, findActiveProvinces], 'name')
      setProvinces(provinces)
    }
  }
  const handleChangeMunicipalities = (event) => {
    const activeMunicipalitiesToFalse = activeMunicipalities ?? []
    if (activeMunicipalitiesToFalse) {
      activeMunicipalitiesToFalse.isActive = false
    }
    if (event.target.value) {
      const findActiveMunicipalities = getMunicipalities.find(({ name }) => name === event.target.value)
      if (findActiveMunicipalities) {
        findActiveMunicipalities.isActive = true
      }
      const municipalities = removeDuplicateObjects([...getMunicipalities, findActiveMunicipalities], 'name')
      setMunicipalities(municipalities)
    }
  }
  const handleChangeCountries = (event) => {
    const activeCountriesToFalse = activeCountries ?? []
    if (activeCountriesToFalse) {
      activeCountriesToFalse.isActive = false
    }
    if (event.target.value) {
      const findActiveCountries = getCountries.find(({ name }) => name === event.target.value)
      if (findActiveCountries) {
        findActiveCountries.isActive = true
      }
      const countries = removeDuplicateObjects([...getCountries, findActiveCountries], 'name')
      setCountries(countries)
    }
  }
  const handleChangeField = (event) => {
    if (event.target.name) {
      activeAddressees[event.target.name] = event.target.value
      const addressees = removeDuplicateObjects([...getAddressees, activeAddressees], 'nombre')
      setAddressees(addressees)
    }
  }
  const handleChangePhoneField = (name, value) => {
    activeAddressees[name] = value
  }
  const handleChangeAddressee = (event) => {
    const activeAddresseesToFalse = activeAddressees ?? {}
    const activeCountriesToFalse = activeCountries ?? []
    const activeMunicipalitiesToFalse = activeMunicipalities ?? []
    const activeProvincesToFalse = activeProvinces ?? []
    if (activeAddresseesToFalse) {
      activeAddresseesToFalse.activo = false
    }
    if (activeCountriesToFalse) {
      activeCountriesToFalse.isActive = false
    }
    if (activeMunicipalitiesToFalse) {
      activeMunicipalitiesToFalse.isActive = false
    }
    if (activeProvincesToFalse) {
      activeProvincesToFalse.isActive = false
    }
    if (event.target.value) {
      const findActive = getAddressees.find(({ nombre }) => nombre === event.target.value)
      findActive.activo = true
      const findActiveCountries = getCountries.find(({ name }) => name === findActive.pais)
      const findActiveMunicipalities = getMunicipalities.find(({ name }) => name === findActive.municipio)
      const findActiveProvinces = getProvinces.find(({ name }) => name === findActive.provincia)
      if (findActiveCountries && findActiveMunicipalities && findActiveProvinces) {
        findActiveCountries.isActive = true
        findActiveMunicipalities.isActive = true
        findActiveProvinces.isActive = true
        const countries = removeDuplicateObjects([...getCountries, findActiveCountries], 'name')
        const municipalities = removeDuplicateObjects([...getMunicipalities, findActiveMunicipalities], 'name')
        const provinces = removeDuplicateObjects([...getProvinces, findActiveProvinces], 'name')
        setCountries(countries)
        setMunicipalities(municipalities)
        setProvinces(provinces)
      }
      const addressees = removeDuplicateObjects([...getAddressees, findActive, activeAddresseesToFalse], 'nombre')
      setAddressees(addressees)
    }
  }

  useEffect(() => {
    if (getAddressees.length < 1) {
      setOpenAddRecipient(true)
    }
  }, [])

  return (
    <>
      <h6 className='mb-2 mt-4'>
        {t('profile.recipients.subtitle')}
      </h6>
        <div className='flex flex-row justify-between mb-4'>
          <div className='flex w-11/12'>
            <FormControl fullWidth>
              <InputLabel id="select-addressee">{t('profile.recipients.name')}</InputLabel>
              <Select
                labelId="select-addressee"
                id="select-addressee"
                name='addressee'
                value={activeAddressees?.nombre ?? ''}
                onChange={handleChangeAddressee}
                label='Address Name'
                fullWidth
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {getAddressees?.map((addressee, _idx) => (
                  <MenuItem value={addressee?.nombre} key={_idx}>{addressee?.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='flex flex-row justify-center w-1/12'>
            <IconButton aria-label="add" size="large" color='error' onClick={() => {
              setOpenAddRecipient(true)
            }}>
              <AddBoxIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      {activeAddressees?.nombre && <div className=''>
          <TextField
            required
            id="firstName"
            sx={{ marginBottom: 2 }}
            name="nombre_remitente"
            label={t('profile.recipients.first')}
            value={activeAddressees?.nombre_remitente ?? ''}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChangeField}
          />
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex md:w-[49%]'>
              <TextField
                required
                id="lastName1"
                sx={{ marginBottom: 2 }}
                name="apellido1"
                label={t('profile.recipients.second')}
                value={activeAddressees?.apellido1 ?? ''}
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleChangeField}
              />
            </div>
            <div className='flex md:w-[49%]'>
              <TextField
                id="lastName2"
                name="apellido2"
                sx={{ marginBottom: 2 }}
                label={t('profile.recipients.last')}
                value={activeAddressees?.apellido2 ?? ''}
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleChangeField}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex md:w-[49%]'>
              <TextField
                id="email"
                name="email"
                sx={{ marginBottom: 2, width: '100%' }}
                label={t('profile.recipients.email')}
                value={activeAddressees?.email ?? ''}
                autoComplete="shipping email1"
                variant="standard"
                onChange={handleChangeField}
              />
            </div>
            <div className='flex md:w-[49%]'>
              <TextField
                required
                id="ci"
                name="ci"
                sx={{ marginBottom: 2, width: '100%' }}
                label='CI'
                value={activeAddressees?.ci ?? ''}
                autoComplete="personal-identification"
                variant="standard"
                onChange={handleChangeField}
              />
            </div>
          </div>
          <div className='mb-4'>
            <PhoneInput
              country={'cu'}
              specialLabel={`${t('profile.recipients.phone')} *`}
              value={activeAddressees?.telefono ?? '53'}
              inputStyle={{ width: '100%', height: '100%' }}
              onChange={(phone) => {
                handleChangePhoneField('telefono', phone)
              }}
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="select-countries">{t('profile.recipients.country')}</InputLabel>
            <Select
              labelId="select-countries"
              id="select-countries"
              sx={{ marginBottom: 2 }}
              value={activeCountries?.name ?? ''}
              onChange={handleChangeCountries}
              label={t('profile.recipients.country')}
              fullWidth
            >
              {getCountries?.map((country, _idx) => (
                <MenuItem value={country.name} key={_idx}>{country?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-provinces">{t('profile.recipients.state')}</InputLabel>
            <Select
              labelId="select-provinces"
              id="select-provinces"
              sx={{ marginBottom: 2 }}
              value={activeProvinces?.name ?? ''}
              onChange={handleChangeProvinces}
              label={t('profile.recipients.state')}
              fullWidth
            >
              {getProvinces?.map((province, _idx) => (
                <MenuItem value={province?.name} key={_idx}>{province?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-municipalities">{t('profile.recipients.city')}</InputLabel>
            <Select
              labelId="select-municipalities"
              id="select-municipalities"
              sx={{ marginBottom: 2 }}
              value={activeMunicipalities?.name ?? ''}
              onChange={handleChangeMunicipalities}
              label={t('profile.recipients.city')}
              fullWidth
            >
              {getMunicipalities?.map((municipality, _idx) => municipality?.provinceId === activeProvinces?.id && (
                <MenuItem value={municipality.name} key={_idx}>{municipality?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="city"
            name="ciudad"
            sx={{ marginBottom: 2 }}
            label={t('profile.recipients.district')}
            value={activeAddressees?.ciudad ?? ''}
            fullWidth
            autoComplete="shipping city"
            variant="standard"
            onChange={handleChangeField}
          />
          <TextField
            required
            id="address1"
            sx={{ marginBottom: 2 }}
            name="direccion"
            label={t('profile.recipients.address')}
            value={activeAddressees?.direccion ?? ''}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleChangeField}
          />
      <h6 className='mt-5'>
      {t('profile.recipients.subtitle2')}:
      </h6>
          <TextField
            id="optionalName"
            name="nombre_alternativo"
            sx={{ marginBottom: 2 }}
            label={t('profile.recipients.optional')}
            value={activeAddressees?.nombre_alternativo ?? ''}
            fullWidth
            autoComplete="given-name-optional"
            variant="standard"
            onChange={handleChangeField}
          />
          <div className='mb-4'>
            <PhoneInput
              country={'cu'}
              specialLabel={`${t('profile.recipients.phone')} *`}
              value={activeAddressees?.telefono_alternativo ?? '53'}
              inputStyle={{ width: '100%', height: '100%' }}
              onChange={(phone) => {
                handleChangePhoneField('telefono_alternativo', phone)
              }}
            />
          </div>
          <TextField
            id="Note"
            name="nota_entrega"
            label={t('profile.recipients.note')}
            multiline
            maxRows={4}
            value={activeAddressees?.nota_entrega ?? ''}
            fullWidth
            onChange={handleChangeField}
          />
      </div>}
      <AddRecipient {...{ openAddRecipient, setOpenAddRecipient, getAddressees, setAddressees }}></AddRecipient>
    </>
  )
}

export default AddressForm
