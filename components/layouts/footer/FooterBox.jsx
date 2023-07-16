import React, { useEffect, useState } from "react"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import TelegramIcon from "@mui/icons-material/Telegram"
import InstagramIcon from "@mui/icons-material/Instagram"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import resources from "../../../restapi/resources"

function FooterBox({ cartSideBar, setCartSideBar }) {
  const { t } = useTranslation()
  const [socialMedias, setSocialMedias] = useState([])
  const [configurations, setConfigurations] = useState({})

  useEffect(() => {
    const answer = []
    resources.contacts.get().then((response) => {
      response.data.results.map((item) =>
        item.tipo === "facebook" ||
        item.tipo === "telegram" ||
        item.tipo === "twitter" ||
        item.tipo === "instagram"
          ? answer.push(item)
          : true
      )
      setSocialMedias(answer)
    })
    resources.configuration
      .get()
      .then((response) =>
        setConfigurations(response.data.results[0].pasarelas[0])
      )
  }, [])

  const SocialMedia = {
    facebook: <FacebookIcon fontSize="large" />,
    telegram: <TelegramIcon fontSize="large" />,
    twitter: <TwitterIcon fontSize="large" />,
    instagram: <InstagramIcon fontSize="large" />,
  }

  return (
    <div className="bg-footer-background-100 flex flex-col md:flex-row justify-around py-8 px-3">
      <div className="flex flex-col md:w-3/12 mb-10 md:mb-0">
        <img
          src="/logo.png"
          className="max-w-max h-20 rounded-md mb-4"
          alt="..."
        />
        <p className="text-text-200 text-justify italic font-semibold">
          {t("footer.description")}
        </p>
        <div className="flex flex-row text-background-100 w-1/2 mt-4">
          {socialMedias.map((social) => (
            <a
              key={social.id}
              className="mr-2"
              href={social.contenido}
              target="_blank"
              rel="noopener noreferrer"
              title={social.tipo}
            >
              {SocialMedia[social.tipo]}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between md:w-4/12">
        <div className="flex flex-col md:w-5/12 text-text-200 font-semibold mb-6">
          <h2 className="mb-3 font-bold text-background-100">
            {t("footer.about.title")}
          </h2>
          <Link href="/about">
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.about.aboutUs")}
            </p>
          </Link>
          <Link href="/terminos-privacidad">
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t('terms-privacy.title')}
            </p>
          </Link>
          <Link href="/contact">
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.about.contact")}
            </p>
          </Link>
          <Link href="/help">
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.about.help")}
            </p>
          </Link>
          <Link href="/comunidad">
            <p className="transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.about.community")}
            </p>
          </Link>
        </div>
        <div className="flex flex-col md:w-5/12 text-text-200 font-semibold mb-6">
          <h2 className="mb-3 font-bold text-background-100">
            {t("footer.account.title")}
          </h2>
          <Link href={"/auth/signup"}>
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.account.signOut")}
            </p>
          </Link>
          <p
            onClick={() => setCartSideBar(true)}
            className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500"
          >
            {t("footer.account.cart")}
          </p>
          <Link href={"/wishlist"}>
            <p className="mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.account.wishes")}
            </p>
          </Link>
          <Link href={"/account/orders"}>
            <p className="transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500">
              {t("footer.account.orders")}
            </p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:w-3/12 text-background-100">
        <h2 className="mb-4 font-semibold">{t("footer.app")}</h2>
        <a href="https://play.google.com/store/apps/details?id=com.octagi.diplomarket&hl=es&gl=US">
          <img
            src="/assets/google-play.png"
            className="max-w-max h-14 rounded-md mb-2"
            alt="..."
          />
        </a>
        <div className="flex flex-wrap md:w-2/3 mt-4">
          {configurations.pasarela_paypal && (
            <img
              src="/assets/payment/paypal/type-paypal.png"
              className="max-w-max h-10 rounded-md mb-2 mr-1"
              alt="..."
            />
          )}
          {configurations.pasarela_zelle && (
            <img
              src="/assets/payment/zelle/type-zelle.png"
              className="max-w-max h-10 rounded-md mb-2 mr-1"
              alt="..."
            />
          )}
          {configurations.pasarela_tropipay && (
            <img
              src="/assets/payment/tropipay/type-tropipay.png"
              className="max-w-max h-10 rounded-md mb-2 mr-1"
              alt="..."
            />
          )}
          {configurations.pasarela_bofa && (
            <>
              <img
                src="/assets/payment/bofa/card-visa.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-master.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-american-express.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-maestro.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-discover.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-uatp.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
              <img
                src="/assets/payment/bofa/card-jcb.png"
                className="max-w-max h-10 rounded-md mb-2 mr-1"
                alt="..."
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FooterBox
