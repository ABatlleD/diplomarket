import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

function AppAccordion({ title, text }) {
  return (
    <>
      <Accordion
        sx={{
          backgroundColor: '#f3f4f6',
          boxShadow: 7
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='text-footer-background-200 font-semibold text-lg'>
            {title}
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <div className='text-footer-background-200 font-semibold'>
            {text}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

AppAccordion.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

export default AppAccordion
