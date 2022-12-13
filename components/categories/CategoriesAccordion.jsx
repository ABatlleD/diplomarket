import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'

function CategoriesAccordion({ category, items, handleSubcategoryFilter = () => false, handleCategoryFilter = () => false }) {
  const { i18n } = useTranslation()

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
            fontSize: '1rem',
            paddingY: 0,
            margin: 0
          }}
        >
          <div className='hover:cursor-pointer hover:underline' onClick={() => { handleCategoryFilter(category) }}>
            {i18n.language === 'es' ? category.nombre : category.nombre_ingles}
          </div>
        </AccordionSummary>
        {items.map((item) => (
          <AccordionDetails
            key={item.pk}
            sx={{
              borderTop: 0,
              fontSize: '0.9rem'
            }}
            onClick={() => handleSubcategoryFilter(item)}
          >
            <div className='ml-4 hover:cursor-pointer'>
              {i18n.language === 'es' ? item.nombre : item.nombre_ingles}
            </div>
          </AccordionDetails>
        ))}
      </Accordion>
    </>
  )
}

export default CategoriesAccordion
