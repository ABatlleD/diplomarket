import React from "react"
import Image from "next/image"
import { Button } from "@mui/material"
import Router from "next/router"
import { useTranslation } from "react-i18next"
import VerifyEmailImg from "../public/assets/user-message/2165310.png"
import dynamic from "next/dynamic"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))

const VerifyEmail = () => {
    const { t } = useTranslation()
    return (
        <div className="flex justify-center py-10 mx-5">
            <div className="container max-w-sm">
                <div className="flex flex-wrap justify-center">
                    <div className="mb-3 text-center relative w-28 h-28">
                        <Image src={VerifyEmailImg} layout="fill" alt="logo" />
                    </div>
                    <div className="w-full text-center mb-4">
                        <h3 className="heading mt-2 mb-1 text-2xl font-bold">
                            {t("verify_email.title")}
                        </h3>
                    </div>
                    <div className="mt-1 mb-3 text-justify">
                        <p>{t("verify_email.description")}</p>
                    </div>
                    <Button
                        className="bg-dm-blue"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, }}
                        onClick={() => {
                          Router.push('/auth/signin');
                        }}
                    >
                        {t("pages.signin")}
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

VerifyEmail.getLayout = function getLayout(page) {
    return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default VerifyEmail
