import React from "react"
import { useTranslation } from "react-i18next"
import { getSession } from "next-auth/react"
import resources from "../restapi/resources.js"
import {
  getCountries,
  getProvinces,
  getMunicipalities,
  getCountriesId,
  getProvincesId,
  getMunicipalitiesId,
} from "../restapi/get-places"
import dynamic from "next/dynamic"
import { municipalityAtom } from "../store/place.js"
import { useAtom } from "jotai"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))
const Checkout = dynamic(() => import("../components/checkout/CheckoutApp"))

const CheckoutPage = ({ get_user_addresses }) => {
  const { t } = useTranslation()
  const [municipality] = useAtom(municipalityAtom)
  const municipality_id = municipality?.id
  const {
    addressees = [],
    countries = [],
    municipalities = [],
    provinces = [],
  } = get_user_addresses
  return (
    <>
      <AppHeader title={t("pages.checkout")} />
      <Checkout
        address={{
          addressees,
          countries,
          municipalities,
          provinces,
          municipality_id,
        }}
      />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const users = await resources.users.all()
  const { results } = users.data
  const session = await getSession({ req })

  if (session && session?.user) {
    const user = results.find((user) => user.email === session.user.email)
    if (user && user.id) {
      const addressee = await resources.recipients.all()
      const addressee_response = addressee.data.results

      const addressees_user = addressee_response.filter(
        ({ usuario }) => usuario === user.id
      )
      const orderby_active_addressees_user = addressees_user.sort((a, b) =>
        a.activo > b.activo ? -1 : 1
      )
      const countries = await getCountries(
        orderby_active_addressees_user[0] ?? {}
      )
      const provinces = await getProvinces(
        orderby_active_addressees_user[0] ?? {}
      )
      const municipalities = await getMunicipalities(
        orderby_active_addressees_user[0] ?? {}
      )
      const addressees_user_filters = []
      for await (const items of orderby_active_addressees_user) {
        const addressees_user = {
          id: items?.id,
          nombre: items?.nombre,
          nombre_remitente: items?.nombre_remitente,
          nombre_alternativo: items?.nombre_alternativo,
          apellido1: items?.apellido1,
          apellido2: items?.apellido2,
          ci: items?.ci,
          email: items?.email,
          telefono: items?.telefono,
          telefono_alternativo: items?.telefono_alternativo,
          ciudad: items?.ciudad,
          direccion: items?.direccion,
          nota_entrega: items?.nota_entrega,
          pais: await getCountriesId(items.pais),
          provincia: await getProvincesId(items.provincia),
          municipio: await getMunicipalitiesId(items.municipio),
          activo: items?.activo,
        }
        addressees_user_filters.push(addressees_user)
      }
      return {
        props: {
          get_user_addresses: {
            addressees: addressees_user_filters,
            countries,
            municipalities,
            provinces,
          },
        },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/signin",
        },
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    }
  }
}

CheckoutPage.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default CheckoutPage
