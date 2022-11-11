import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

function CategoriesAccordion({ category, items, handleSubcategoryFilter, handleCategoryFilter }) {
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
          <div className='hover:cursor-pointer hover:underline' onClick={() => { handleCategoryFilter(category.name) }}>
            {category.label}
          </div>
        </AccordionSummary>
        {items.map((item) => (
          <AccordionDetails key={item.name} sx={{
            borderTop: 0,
            fontSize: '0.9rem'
          }}>
            <div className='ml-4 hover:cursor-pointer' onClick={() => handleSubcategoryFilter(item.name)}>
              {item.label}
            </div>
          </AccordionDetails>
        ))}
      </Accordion>
    </>
  )
}

CategoriesAccordion.propTypes = {
  category: PropTypes.string,
  items: PropTypes.array,
  handleSubcategoryFilter: PropTypes.func,
  handleCategoryFilter: PropTypes.func
}

export default CategoriesAccordion
