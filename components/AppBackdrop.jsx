import React from 'react'
import { motion } from 'framer-motion'

function AppBackdrop ({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default AppBackdrop
