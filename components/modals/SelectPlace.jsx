import React, { useState, useEffect } from 'react'
import { Button, Modal, Fade, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import resources from '../../restapi/resources'
import { getCookie, setCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useCart } from '../../store/cart/cart.context'
import { useFav } from '../../store/fav/fav.context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SelectPlace({ openSelectPlace = false, setOpenSelectPlace = () => {} }) {
  const { t } = useTranslation()
  const [cities, setCities] = useState({})
  const [districts, setDistricts] = useState([])
  const [pivots, setPivots] = useState({})
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')

  const {
    resetCart
  } = useCart()
  const {
    resetFav
  } = useFav()

  useEffect(() => {
    const municipality = getCookie('NEXT_MUNICIPALITY')
    const province = getCookie('NEXT_MUNICIPALITY')
    resources.place.city.all()
      .then(response => setCities(response.data))
    resources.place.district.all()
      .then(response => setPivots(response.data))
    if (municipality && province) {
      resources.place.city.one(province)
        .then((response) => {
          setState(response.data)
        })
      resources.place.district.one(municipality)
        .then((response) => {
          setDistrict(response.data)
        })
    }
  }, [])

  const handleStateChange = (event) => {
    resources.place.city.one(event.target.value)
      .then((response) => {
        setState(response.data)
      })
    const _arr = []
    for (const item of pivots.results) {
      if (event.target.value === item.provincia) {
        _arr.push(item)
      }
    }
    setDistricts(_arr)
  }

  const handleDistrictChange = (event) => {
    resources.place.district.one(event.target.value)
      .then((response) => {
        setDistrict(response.data)
      })
  }

  const handleClose = () => {
    if (getCookie('NEXT_MUNICIPALITY')) {
      setOpenSelectPlace(false)
    } else {
      toast.error('Debe seleccionar una ubicación')
    }
  }

  const handleSubmit = () => {
    const municipality = getCookie('NEXT_MUNICIPALITY')
    if (municipality) {
      // eslint-disable-next-line eqeqeq
      if (municipality != district.id) {
        setCookie('NEXT_MUNICIPALITY', district.id)
        setCookie('NEXT_STATE', state.id)
        setCookie('NEXT_DISTRICT', district.nombre)
        resetCart()
        resetFav()
        window.location.reload(false)
      } else {
        setOpenSelectPlace(false)
      }
    } else {
      if (district && district.id) {
        setCookie('NEXT_MUNICIPALITY', district.id)
        setCookie('NEXT_STATE', state.id)
        setCookie('NEXT_DISTRICT', district.nombre)
        resetCart()
        resetFav()
        window.location.reload(false)
      } else {
        toast.error('Debe seleccionar una ubicación')
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSelectPlace}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openSelectPlace}>
          <div className='flex flex-col shadow-2xl rounded-xl bg-background-100 w-11/12 md:w-2/5 md:mt-4 mx-auto p-2'>
            <div className='flex flex-row justify-end'>
              <HighlightOffIcon className='hover:cursor-pointer' onClick={handleClose} />
            </div>
            <div className='flex flex-row justify-center mt-4'>
              <p className='font-bold text-lg text-footer-background-100'>{t('place.title')}</p>
            </div>
            <div className='flex flex-row justify-center mt-4'>
              <img src="/delivery-top.png" className="max-w-max h-44 hover:cursor-pointer" alt="..." />
            </div>
            <div className='flex flex-row justify-center mt-4 mx-12'>
              <p className='font-semibold text-footer-background-100 text-justify'>
              {t('place.subtitle')}
              </p>
            </div>
            <div className='flex flex-row justify-between mx-12 mt-8'>
              <div className='w-[45%]'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('place.state')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.id}
                    label="State"
                    onChange={handleStateChange}
                  >
                    {cities?.results?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='w-[45%]'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('place.district')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district.id}
                    label="District"
                    onChange={handleDistrictChange}
                  >
                    {districts?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='mx-12 my-4'>
              <Link href={'/'}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    backgroundColor: '#ff4a4a !important'
                  }}
                  onClick={handleSubmit}
                >
                  {t('place.accept')}
                </Button>
              </Link>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

SelectPlace.propTypes = {
  openSelectPlace: PropTypes.bool,
  setOpenSelectPlace: PropTypes.func
}

export default SelectPlace
