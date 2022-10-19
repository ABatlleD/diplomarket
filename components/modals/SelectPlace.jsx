import React from 'react'
import { TextField, Button, Modal, Fade } from '@mui/material'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

function SelectPlace({ openSelectPlace = false, setOpenSelectPlace = () => {} }) {
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
              <div className=''>
              <TextField
                id="outlined-required"
                label="State"
                sx={{
                  width: '100%',
                  borderColor: 'red'
                }}
              />
              </div>
              <div className=''>
              <TextField
                id="outlined-required"
                label="City"
                sx={{
                  width: '100%',
                  borderColor: 'red'
                }}
              />
              </div>
            </div>
            <div className='mx-12 my-4'>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  backgroundColor: '#ff4a4a !important'
                }}
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
