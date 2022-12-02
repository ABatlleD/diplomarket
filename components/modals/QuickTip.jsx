import React from 'react'
import { Modal, Fade } from '@mui/material'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function QuickTip({ openQuickTip = false, setOpenQuickTip = () => {} }) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openQuickTip}
        onClose={() => setOpenQuickTip(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openQuickTip}>
          <div className='flex z-50 flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-1/3 mt-4 md:mt-10 mx-auto p-2'>
            <div className='flex flex-row justify-end mb-6'>
              <HighlightOffIcon className='hover:cursor-pointer' onClick={() => setOpenQuickTip(false)} />
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

QuickTip.propTypes = {
  openQuickTip: PropTypes.bool,
  setOpenQuickTip: PropTypes.func,
  product: PropTypes.object
}

export default QuickTip
