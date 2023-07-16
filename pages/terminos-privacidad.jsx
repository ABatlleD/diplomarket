
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import localFont from "@next/font/local"
import DOMPurify from "isomorphic-dompurify"
import resources from '../restapi/resources'

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))

const arial = localFont({ src: "../public/assets/font/arial/Arial.ttf" })

function TermAndPrivacy() {
  const { t, i18n } = useTranslation()
  const [termsprivacy, setTermsprivacy] = useState({})
  
  useEffect(() => {
    resources.termsprivacy
      .all()
      .then((response) => setTermsprivacy(response.data))
  }, [])

  return (
    <>
      <AppHeader title={t("terms-privacy.title")} />
      <main className={arial.className}>
        <div className="flex flex-col gap-4 mt-8 mb-8 xl:mb-24 mx-4 xl:mx-44 2xl:mb-96">
          <h1 className="font-bold text-center text-lg md:text-2xl text-footer-background-300">
            {t("terms-privacy.title")}
          </h1>
          <div className="flex items-center gap-x-5">
            <p className="font-bold text-base text-footer-background-300">
              {i18n.language === 'es' ? termsprivacy?.titulo : termsprivacy?.titulo_ingles}
            </p>
          </div>
          {termsprivacy && <div
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(i18n.language === 'es' ? termsprivacy?.contenido : termsprivacy?.contenido_ingles),
            }}
          />}
        </div>
      </main>
    </>
  )
}

TermAndPrivacy.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default TermAndPrivacy
