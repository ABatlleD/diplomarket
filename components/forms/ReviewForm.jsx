/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Grid from "@mui/material/Grid"
import { useCart } from "../../store/cart/cart.context"
import { Checkbox, Tooltip } from "@mui/material"
import usePrice from "../../libs/use-price"
import { checkCart } from "../../libs/check-items"
import Link from "next/link"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useSession } from "next-auth/react"
import { isEmpty } from "../../libs/serialize"
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/router"
import { atom, useAtom } from "jotai"
import resources from "../../restapi/resources"
import { useTranslation } from "react-i18next"
import { useDelivery } from "../../restapi/delivery"
import { useConfig } from "../../restapi/config"
import Bank from "../checkout/Bank"
import HelpIcon from "@mui/icons-material/Help"

import dynamic from "next/dynamic"

const CartItem = dynamic(() => import("../cart/CartItem"))
const DirectPayment = dynamic(() => import("../modals/DirectPayment"))
const ZellePayment = dynamic(() => import("../modals/ZellePayment"))

const errorsAtom = atom(false)

function Review({ address, recipient, sede, activeProvince, activeDistrict }) {
  const { pasarelas, zelle: { descuento_zelle } } = useConfig()
  const [openZelleModal, setOpenZelleModal] = useState(false)
  const [openDirectModal, setOpenDirectModal] = useState(false)
  const [modalData, setModalData] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useAtom(errorsAtom)
  const [isLocationAllowed, setIsLocationAllowed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [check, setCheck] = useState(false)
  const [amountTotal, setAmountTotal] = useState(0)
  const { addressees, countries, municipalities, provinces, typePay } = address
  const [getAddressees] = addressees
  const [getCountries] = countries
  const [getMunicipalities] = municipalities
  const [getProvinces] = provinces
  const [getTypePay] = typePay
  const [currency, setCurrency] = React.useState("USD")
  if (sede) {
    recipient.activo = true
  }
  const activeAddressees = sede
    ? recipient
    : getAddressees.find(({ activo }) => activo === true)
  const activeCountries = getCountries.find(({ isActive }) => isActive === true)
  const activeMunicipalities = sede
    ? activeDistrict
    : getMunicipalities.find(({ isActive }) => isActive === true)
  const activeProvinces = sede
    ? activeProvince
    : getProvinces.find(({ isActive }) => isActive === true)
  const details = {}
  const { push } = useRouter()
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const curr =
        document.cookie.length > 0
          ? document.cookie
              ?.split(";")
              ?.filter((c) => c.trim().split("=")[0] === "NEXT_CURRENCY")[0]
              ?.trim()
              ?.split("=")[1]
          : "USD"
      setCurrency(curr)
    }
    const verifyLocation = async () => {
      const { data } = await axios.get("https://ipapi.co/json")
      if (data.country_name === "Cuba") {
        setIsLocationAllowed(false)
      } else {
        setIsLocationAllowed(true)
      }
    }
    verifyLocation()
  }, [])
  const { items, total, updateItemToCart, isInStock, resetCart } = useCart()
  const free =
    !isEmpty(items) &&
    items?.every((item) => {
      return item?.free_shipping === true
    })
  const { totalDelivery, calculateDelivery } = useDelivery({
    items: checkCart()?.items,
    municipio: activeMunicipalities?.id,
  })
  const deliveryAndTotal = !free ? total + totalDelivery : total

  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency,
    intent: "capture",
  }

  const { t } = useTranslation()

  const { data } = useSession()

  useEffect(() => {
    ;(async () => {
      await calculateDelivery()
    })()
  }, [checkCart()?.total])

  useEffect(() => {
    if (loading && !isEmpty(items)) {
      const cartItems = Promise.all(
        items.map((obj) => resources.products.one(obj?.id))
      ).then((products) => {
        const all = products.map((result) => {
          const producto = result?.data
          const itm = items.filter((item) => {
            if (item?.id === producto?.id && item?.max !== producto?.max) {
              item.max = producto?.max
              item.stock = producto?.cant_inventario
            }
            const { itemTotal, ...restItem } = item
            return restItem
          })
          return itm
        })
        const [product] = all
        return product
      })
      cartItems.then((data) => {
        updateItemToCart(data)
        const stock = items?.map((product) => {
          return isInStock(product?.id)
        })
        if (stock.includes(false)) {
          setError(true)
        } else {
          setError(false)
        }
        setLoading(false)
      })
      let totalAmount = 0
      totalAmount = parseFloat(Number(checkCart()?.total) + totalDelivery)
      if (getTypePay === "paypal") {
        totalAmount = totalAmount + totalAmount * 0.05 + 0.49
      }
      setAmountTotal(parseFloat(totalAmount.toFixed(2)))
    }
  }, [loading, checkCart()?.total, totalDelivery, amountTotal])
  const { price: totalPrice } = usePrice({
    amount: total,
  })

  const termsprivacy = (
    <Link href={'/terminos-privacidad'}>
      <span className='text-footer-background-200 underline hover:cursor-pointer font-bold'>{t('terms-privacy.title')}</span>
    </Link>
  )

  const { price: totalPriceWithDelivery } = usePrice({
    amount: deliveryAndTotal,
    currencyCode: currency,
  })

  const { price: totalPriceWithDeliveryForPaypal } = usePrice({
    amount: deliveryAndTotal + deliveryAndTotal * 0.05 + 0.49,
    currencyCode: currency,
  })

  const { price: totalPriceWithDeliveryForZelle } = usePrice({
    amount: !free ? 
      Number(parseFloat((Number(checkCart()?.total) * (1 - descuento_zelle / 100)) + totalDelivery).toFixed(2)) : 
      Number(parseFloat((Number(checkCart()?.total) * (1 - descuento_zelle / 100))).toFixed(2)),
    currencyCode: currency,
  })

  const { price: totalPriceWithDeliveryAndTax } = usePrice({
    amount: deliveryAndTotal * 0.05 + 0.49,
    currencyCode: currency,
  })

  return (
    <>
      <DirectPayment {...{ openDirectModal, setOpenDirectModal, modalData }} />
      <ZellePayment {...{ openZelleModal, setOpenZelleModal, modalData }} />
      <h6 className="mb-1 text-footer-background-300">
        {t("checkout.review.title")}
      </h6>
      <List disablePadding className="">
        <div className="overflow-auto" style={{ height: "250px" }}>
          {items.length > 0 ? (
            items.map((item, key) => (
              <CartItem
                item={item}
                key={key}
                calculateDelivery={calculateDelivery}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <ListItem
          sx={{
            mt: 2,
            px: 0,
            borderTop: "2px solid #e4e7ea",
            borderBottom: "2px solid #e4e7ea",
            borderLeft: "2px solid #e4e7ea",
            borderRight: "2px solid #e4e7ea",
            paddingX: "4px",
          }}
        >
          <ListItemText primary={t("checkout.review.subtotal")} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice} {currency}
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            py: 1,
            px: 0,
            borderBottom: "2px solid #e4e7ea",
            borderLeft: "2px solid #e4e7ea",
            borderRight: "2px solid #e4e7ea",
            paddingX: "4px",
          }}
        >
          <ListItemText
            primary={
              <p>
                {t("checkout.review.delivery")}
                <Tooltip
                  sx={{ ml: 1 }}
                  title={t("checkout.review.delivery_info")}
                >
                  <HelpIcon />
                </Tooltip>
              </p>
            }
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {typeof totalDelivery === "undefined"
              ? t("loadingMessage")
              : free || totalDelivery === 0
              ? t("free_shipping")
              : Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency || "USD",
                }).format(totalDelivery)}
          </Typography>
        </ListItem>
        {getTypePay === "paypal" && (
          <ListItem
            sx={{
              py: 1,
              px: 0.5,
              borderBottom: "2px solid #e4e7ea",
              borderLeft: "2px solid #e4e7ea",
              borderRight: "2px solid #e4e7ea",
            }}
          >
            <ListItemText primary={t("checkout.review.paypal")} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {typeof totalDelivery === "undefined"
                ? t("loadingMessage")
                : totalPriceWithDeliveryAndTax}{" "}
              {currency}
            </Typography>
          </ListItem>
        )}
        {getTypePay === "zelle" && !!descuento_zelle ? (
          <ListItem
            sx={{
              py: 1,
              px: 0.5,
              borderBottom: "2px solid #e4e7ea",
              borderLeft: "2px solid #e4e7ea",
              borderRight: "2px solid #e4e7ea",
            }}
          >
            <ListItemText primary={t("checkout.review.zelle")} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {descuento_zelle}%
            </Typography>
          </ListItem>
        ) : (<></>)}
        {getTypePay === "paypal" ? (
          <ListItem
            sx={{
              py: 1,
              px: 0.5,
              borderBottom: "2px solid #e4e7ea",
              borderLeft: "2px solid #e4e7ea",
              borderRight: "2px solid #e4e7ea",
            }}
          >
            <ListItemText
              primary={
                <Typography type="body2" style={{ fontWeight: "bold" }}>
                  {t("checkout.review.total")}
                </Typography>
              }
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {typeof totalDelivery === "undefined"
                ? t("loadingMessage")
                : totalPriceWithDeliveryForPaypal}{" "}
              {currency}
            </Typography>
          </ListItem>
        ) : getTypePay === "zelle" ? (
          <ListItem
            sx={{
              py: 1,
              px: 0.5,
              borderBottom: "2px solid #e4e7ea",
              borderLeft: "2px solid #e4e7ea",
              borderRight: "2px solid #e4e7ea",
            }}
          >
            <ListItemText
              primary={
                <Typography type="body2" style={{ fontWeight: "bold" }}>
                  {t("checkout.review.total")}
                </Typography>
              }
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {typeof totalDelivery === "undefined"
                ? t("loadingMessage")
                : totalPriceWithDeliveryForZelle}{" "}
              {currency}
            </Typography>
          </ListItem>
        ) : (
          <ListItem
            sx={{
              py: 1,
              px: 0.5,
              borderBottom: "2px solid #e4e7ea",
              borderLeft: "2px solid #e4e7ea",
              borderRight: "2px solid #e4e7ea",
            }}
          >
            <ListItemText
              primary={
                <Typography type="body2" style={{ fontWeight: "bold" }}>
                  {t("checkout.review.total")}
                </Typography>
              }
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {typeof totalDelivery === "undefined"
                ? t("loadingMessage")
                : totalPriceWithDelivery}{" "}
              {currency}
            </Typography>
          </ListItem>
        )}
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t("checkout.review.delivery_data")}
          </Typography>
          <React.Fragment>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {activeAddressees?.nombre_remitente}{" "}
                {activeAddressees?.apellido1} {activeAddressees?.apellido2}
              </Typography>
              <Typography gutterBottom>
                {activeAddressees?.direccion}
              </Typography>
              <Typography gutterBottom>{activeAddressees?.telefono}</Typography>
              <Typography gutterBottom>{activeAddressees?.email}</Typography>
            </Grid>
          </React.Fragment>
        </Grid>
        {getTypePay !== "banco" && (
          <div className="ZipCode flex flex-row mx-2">
            <Checkbox onChange={() => setCheck(!check)} />
            <p className="text-justify text-footer-background-300 font-semibold mt-[0.6rem]">
              {t("auth.signup.agree")} {termsprivacy}.
            </p>
          </div>
        )}
        <Grid item container direction="column" xs={12}>
          {getTypePay === "banco" && !isEmpty(items) && pasarelas?.banco ? (
            <div className="w-full rounded-lg text-xl font-bold">
              <Bank
                user={data?.user?.name}
                updateCart={setLoading}
                resetCart={resetCart}
                checkCart={checkCart()}
                addressee={[
                  activeAddressees,
                  activeCountries,
                  activeMunicipalities,
                  activeProvinces,
                ]}
                delivery={totalDelivery}
              />
            </div>
          ) : getTypePay === "directo" &&
            !isEmpty(items) &&
            pasarelas?.directo ? (
            <div className="w-full rounded-lg text-xl font-bold">
              <button
                className="rounded-lg"
                onClick={(event) => {
                  event.currentTarget.disabled = true;
                  setLoading(true)
                  axios
                    .post("/api/checkout/checkproducts", {
                      products: checkCart(),
                    })
                    .then((payment) => {
                      if (payment?.data?.failed) {
                        toast.error("Revise los productos de su carrito.")
                      } else {
                        setDisableButton(true)
                        axios
                          .post("/api/addressees", {
                            addressee: [
                              activeAddressees,
                              activeCountries,
                              activeMunicipalities,
                              activeProvinces,
                            ],
                          })
                          .then((saveAddressee) => {
                            if (
                              payment?.data?.failed === false &&
                              saveAddressee.data?.data
                            ) {
                              toast.info(
                                saveAddressee.data.message ??
                                  "Contacte al administrator"
                              )
                              axios
                                .post("/api/checkout/addressees", {
                                  amount: checkCart()?.total,
                                  currency: "USD",
                                  products: checkCart()?.items,
                                  addresses: saveAddressee.data.data,
                                  delivery: totalDelivery,
                                  details,
                                  type: "directo",
                                })
                                .then((payment) => {
                                  const ticket = payment?.data?.data ?? false
                                  const failed = payment?.data?.failed ?? false
                                  if (ticket) {
                                    push(`/payment-direct?notification=${encodeURIComponent(ticket?.whatsapp_notification)}`).then()
                                    resetCart()
                                  } else if (failed) {
                                    toast.error(
                                      "Revise los productos de su carrito."
                                    )
                                  }
                                })
                                .catch(() => {
                                  push("/error/payment").then()
                                })
                            } else {
                              push("/error/payment").then()
                            }
                          })
                          .then()
                      }
                    })
                }}
                disabled={disableButton || loading || !check}
              >
                <img
                  src="/assets/payment/directo/boton-directo.png"
                  className={`bg-white ${
                    !check ? "opacity-30 hover:cursor-not-allowed" : ""
                  }`}
                />
              </button>
            </div>
          ) : getTypePay === "zelle" && !isEmpty(items) && pasarelas?.zelle ? (
            <div className="w-full rounded-lg text-xl font-bold">
              <button
                className="rounded-lg"
                onClick={(event) => {
                  event.currentTarget.disabled = true;
                  setLoading(true)
                  axios
                    .post("/api/checkout/checkproducts", {
                      products: checkCart(),
                    })
                    .then((payment) => {
                      if (payment?.data?.failed) {
                        toast.error("Revise los productos de su carrito.")
                      } else {
                        setDisableButton(true)
                        axios
                          .post("/api/addressees", {
                            addressee: [
                              activeAddressees,
                              activeCountries,
                              activeMunicipalities,
                              activeProvinces,
                            ],
                          })
                          .then((saveAddressee) => {
                            if (
                              payment?.data?.failed === false &&
                              saveAddressee.data?.data
                            ) {
                              toast.info(
                                saveAddressee.data.message ??
                                  "Contacte al administrator"
                              )
                              axios
                                .post("/api/checkout/addressees", {
                                  amount: checkCart()?.total,
                                  currency: "USD",
                                  products: checkCart()?.items,
                                  addresses: saveAddressee.data.data,
                                  delivery: totalDelivery,
                                  details,
                                  type: "zelle",
                                })
                                .then((payment) => {
                                  const ticket = payment?.data?.data ?? false
                                  const failed = payment?.data?.failed ?? false
                                  if (ticket) {
                                    setModalData({
                                      ticket,
                                      total:
                                        (Number(checkCart()?.total) * (1 - descuento_zelle / 100)) +
                                        totalDelivery,
                                    })
                                    setOpenZelleModal(true)
                                    resetCart()
                                  } else if (failed) {
                                    toast.error(
                                      "Revise los productos de su carrito."
                                    )
                                  }
                                })
                                .catch(() => {
                                  push("/error/payment").then()
                                })
                            } else {
                              push("/error/payment").then()
                            }
                          })
                          .then()
                      }
                    })
                }}
                disabled={disableButton || loading || !check}
              >
                <img
                  src="/assets/payment/zelle/boton-zelle.png"
                  className={`bg-white ${
                    !check ? "opacity-30 hover:cursor-not-allowed" : ""
                  }`}
                />
              </button>
            </div>
          ) : getTypePay === "tropipay" &&
            !isEmpty(items) &&
            pasarelas?.tropipay ? (
            <div className="w-full rounded-lg text-xl font-bold">
              <button
                onClick={(event) => {
                  event.currentTarget.disabled = true;
                  setLoading(true)
                  axios
                    .post("/api/checkout/checkproducts", {
                      products: checkCart(),
                    })
                    .then((payment) => {
                      if (payment?.data?.failed) {
                        toast.error("Revise los productos de su carrito.")
                      } else {
                        setDisableButton(true)
                        axios
                          .post("/api/addressees", {
                            addressee: [
                              activeAddressees,
                              activeCountries,
                              activeMunicipalities,
                              activeProvinces,
                            ],
                          })
                          .then((saveAddressee) => {
                            if (
                              payment?.data?.failed === false &&
                              saveAddressee.data?.data
                            ) {
                              toast.info(
                                saveAddressee.data.message ??
                                  "Contacte al administrator"
                              )
                              axios
                                .post("/api/checkout/addressees", {
                                  amount: checkCart()?.total,
                                  currency: "USD",
                                  products: checkCart()?.items,
                                  addresses: saveAddressee.data.data,
                                  delivery: totalDelivery,
                                  details,
                                  type: "tropipay",
                                })
                                .then((payment) => {
                                  const url = payment?.data?.url ?? ""
                                  const failed = payment?.data?.failed ?? false
                                  if (window && url) {
                                    window.open(url, "_blank", "noopener")
                                    push("/").then()
                                    resetCart()
                                  } else if (failed) {
                                    toast.error(
                                      "Revise los productos de su carrito."
                                    )
                                  }
                                })
                            } else {
                              push("/error/payment").then()
                            }
                          })
                          .then()
                      }
                    })
                }}
                disabled={disableButton || loading || !check}
              >
                <img
                  src="/assets/payment/tropipay/boton-tropipay.png"
                  className={`bg-white ${
                    !check ? "opacity-30 hover:cursor-not-allowed" : ""
                  }`}
                />
              </button>
            </div>
          ) : getTypePay === "paypal" &&
            !isEmpty(items) &&
            pasarelas?.paypal ? (
            <div className="w-full rounded-lg text-xl font-bold">
              {isLocationAllowed ? (
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                    }}
                    forceReRender={[amountTotal]}
                    onInit={(data, actions) => {
                      setLoading(true)
                      return axios
                        .post("/api/checkout/checkproducts", {
                          products: checkCart(),
                        })
                        .then((payment) => {
                          if (payment?.data?.failed) {
                            toast.error("Revise los productos de su carrito.")
                            return actions.disable()
                          }
                        })
                    }}
                    onClick={(data, actions) => {
                      setLoading(true)
                      return axios
                        .post("/api/checkout/checkproducts", {
                          products: checkCart(),
                        })
                        .then((payment) => {
                          if (payment?.data?.failed) {
                            toast.error("Revise los productos de su carrito.")
                            return actions.reject()
                          }
                        })
                    }}
                    onShippingChange={(data, actions) => {
                      setLoading(true)
                      return axios
                        .post("/api/checkout/checkproducts", {
                          products: checkCart(),
                        })
                        .then((payment) => {
                          if (payment?.data?.failed) {
                            toast.error("Revise los productos de su carrito.")
                            return actions.reject()
                          }
                        })
                    }}
                    createOrder={(data, actions) => {
                      setLoading(true)
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "" + amountTotal,
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        if (details) {
                          axios
                            .post("/api/addressees", {
                              addressee: [
                                activeAddressees,
                                activeCountries,
                                activeMunicipalities,
                                activeProvinces,
                              ],
                            })
                            .then((saveAddressee) => {
                              if (saveAddressee?.data?.message) {
                                toast.info(
                                  saveAddressee.data.message ??
                                    "Contacte al administrator"
                                )
                                axios
                                  .post("/api/checkout/addressees", {
                                    amount: checkCart()?.total,
                                    currency: "USD",
                                    products: checkCart()?.items,
                                    addresses: saveAddressee.data.data,
                                    details,
                                    delivery: totalDelivery,
                                    type: "paypal",
                                  })
                                  .then((payment) => {
                                    if (payment?.data?.message) {
                                      toast.info(
                                        payment.data.message ??
                                          "Contacte al administrator"
                                      )
                                      setTimeout(() => {
                                        push("/page/payment-success").then()
                                      }, 3000)
                                    } else {
                                      setTimeout(() => {
                                        push("/error/payment").then()
                                      }, 3000)
                                    }
                                  })
                              } else {
                                setTimeout(() => {
                                  push("/error/payment").then()
                                }, 3000)
                              }
                            })
                        }
                      })
                    }}
                    onError={() => {
                      push("/error/payment").then()
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <Typography style={{ color: "#b12024" }}>
                  {t("checkout.review.paypal_error")}
                </Typography>
              )}
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Review
