import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

function OrderProductItem({ item, variant }) {
  const { i18n } = useTranslation()
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, rotate: 10 }}
      transition={{ }}
      className={'flex flex-row p-1 text-sm border mt-2 rounded-lg h-24 border-opacity-75'}
    >
      <div className="w-[20%] md:w-24 ml-1 overflow-hidden bg-gray-100 h-full mr-2 shrink-0 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND}${item.image || item.producto.img_principal}`}
          layout='fill'
          placeholder='blur'
          blurDataURL='/loading.gif'
          className='hover:cursor-pointer'
        />
      </div>
      <div className='w-[60%] flex flex-row justify-center h-full items-center'>
        <h3 className="font-bold text-heading text-text-blue">{i18n.language === 'es' ? item.producto.nombre : item.producto.nombre_ingles}</h3>
      </div>
      <div className='flex flex-row w-[24%] h-full items-center'>
        <p>{item.cantidad}X</p>
        <p className="ml-1 font-semibold text-accent text-button">US${parseFloat(item.respaldo).toFixed(2)}</p>
      </div>
    </motion.div>
  )
};

export default OrderProductItem
