import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'
import AppHeader from '../../components/layouts/AppHeader.jsx'
import { useTranslation } from 'react-i18next'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import resources from '../../restapi/resources.js'
import {
  getCountries,
  getProvinces,
  getMunicipalities,
  getCountriesId,
  getProvincesId,
  getMunicipalitiesId
} from '../../restapi/get-places'
import PropTypes from 'prop-types'
import MyAddressees from '../../components/account/MyAddresses'

function Recipients({ get_user_addresse }) {
  const { t } = useTranslation()
  const { status } = useSession()
  const router = useRouter()

  const {
    addressees = [],
    countries = [],
    municipalities = [],
    provinces = []
  } = get_user_addresse

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  return (
    <>
      <AppHeader title={t('pages.recipients')} />
      <div className='flex flex-col items-center md:border md:border-text-200 rounded-3xl md:p-8 p-2'>
        <MyAddressees address={{ addressees, countries, municipalities, provinces }}/>
      </div>
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
      const ordenby_active_addressees_user = addressees_user.sort((a, b) =>
        a.activo > b.activo ? -1 : 1
      )
      const countries = await getCountries(
        ordenby_active_addressees_user[0] ?? {}
      )
      const provinces = await getProvinces(
        ordenby_active_addressees_user[0] ?? {}
      )
      const municipalities = await getMunicipalities(
        ordenby_active_addressees_user[0] ?? {}
      )
      const addressees_user_filters = []
      for await (const items of ordenby_active_addressees_user) {
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
          activo: items?.activo
        }
        addressees_user_filters.push(addressees_user)
      }
      return {
        props: {
          get_user_addresse: {
            addressees: addressees_user_filters,
            countries,
            municipalities,
            provinces
          }
        }
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/signin'
        }
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin'
      }
    }
  }
}

Recipients.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <AccountLayout option={2}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

Recipients.propTypes = {
  get_user_addresse: PropTypes.any
}

export default Recipients
