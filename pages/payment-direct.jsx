import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@mui/material"
import Router from "next/router"
import { useCart } from "../store/cart/cart.context"
import { useTranslation } from "react-i18next"
import DirectPayImg from "../public/assets/user-message/3221619.png"
import dynamic from "next/dynamic"

import WhatsAppBusinessIcon from '../components/icons/whats-app-business-icon'

const MainLayout = dynamic(() => import("../layouts/MainLayout"))

const PaymentDirect = () => {
    const { t } = useTranslation()
    const { resetCart } = useCart()
    resetCart()
    
    const router = Router.useRouter();
    // Get the query parameter from the URL
    const { notification } = router.query;
    const [whatsappNotification, setWhatsappNotification] = useState(null);

    useEffect(() => {
        if (notification)
            setWhatsappNotification(notification)
    }, [notification])

    return (
        <div className="flex justify-center py-10 mx-5">
            <div className="container max-w-sm">
                <div className="flex flex-wrap justify-center">
                    <div className="mb-3 text-center relative w-32 h-28">
                        <Image src={DirectPayImg} layout="fill" alt="logo" />
                    </div>
                    <div className="w-full text-center mb-4">
                        <h3 className="heading mt-2 mb-1 text-2xl font-bold">
                            {t("pay_direct.title")}
                        </h3>
                    </div>
                    <div className="mt-1 mb-3 text-justify">
                        <p>{t("pay_direct.description")}</p>
                    </div>
                    <a 
                        className="py-[5px] px-3 w-full cursor-pointer inline-flex justify-center items-center gap-2 uppercase border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-dm-red transition-all text-sm"
                        target="_blank"
                        rel="noreferrer"
                        href={whatsappNotification}
                    >
                        <WhatsAppBusinessIcon />
                        {t('direct.notification_order')}
                    </a>
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
                        className="bg-button"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 2, mb: 2 }}
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

PaymentDirect.getLayout = function getLayout(page) {
    return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default PaymentDirect
