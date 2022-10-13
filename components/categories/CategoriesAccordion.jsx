import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

function CategoriesAccordion({ title, items }) {
  return (
    <>
      <Accordion
        sx={{
          backgroundColor: '#f3f4f6',
          boxShadow: 7,
          marginY: 1
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='text-footer-background-200 font-semibold'>
            {title}
          </div>
        </AccordionSummary>
        <Divider />
        {items.map((item) => (
          <AccordionDetails key={item.id}>
            <div className='text-footer-background-200'>
              {item.title}
            </div>
          </AccordionDetails>
        ))}
      </Accordion>
    </>
  )
}

CategoriesAccordion.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
}

export default CategoriesAccordion
