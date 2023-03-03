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
            <h2 className="text-3xl font-bold text-justify leading-tight mb-2">
              {t("sell_with_us.title")}
            </h2>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg text-justify leading-tight font-bold mb-2">
                  {t("sell_with_us.message")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.1")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.2")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.3")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.4")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.5")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.6")}
                </p>
                <p
                  className="text-lg text-justify leading-tight align-center mb-2"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("sell_with_us.description.7")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-lg text-justify leading-tight font-bold mb-4">
                {t("sell_with_us.message_forms")}
              </p>
            </div>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <label className="col-span-full xl:col-span-1 lg:col-span-1">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.name")}:
                </span>
                <input
                  className="w-full bg-gray-300 text-gray-900 border mt-2 p-3 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  type="text"
                  onChange={(e) => {
                    setNombreEntidad(e.target.value)
                  }}
                  required
                />
              </label>
              <label className="col-span-full xl:col-span-1 lg:col-span-1">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.name_agent")}:
                </span>
                <input
                  className="w-full bg-gray-300 border text-gray-900 mt-2 p-3 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  type="text"
                  onChange={(e) => {
                    setNombreRepresentanteEntidad(e.target.value)
                  }}
                  required
                />
              </label>
              <label className="col-span-full">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.address")}:
                </span>
                <div className="relative">
                  <textarea
                    required
                    onChange={(e) => {
                      setDirecion(e.target.value)
                    }}
                    className="w-full h-16 bg-gray-300 text-gray-900 mt-2 p-3 border rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  />
                </div>
              </label>
              <label className="col-span-full xl:col-span-1 lg:col-span-1 md:col-span-1">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.email")}:
                </span>
                <input
                  className="w-full bg-gray-300 text-gray-900 border mt-2 p-3 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  required
                />
              </label>
              <label className="col-span-full xl:col-span-1 lg:col-span-1 md:col-span-1">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.phone")}:
                </span>
                <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  inputClass={
                    "bg-gray-300 text-gray-900 mt-2 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  }
                  specialLabel={""}
                  country={"cu"}
                  /* value={activeAccount?.telefono ?? "1"} */
                  inputStyle={{
                    width: "100%",
                    height: "100%",
                    marginBottom: "1rem",
                  }}
                  onChange={(phone) => {
                    setTelefono(phone)
                  }}
                />
                {/* <input className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
              type="text" /> */}
              </label>
              <label className="col-span-full">
                <span className="font-bold font-soft text-slate-600">
                  {t("sell_with_us.forms.review")}:
                </span>
                <div className="relative">
                  <textarea
                    ref={maximumChar}
                    onChange={changeMaximum}
                    maxLength={250}
                    placeholder={t("sell_with_us.placeholder")}
                    className="w-full h-32 bg-gray-300 border text-gray-900 mt-2 p-3 rounded-lg ring-offset-1 ring-offset-dm-blue ring-dm-blue focus:outline-none select-none focus:ring-1"
                  />
                  <span className="absolute px-2 py-1 bg-footer-background-100 text-xs text-white bg-dm-blue rounded right-1 bottom-2">
                    {calculate}
                  </span>
                </div>
              </label>
              <div className="col-span-full m-auto">
                <button
                  disabled={loading}
                  className="uppercase w-40 text-sm font-bold tracking-wide bg-dm-blue text-gray-100 p-3 rounded-lg bg-footer-background-100 text-background-100 ring-offset-1 ring-offset-gray-500 ring-gray-500 focus:outline-none select-none focus:ring-1"
                >
                  {t("sell_with_us.buttonText")}
                </button>
              </div>
            </form>
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
