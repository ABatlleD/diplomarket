import React from "react"
import { motion } from "framer-motion"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { useCart } from "../../store/cart/cart.context"
import usePrice from "../../libs/use-price"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useTranslation } from "react-i18next"

const AppCounter = dynamic(() => import("../AppCounter"))

function CartItem({ item, variant, calculateDelivery }) {
  const { i18n } = useTranslation()
  const currency = "USD"
  const t = (msg) => {
    return msg
  }
  const { price } = usePrice({
    amount: parseFloat(item.price),
    currencyCode: currency,
  })

  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: currency,
  })

  const {
    isInStock,
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart,
    isAvailable,
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
      key={item.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, rotate: 10 }}
      transition={{}}
      className={`flex flex-row p-1 text-sm border mt-4 rounded-lg border-opacity-75 ${
        isNotAvailable ? "bg-[#ff9494]" : ""
      }`}
    >
      {variant === "pillVertical" ? (
        <div className="flex-shrink-0 mr-4">
          <AppCounter
            value={item.quantity}
            onDecrement={handleRemoveClick}
            onIncrement={handleIncrement}
            className={"!block"}
            variant={variant}
            disabled={outOfStock}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="w-3/12 md:w-24 ml-1 overflow-hidden bg-gray-100 mr-2 shrink-0 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND}${
            item.image || item.producto.img_principal
          }`}
          layout="fill"
          placeholder="blur"
          blurDataURL="/loading.gif"
          className="hover:cursor-pointer"
        />
      </div>
      <div className="w-7/12">
        <h3 className="font-bold text-heading text-text-blue">
          {i18n.language === "es"
            ? item.name || item.producto.nombre
            : item.english_name || item.producto.nombre_ingles}
        </h3>
        <p className="my-2.5 font-semibold text-accent text-button">
          US{price}
        </p>
        <span className="text-xs text-body">
          {!variant ? (
            <div className="flex-shrink-0">
              <AppCounter
                value={item.quantity}
                onDecrement={handleRemoveClick}
                onIncrement={handleIncrement}
                disabled={outOfStock}
                className={"justify-start"}
                size={{ width: 11, height: 11 }}
              />
            </div>
          ) : (
            <></>
          )}
          {item.max <= "0" ? (
            <h4 className="font-bold text-heading mt-2">Agotado</h4>
          ) : isNotAvailable ? (
            <h4 className="font-bold text-heading mt-2">
              Rebaje {isNotAvailable ? item.quantity - item.max : ""} unidades
            </h4>
          ) : (
            <></>
          )}
        </span>
      </div>
      <div className="flex flex-col items-end w-2/12 h-[6rem] md:h-[5rem] 2xl:h-[6rem] justify-between">
        <button
          className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full transition-all focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
          onClick={() => clearItemFromCart(item.id)}
        >
          <span className="sr-only mt-[-7px]">{t("text-close")}</span>
          <DeleteOutlineIcon color="error" />
        </button>
        <span className="font-bold text-heading">US{itemPrice}</span>
      </div>
    </motion.div>
  )
}

export default CartItem
