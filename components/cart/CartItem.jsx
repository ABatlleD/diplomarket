import React from 'react'
import { motion } from 'framer-motion'
import AppCounter from '../AppCounter'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useCart } from '../../store/cart/cart.context'
import usePrice from '../../libs/use-price'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import useWindowSize from '../../hooks/WindowSize'

function CartItem({ item, variant, calculateDelivery }) {
  const { i18n } = useTranslation()
  const currency = 'USD'
  const t = (msg) => {
    return msg
  }
  const size = useWindowSize()
  const { price } = usePrice({
    amount: item.price,
    currencyCode: currency
  })

  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: currency
  })

  const {
    isInStock,
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart,
    isAvailable
  } = useCart()

  async function handleIncrement(e) {
    e.stopPropagation()
    addItemToCart(item, 1)
    try {
      await calculateDelivery()
    } catch (err) {}
  }
  const handleRemoveClick = async (e) => {
    e.stopPropagation()
    removeItemFromCart(item.id)
    try {
      await calculateDelivery()
    } catch (err) {}
  }
  const outOfStock = !isInStock(item.id)
  const isNotAvailable = !isAvailable(item.id)
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      className={`flex items-center py-1 text-sm bg-background-300 mt-4 rounded-lg justify-around border-opacity-75 ${
        isNotAvailable ? 'bg-red-100' : ''
      }`}
    >
      {variant === 'pillVertical'
        ? (
        <div className="flex-shrink-0 mr-4">
          <AppCounter
            value={item.quantity}
            onDecrement={handleRemoveClick}
            onIncrement={handleIncrement}
            className={'!block'}
            variant={variant}
            disabled={outOfStock}
          />
        </div>
          )
        : (
        <></>
          )}

      <div className="w-16 md:w-28 ml-1 overflow-hidden bg-gray-100 mr-2 shrink-0 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND}${item.image}`}
          width={size.width < 768 ? 80 : 180}
          height={size.width < 768 ? 90 : 200}
          placeholder='blur'
          blurDataURL='/loading.gif'
          className='hover:cursor-pointer'
        />
      </div>
      <div>
        <h3 className="font-bold text-heading">{i18n.language === 'es' ? item.name : item.english_name}</h3>
        <p className="my-2.5 font-semibold text-accent">{price} {currency}</p>
        <span className="text-xs text-body">
          {!variant
            ? (
            <div className="flex-shrink-0">
              <AppCounter
                value={item.quantity}
                onDecrement={handleRemoveClick}
                onIncrement={handleIncrement}
                disabled={outOfStock}
                className={'justify-start'}
              />
            </div>
              )
            : (
            <></>
              )}
          {item.max <= '0'
            ? (
            <h4 className="font-bold text-heading mt-2">Agotado</h4>
              )
            : isNotAvailable
              ? (
            <h4 className="font-bold text-heading mt-2">
              Rebaje {isNotAvailable ? item.quantity - item.max : ''} unidades
            </h4>
                )
              : (
            <></>
                )}
        </span>
      </div>
      <div className='flex flex-col items-end h-[4.7rem] justify-between'>
        <button
          className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full transition-all focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
          onClick={() => clearItemFromCart(item.id)}
        >
          <span className="sr-only mt-[-7px]">{t('text-close')}</span>
          <HighlightOffIcon />
        </button>
        <span className="font-bold text-heading">{itemPrice} {currency}</span>
      </div>
    </motion.div>
  )
};

CartItem.propTypes = {
  item: PropTypes.any,
  variant: PropTypes.string,
  calculateDelivery: PropTypes.func
}

export default CartItem
