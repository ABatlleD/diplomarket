import React, { useEffect, useState } from "react"
import Drawer from "@mui/material/Drawer"
import LangSelector from "../navbar/LangSelector"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined"
import { useTranslation } from "react-i18next"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import WhatsAppBusinessIcon from "../../icons/whats-app-business-icon"
import Link from "next/link"
import resources from "../../../restapi/resources"
import parsePhoneNumber from "libphonenumber-js"
import dynamic from "next/dynamic"
import { municipalityAtom } from "../../../store/place"
import { useAtom } from "jotai"

const AppButton = dynamic(() => import("../../AppButton"))

function MainSideBar({
  mainSideBar = false,
  setMainSideBar = () => {},
  openSelectPlace,
  setOpenSelectPlace,
}) {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState([])
  const [municipality] = useAtom(municipalityAtom)

  useEffect(() => {
    const answer = []
    resources.contacts.get().then((response) => {
      response.data.results.map((item) =>
        (item.tipo === "email" || item.tipo === "whatsapp") && item.sidebar
          ? answer.push(item)
          : true
      )
      setContacts(answer)
    })
  }, [])

  return (
    <React.Fragment>
      <Drawer
        anchor={"left"}
        open={mainSideBar}
        onClose={() => setMainSideBar(false)}
      >
        <div className="flex flex-row justify-between mx-4 mt-6">
          <div className="flex">
            <LangSelector />
          </div>
          <button
            onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
            className="bg-white text-black h-4 w-4 mr-2 block rounded-full"
          >
            <HighlightOffIcon />
          </button>
        </div>
        <div className="mt-6 mx-4">
          <AppButton
            sx={{
              fontSize: 15,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: "100%",
            }}
            className="bg-button rounded-full"
            onClick={() => {
              setMainSideBar((mainSideBar) => !mainSideBar)
              setOpenSelectPlace(true)
            }}
          >
            <span className="mt-[-3px] mr-1">
              <AddLocationAltOutlinedIcon fontSize="small" />
            </span>{" "}
            {municipality?.nombre} <span className="mt-[-1px]"></span>
          </AppButton>
        </div>
        <div className="flex flex-col mx-4">
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className="mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg"
          >
            <Link href="/about">
              <p className="hover:cursor-pointer hover:underline">
                {t("layout.navbar.about")}{" "}
                <span>
                  <KeyboardArrowRightIcon sx={{ marginTop: "-1px" }} />
                </span>
              </p>
            </Link>
          </div>
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className="mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg"
          >
            <Link href="/sell-with-us">
              <p className="hover:cursor-pointer hover:underline">
                {t("layout.navbar.sell-with-us")}{" "}
                <span>
                  <KeyboardArrowRightIcon sx={{ marginTop: "-1px" }} />
                </span>
              </p>
            </Link>
          </div>
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className="mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg"
          >
            <Link href="/contact">
              <p className="hover:cursor-pointer hover:underline">
                {t("layout.navbar.contact")}{" "}
                <span>
                  <KeyboardArrowRightIcon sx={{ marginTop: "-1px" }} />
                </span>
              </p>
            </Link>
          </div>
          {/* <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className="mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg"
          >
            <Link href="/providers">
              <p className="hover:cursor-pointer hover:underline">
                {t("layout.navbar.providers")}{" "}
                <span>
                  <KeyboardArrowRightIcon sx={{ marginTop: "-1px" }} />
                </span>
              </p>
            </Link>
          </div> */}
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className="mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg"
          >
            <Link href="/empleos">
              <p className="hover:cursor-pointer hover:underline">
                {t("pages.jobs")}{" "}
                <span>
                  <KeyboardArrowRightIcon sx={{ marginTop: "-1px" }} />
                </span>
              </p>
            </Link>
          </div>
          {contacts.map((item) => (
            <div
              key={item.id}
              className="mt-4 text-footer-background-200 hover:text-footer-background-100 text-lg"
            >
              {item.tipo === "email" && (
                <p>
                  <span>
                    <EmailOutlinedIcon sx={{ marginTop: "-3px" }} />
                  </span>
                  <a
                    className="hover:underline"
                    href={`mailto:${item.contenido}`}
                  >
                    {" "}
                    {item.contenido}
                  </a>
                </p>
              )}
              {item.tipo === "whatsapp" && (
                <p className="flex flex-row">
                  <span>
                    <WhatsAppBusinessIcon />
                  </span>{" "}
                  <a
                    href={`https://api.whatsapp.com/send?phone=${item.contenido}&text=Hola,%20Diplomarket%E2%84%A2`}
                  >
                    <span className="ml-1 mt-[-0.2rem] hover:underline">
                      {" "}
                      {parsePhoneNumber(
                        `+${item.contenido}`
                      )?.formatInternational()}
                    </span>
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default MainSideBar
