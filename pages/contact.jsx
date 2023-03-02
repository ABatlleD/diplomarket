import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import { TextField, Button } from "@mui/material"
import resources from "../restapi/resources"
import { isEmpty } from "../libs/serialize"
import { ToastContainer, toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import axios from "axios"
import parsePhoneNumber from "libphonenumber-js"
import MainLayout from "../layouts/MainLayout"
import AppHeader from "../components/layouts/AppHeader"

function Contact() {
  const { t, i18n } = useTranslation()
  const [contacts, setContacts] = useState([])
  const { data } = useSession()
  const email = data?.user?.email ?? ""
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (!isEmpty(message)) {
      axios
        .post("/api/contact", { message })
        .then((Message) => {
          if (Message?.data?.status === "ok") {
            toast.info(Message?.data?.message ?? "Contacte al administrator")
            setTimeout(() => {
              push("/").then()
            }, 2000)
          } else {
            toast.info("Debe iniciar sesión")
          }
        })
        .catch(() => {
          toast.info("Contacte al administrator")
        })
    } else {
      toast.info("Escriba su mensaje")
    }
    setLoading(false)
  }

  useEffect(() => {
    resources.contacts
      .get()
      .then((response) => setContacts(response.data.results))
  }, [])

  return (
    <>
      <AppHeader title={t("pages.contact")} />
      <ToastContainer />
      <div className="flex flex-row justify-center text-footer-background-200">
        <div className="flex flex-col md:flex-row mt-10 mb-20 rounded-3xl w-5/6 p-8 bg-background-300 shadow-2xl">
          <div className="flex flex-col w-full md:w-1/2 md:mr-4">
            <p className="text-3xl font-semibold mb-4">{t("contact.title")}</p>
            <p className="text-justify mb-2">{t("contact.subtitle")}</p>
            <p className="font-semibold text-xl mb-1">
              {t("contact.labels.phone")}
            </p>
            <div className="flex flex-col hover:cursor-pointer mb-2">
              {contacts.map((contact) => (
                <div key={contact.id}>
                  {contact.tipo === "whatsapp" && (
                    <div className="hover:underline hover:text-button">
                      <WhatsAppIcon
                        sx={{
                          color: "#49c95a",
                          fontSize: 25,
                        }}
                      />
                      <a
                        href={`https://api.whatsapp.com/send?phone=${contact.contenido}&text=Hola,%20Diplomarket%E2%84%A2`}
                        className="ml-1"
                      >
                        {parsePhoneNumber(
                          `+${contact.contenido}`
                        )?.formatInternational()}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="font-semibold text-xl mb-2">
              {t("contact.labels.mail")}
            </p>
            {contacts.map((contact) => (
              <div key={contact.id}>
                {contact.tipo === "email" && (
                  <a
                    className="hover:underline"
                    href={`mailto:${contact.contenido}`}
                  >
                    <p className="mb-2">
                      <span>
                        <MailOutlineIcon />
                      </span>{" "}
                      <span className="uppercase">
                        {i18n.language === "es"
                          ? contact.descripcion
                          : contact.descripcion_ingles}
                      </span>{" "}
                      {contact.contenido}
                    </p>
                  </a>
                )}
              </div>
            ))}
            <p className="font-semibold text-xl mb-1">
              {t("contact.labels.address")}
            </p>
            {contacts.map((contact) => (
              <div key={contact.id}>
                {contact.tipo === "direccion" && (
                  <div>
                    <p className="mb-1">{contact.contenido}</p>
                    <p className="hover:cursor-pointer hover:underline hover:text-button mb-2">
                      <span>
                        <LocationOnOutlinedIcon />
                      </span>
                      <a href={contact.link}>
                        {i18n.language === "es"
                          ? contact.descripcion
                          : contact.descripcion_ingles}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            ))}
            <p className="font-semibold text-xl mb-1">
              {t("contact.labels.chat")}
            </p>
            <p>{t("contact.labels.chat-description")}</p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 md:ml-4">
            <div className="mt-16 mb-4">
              <TextField
                id="outlined-required"
                label={t("contact.inputs.email")}
                value={email}
                disabled={true}
                sx={{
                  width: "100%",
                  borderColor: "red",
                }}
              />
            </div>
            <div className="mb-4">
              <TextField
                id="outlined-multiline-static"
                label={t("contact.inputs.message")}
                multiline
                rows={4}
                defaultValue=""
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  width: "100%",
                  borderColor: "red",
                }}
              />
            </div>
            <div className="">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#15224b !important",
                }}
                disabled={loading}
                onClick={handleSubmit}
              >
                {t("contact.inputs.submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Contact.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default Contact
