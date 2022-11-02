import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

function CategoriesAccordion({ title, items }) {
  return (
    <>
      <Accordion
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          margin: 0,
          border: 0
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            borderTop: 0,
            fontSize: '0.9rem',
            paddingY: 0,
            margin: 0
          }}
        >
          <div className=''>
            {title}
          </div>
        </AccordionSummary>
        {items.map((item) => (
          <AccordionDetails key={item.name} sx={{
            borderTop: 0,
            fontSize: '0.9rem'
          }}>
            <div className='ml-4'>
              {item.label}
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
