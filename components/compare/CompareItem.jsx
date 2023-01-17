import React, { useEffect, useState } from 'react'
import resources from '../../restapi/resources'
import { useCompare } from '../../store/compare/compare.context'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function CompareItem ({ id }) {
  const [product, setProduct] = useState({})
  const { data } = useSession()

  const {
    removeItemFromCompare
  } = useCompare()

  const resizeTitle = (string, maxLength) => {
    return string?.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  useEffect(() => {
    resources.products.one(id)
      .then(response => {
        setProduct(response.data)
      })
  }, [])

  return (
    <>
      <div className='flex flex-col w-full border border-[#d1d1d1] text-footer-background-300 h-[41rem]'>
        <div className='flex flex-row justify-end border-b border-[#d1d1d1] px-2 py-1'>
          <div
            className='hover:cursor-pointer'
            onClick={() => removeItemFromCompare(product.id)}
          >
            <DeleteOutlineIcon color='error' />
          </div>
        </div>
        <div className='flex flex-row items-center border-b text-text-blue border-[#d1d1d1] px-2 py-1 h-16'>{product?.nombre}</div>
        <div className='flex flex-row justify-center relative border-b border-[#d1d1d1] px-2 py-1'>
          {product?.img_principal && (
            <div className='w-full relative flex flex-row justify-center self-center md:mb-1 h-24 md:h-44 2xl:h-60'>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND}${product?.img_principal}`}
                layout='fill'
                alt='Diplomarket product'
                placeholder='blur'
                blurDataURL='/loading.gif'
                className='hover:cursor-pointer rounded-t-lg'
              />
            </div>
          )}
        </div>
        <div className='flex flex-row border-b border-[#d1d1d1] px-2 py-1'>US${parseFloat(data && data.mayorista ? product.precio_b2b : product.precio).toFixed(2)}</div>
        <div className='flex flex-row bg-[#d1d1d1] px-2 py-1'>Descripción del producto</div>
        <div className='flex flex-row items-center border-b border-[#d1d1d1] px-2 py-1 text-sm text-text-100 h-52'>{resizeTitle(product.descripcion, 450)}</div>
        <div className='flex flex-row border-b border-[#d1d1d1] px-2 py-1'>
          {product.cant_inventario === '0' && (
            <p className='font-bold text-[#DC3545]'>Agotado</p>
          )}
          {product.cant_inventario !== '0' && (
            <p className='font-bold text-[#198754]'>Disponible</p>
          )}
        </div>
        <div className='flex flex-row'>{/* Aquí va el botón de añadir al carrito */}</div>
      </div>
    </>
  )
}

export default CompareItem
