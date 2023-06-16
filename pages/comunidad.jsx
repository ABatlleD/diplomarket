import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import localFont from "@next/font/local"
import Iframe from "../components/Iframe"
import resources from '../restapi/resources'

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))

const arial = localFont({ src: "../public/assets/font/arial/Arial.ttf" })

function Community({ comunidades }) {
  const { t, i18n } = useTranslation()

  return (
    <>
      <AppHeader title={t("pages.community")} />
      <main className={arial.className}>
        <div className="flex flex-col mt-8 mb-8 xl:mb-24 mx-4 xl:mx-44 2xl:mb-96">
          <h1 className="font-bold text-center text-lg md:text-2xl text-footer-background-300 mb-4">
            {t("community.title")}
          </h1>
          
          {comunidades?.results?.map((element, _) => (
            <React.Fragment key={_}>
              <p className="md:text-lg text-justify text-footer-background-300">
                {i18n.language === 'es' ? element?.descripcion : element?.descripcion_ingles}
              </p>
              <div className="relative flex justify-center items-center mt-4">
                <Iframe
			          	url={element?.link}
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
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { comunidades, fetchError } = await fetchData()

  return {
    props: {
      comunidades,
      fetchError,
    },
  }
}

async function fetchData() {
  let fetchError = ''
  let comunidades = []
  try {
    comunidades = await (await resources.community.all()).data
  } catch (error) {
    fetchError = error.message
  }
  return { comunidades, fetchError }
}

Community.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default Community
