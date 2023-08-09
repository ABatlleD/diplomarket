import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import modalBg from "../public/assets/theme/logo-preloader.png"
import dynamic from "next/dynamic"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))

function SellWithUs() {
  const [nombre_entidad, setNombreEntidad] = useState("")
  const [nombre_representante_entidad, setNombreRepresentanteEntidad] =
    useState("")
  const [direcion, setDirecion] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [resena, setResena] = useState("")

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

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

  function changeMaximum(e) {
    setMaximum(maximumChar.current)
    setCalculate(maximum.getAttribute("maxlength") - maximum.value.length)
    setResena(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (
      !!nombre_entidad &&
      !!nombre_representante_entidad &&
      !!email &&
      !!telefono &&
      !!direcion &&
      !!resena
    ) {
      if (!email.replace(/\s+/g, "").match(emailRegex)) {
        setLoading(false)
        return toast.error("Introduzca un email válido.")
      }
      axios
        .post("/api/comercial", {
          nombre_entidad,
          nombre_representante_entidad,
          email,
          telefono,
          direcion,
          resena,
        })
        .then((Message) => {
          if (Message?.data?.status === "ok") {
            toast.info(Message?.data?.message ?? "Contacte al administrator")
            setTimeout(() => {
              push("/").then()
            }, 2000)
          } else {
            toast.info("Contacte al administrator")
          }
        })
        .catch(() => {
          toast.info("Contacte al administrator")
        })
    } else {
      toast.info("Complete los campos obligatorios")
    }
    setLoading(false)
  }

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
