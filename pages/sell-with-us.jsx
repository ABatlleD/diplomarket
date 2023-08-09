import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import "react-phone-input-2/lib/bootstrap.css"
import modalBg from "../public/assets/theme/logo-preloader.png"
import dynamic from "next/dynamic"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))

function SellWithUs() {



  const { t } = useTranslation()

  const [maximum, setMaximum] = useState("")
  const [calculate, setCalculate] = useState(250)
  const maximumChar = useRef(null)

  useEffect(() => {
    setMaximum(maximumChar.current)
    setCalculate(
      maximum
        ? maximum.getAttribute("maxlength") - maximum.value.length
        : calculate
    )
  }, [maximumChar, maximum, calculate])





  return (
    <>
      <AppHeader title={t("pages.swus")} />
      <ToastContainer />
      <div className="max-w-screen-xl text-footer-background-300 my-8 relative px-6 md:px-12 lg:px-16 xl:px-20 lg:py-16 md:py-8 py-6 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div>
          <div
            className="absolute w-100 h-100 left-0"
            style={{
              zIndex: "1",
              backgroundImage: `url(${modalBg.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              opacity: ".1",
            }}
          ></div>
          <div className="relative" style={{ zIndex: "2" }}>

            <div className="flex flex-col justify-between">
              <div>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.1")}
                </p>                
              </div>
            </div>
			
            
          </div>
        </div>
      </div>
    </>
  )
}

SellWithUs.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default SellWithUs
