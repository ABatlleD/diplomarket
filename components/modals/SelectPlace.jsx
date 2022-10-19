import React from 'react'
import { Modal, Fade, Backdrop } from '@mui/material'
import PropTypes from 'prop-types'

function SelectPlace({ openSelectPlace = false, setOpenSelectPlace = () => {} }) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSelectPlace}
        onClose={() => setOpenSelectPlace(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openSelectPlace}>
          <div>Modal</div>
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
