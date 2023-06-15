import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import localFont from "@next/font/local"
import Iframe from "../components/Iframe"
import resources from "../restapi/resources"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))

const arial = localFont({ src: "../public/assets/font/arial/Arial.ttf" })

function Community() {
  const { t, i18n } = useTranslation()
  const [comunidad, setComunidades] = useState({})

  useEffect(() => {
    resources.configuration
      .get()
      .then((response) =>
        setComunidades(
          {
            comunidad_titulo: response.data.results[0]?.comunidad_titulo,
            comunidad_titulo_ingles: response.data.results[0]?.comunidad_titulo_ingles,
            comunidad_link: response.data.results[0]?.comunidad_link,
          }
        )
      )
  }, [])

  return (
    <>
      <AppHeader title={t("pages.community")} />
      <main className={arial.className}>
        <div className="flex flex-col mt-8 mb-8 xl:mb-24 mx-4 xl:mx-44 2xl:mb-96">
          <h1 className="font-bold text-[2rem] text-footer-background-300 mb-4">
            {t("community.title")}
          </h1>
          <p className="text-xl text-justify text-footer-background-300 mb-4">
            {i18n.language === 'es' ? comunidad?.comunidad_titulo : comunidad?.comunidad_titulo_ingles}
          </p>
          <div className="relative flex justify-center items-center">
            <Iframe
			      	url={comunidad?.comunidad_link}
			      	width="640px"
			      	height="320px"
			      	id=""
			      	className=""
			        sandbox={["allow-same-origin", "allow-scripts"]}
			      	display="block"
			      	position="relative"
			      	allowFullScreen
			      />
          </div>
        </div>
      </main>
    </>
  )
}

Community.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default Community
