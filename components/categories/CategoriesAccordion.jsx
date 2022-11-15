import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

function CategoriesAccordion({ category, items, handleSubcategoryFilter = () => false, handleCategoryFilter = () => false }) {
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
          <div className='hover:cursor-pointer hover:underline' onClick={() => { handleCategoryFilter(category.id) }}>
            {category.nombre}
          </div>
        </AccordionSummary>
        {items.map((item) => (
          <AccordionDetails
            key={item.pk}
            sx={{
              borderTop: 0,
              fontSize: '0.9rem'
            }}
            onClick={() => handleSubcategoryFilter(item.pk)}
          >
            <div className='ml-4 hover:cursor-pointer'>
              {item.nombre}
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
