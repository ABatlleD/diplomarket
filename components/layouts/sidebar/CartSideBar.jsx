import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import { Divider } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined'
import { useCart } from '../../../store/cart/cart.context'
import usePrice from '../../../libs/use-price'
import { t } from 'i18next'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const CartItem = dynamic(() => import('../../cart/CartItem'))

function CartSideBar ({ cartSideBar = false, setCartSideBar = () => {} }) {
  const currency = 'USD'

  const { items, totalUniqueItems, total } = useCart()

  const { price: totalPrice } = usePrice({
    amount: total,
    currencyCode: currency
  })

  useEffect(() => {
    if (cartSideBar)
      document.body.classList.add('cart-open')
    else
      document.body.classList.remove('cart-open')
  }, [cartSideBar]);

  return (
    <React.Fragment>
      <Drawer
        anchor={'right'}
        open={cartSideBar}
        onClose={() => setCartSideBar(false)}
      >
        <div className='flex flex-col relative justify-between h-full m-4'>
          <div className='relative'>
            <div className='flex flex-row justify-between'>
              <h2 className="text-xl font-semibold text-button leading-loose">{totalUniqueItems === 0 ? t('cart.no') : totalUniqueItems} {t('cart.total')}</h2>
              <button
                onClick={() => setCartSideBar((cartSideBar) => !cartSideBar)}
                className="bg-white text-button h-4 w-4 pt-2 mr-2 block rounded-full"
              >
                <HighlightOffIcon />
              </button>
            </div>
            <Divider sx={{ bgcolor: '#111b3c' }} />
            {items.length > 0 && (
              <AnimatePresence>
                {
                  items.map((item) =>
                  <div key={item.id}>
                    <CartItem item={item} />
                  </div>)
                }
              </AnimatePresence>
            )}
          </div>
          {items.length <= 0 && (
            <div className='flex flex-col items-center'>
              <RemoveShoppingCartOutlinedIcon sx={{ fontSize: '10rem', color: '#6e717a' }} />
              <h1 className='mt-4 text-2xl font-bold text-text-100'>{t('cart.no-products')}</h1>
            </div>
          )}
          <Link href={'/checkout/'}>
            <div className="flex flex-row justify-between p-2 hover:cursor-pointer rounded-full bg-button mt-4" onClick={() => setCartSideBar(false)}>
              <h1 className='text-background-100 text-2xl ml-6 mt-1'>{t('cart.pay')}</h1>
              <div className='bg-background-100 py-2 px-4 rounded-full text-lg font-semibold text-button'>
                {totalPrice} {currency}
              </div>
            </div>
          </Link>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default CartSideBar
