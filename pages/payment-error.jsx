import React, { useState, useEffect } from "react"
import Image from "next/image"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Button } from "@mui/material"
import Router from "next/router"
import { useCart } from "../store/cart/cart.context"
import { useTranslation } from "react-i18next"
import ErrorPayImg from "../public/assets/user-message/105614.png"
import dynamic from "next/dynamic"

import resources from '../restapi/resources'
import WhatsAppBusinessIcon from '../components/icons/whats-app-business-icon'
import parsePhoneNumber from 'libphonenumber-js'

const MainLayout = dynamic(() => import("../layouts/MainLayout"))

const PaymentError = () => {
    const { t } = useTranslation()
    const { resetCart } = useCart()
    resetCart()

    const [anchorElAccount, setAnchorElAccount] = useState(null)
    const [whatsapps, setWhatsapps] = useState([])

    const handleOpenAccountMenu = (event) => {
        if (whatsapps.length !== 0)
            setAnchorElAccount(event.currentTarget)
    }

    const handleCloseAccountMenu = () => {
        if (whatsapps.length !== 0)
            setAnchorElAccount(null)
    }

    useEffect(() => {
        const answer = []
        resources.contacts.get().then((response) => {
            response.data.results.map((item) =>
                item.tipo === 'whatsapp' ? answer.push(item) : true
            )
            setWhatsapps(answer)
        })
    }, [])

    return (
        <div className="flex justify-center py-10 mx-5">
            <div className="container max-w-sm">
                <div className="flex flex-wrap justify-center">
                    <div className="mb-3 text-center relative w-28 h-28">
                        <Image src={ErrorPayImg} layout="fill" alt="logo" />
                    </div>
                    <div className="w-full text-center mb-4">
                        <h3 className="heading mt-2 mb-1 text-2xl font-bold">
                            {t("pay_error.title")}
                        </h3>
                    </div>
                    <div className="mt-1 mb-3 text-justify">
                        <p>{t("pay_error.description")}</p>
                    </div>
                    <Button
                        className="bg-dm-blue"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => {
                          Router.push("/account/orders")
                        }}
                    >
                        {t("view_orders")}
                    </Button>
                    <Button
                        className="bg-dm-blue"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 2, mb: 2 }}
                        onClick={handleOpenAccountMenu}
                    >
                        {t("support")}
                    </Button>
                    <Menu
                      sx={{ mt: '30px' }}
                      id='Customer-menu'
                      anchorEl={anchorElAccount}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                      open={Boolean(anchorElAccount)}
                      onClose={handleCloseAccountMenu}
                    >
                        {whatsapps.map((item) => (
                          <MenuItem
                            key={item.id}
                          >
                            <a className="flex gap-x-1 text-lg font-bold items-center hover:underline" href={`https://api.whatsapp.com/send?phone=${item.contenido}&text=Hola,%20Diplomarket%E2%84%A2`}>
                              <WhatsAppBusinessIcon />
                              {parsePhoneNumber(
                                `+${item.contenido}`
                              )?.formatInternational()}
                            </a>
                          </MenuItem>
                        ))}
                    </Menu>
                    <Button
                        className="bg-button"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mb: 2 }}
                        onClick={() => {
                            Router.push("/")
                        }}
                    >
                        {t("back")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

PaymentError.getLayout = function getLayout(page) {
    return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default PaymentError
