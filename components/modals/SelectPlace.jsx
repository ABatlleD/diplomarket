import React, { useState, useEffect } from 'react'
import { Button, Modal, Fade, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import resources from '../../restapi/resources'
import { setCookie } from 'cookies-next'

function SelectPlace({ openSelectPlace = false, setOpenSelectPlace = () => {} }) {
  const [cities, setCities] = useState({})
  const [districts, setDistricts] = useState([])
  const [pivots, setPivots] = useState({})
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')

  useEffect(() => {
    resources.place.city.all()
      .then(response => setCities(response.data))
    resources.place.district.all()
      .then(response => {
        return setPivots(response.data)
      })
  }, [])

  const handleStateChange = (event) => {
    setState(event.target.value)
    const _arr = []
    for (const item of pivots.results) {
      console.log(event.target.value.id === item.provincia)
      if (event.target.value.id === item.provincia) {
        _arr.push(item)
      }
    }
    setDistricts(_arr)
  }

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value)
  }

  const handleSubmit = () => {
    setCookie('NEXT_MUNICIPALITY', district.id)
    setCookie('NEXT_DISTRICT', district.nombre)
    setOpenSelectPlace(false)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSelectPlace}
        onClose={() => setOpenSelectPlace(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openSelectPlace}>
          <div className='flex flex-col shadow-2xl rounded-xl bg-background-100 w-11/12 md:w-2/5 md:mt-4 mx-auto p-2'>
            <div className='flex flex-row justify-end'>
              <HighlightOffIcon className='hover:cursor-pointer' onClick={() => setOpenSelectPlace(false)} />
            </div>
            <div className='flex flex-row justify-center mt-4'>
              <p className='font-bold text-lg text-footer-background-100'>Select the delivery city</p>
            </div>
            <div className='flex flex-row justify-center mt-4'>
              <img src="/delivery-top.png" className="max-w-max h-44 hover:cursor-pointer" alt="..." />
            </div>
            <div className='flex flex-row justify-center mt-4 mx-12'>
              <p className='font-semibold text-footer-background-100 text-justify'>
                The products available for the selected city will be displayed <span className='font-bold'>please note that not all products can be shipped to all cities.</span>
              </p>
            </div>
            <div className='flex flex-row justify-between mx-12 mt-8'>
              <div className='w-[45%]'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    onChange={handleStateChange}
                  >
                    {cities?.results?.map((item) => (
                      <MenuItem key={item.id} value={item}>{item.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='w-[45%]'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">District</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district}
                    label="District"
                    onChange={handleDistrictChange}
                  >
                    {districts?.map((item) => (
                      <MenuItem key={item.id} value={item}>{item.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='mx-12 my-4'>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  backgroundColor: '#ff4a4a !important'
                }}
                onClick={handleSubmit}
              >
                Accept
              </Button>
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
