import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession, getSession } from 'next-auth/react'
import Router from 'next/router'
import resources from '../../restapi/resources.js'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Image from 'next/image.js'
import PreviewIcon from '@mui/icons-material/Preview'
import { DateTime } from 'luxon'
import useWindowSize from '../../hooks/WindowSize.js'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const AccountLayout = dynamic(() => import('../../layouts/AccountLayout'))
const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))
const OrderDetails = dynamic(() => import('../../components/modals/OrderDetails'))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#111b3c',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function Orders({ orders }) {
  const { t } = useTranslation()
  const { status } = useSession()
  const size = useWindowSize()
  const [details, setDetails] = useState({})
  const [openOrderDetails, setOpenOrderDetails] = useState()

  if (status === 'unauthenticated') {
    Router.push('/auth/signin')
  }

  return (
    <>
      <AppHeader title={t('pages.orders')} />
      <OrderDetails item={details} {...{ openOrderDetails, setOpenOrderDetails }}/>
      <div className='flex flex-col border rounded-3xl p-4'>
        <p className='font-bold text-footer-background-200 sm:text-xl md:text-4xl mb-2'>Consulta tus órdenes</p>
        {size.width <= 700 && (
          <>
            {orders.map((item) => (
              <div key={item.id} className='flex flex-row border rounded-lg mb-2 justify-between'>
                <div className='relative w-[30%] h-15 m-2'>
                  <Image
                    src={`/assets/payment/${item?.tipo}/type-${item?.tipo}.png`}
                    alt='Payment Type'
                    layout='fill'
                  />
                </div>
                <div className='flex text-sm flex-col w-[60%] my-2'>
                  <p><span className='font-bold'>Estado: </span>{item.status}</p>
                  <p><span className='font-bold'>ID: </span>{item.id}</p>
                  <p><span className='font-bold'>PAGO: </span>US${parseFloat(item.total).toFixed(2)}</p>
                  <p><span className='font-bold'>Fecha: </span>{DateTime.fromISO(item.fecha_creada).toLocaleString(DateTime.DATETIME_MED)}</p>
                </div>
                <div className='flex flex-col w-[8%] my-2' onClick={() => {
                  setDetails(item)
                  setOpenOrderDetails(true)
                }}>
                  <PreviewIcon fontSize='medium' color='primary' />
                </div>
              </div>
            ))}
          </>
        )}

        {size.width > 700 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'><span className='sm:text-xs md:text-base'>PASARELA</span></StyledTableCell>
                  <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>ESTADO</span></StyledTableCell>
                  <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>ID DE COMPRA</span></StyledTableCell>
                  <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>PAGO TOTAL</span></StyledTableCell>
                  <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>FECHA DE CREADA</span></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="center">
                      <div className='relative w-3/6 sm:h-9 md:h-14 xl:h-14 2xl:h-[4.5rem]'>
                        <Image
                          src={`/assets/payment/${item?.tipo}/type-${item?.tipo}.png`}
                          alt='Payment Type'
                          layout='fill'
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>{item.status}</span></StyledTableCell>
                    <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>{item.id}</span></StyledTableCell>
                    <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>US${parseFloat(item.total).toFixed(2)}</span></StyledTableCell>
                    <StyledTableCell align="left"><span className='sm:text-xs md:text-base'>{DateTime.fromISO(item.fecha_creada).toLocaleString(DateTime.DATETIME_MED)}</span></StyledTableCell>
                    <StyledTableCell align="left">
                      <div className='hover:cursor-pointer' onClick={() => {
                        setDetails(item)
                        setOpenOrderDetails(true)
                      }}>
                        <PreviewIcon fontSize='large' color='primary' />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <AccountLayout option={3}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

const getProductGroup = async (id, req) => {
  try {
    const product_group = await resources.users.get(id)
    return {
      name: product_group?.data?.nombre ?? null,
      imagen: product_group?.data?.img_principal ?? null
    }
  } catch (_) {
    return null
  }
}

export const getServerSideProps = async ({ req, res }) => {
  const users = await resources.users.all()
  const { results } = users.data
  const session = await getSession({ req })
  if (session && session.user) {
    const userSession = results.find(user => user.email === session.user.email)
    if (userSession && userSession.id) {
      const components = await resources.component.get()
      const components_response = components.data
      const orders = await resources.order.get()
      const orders_response = await orders.data
      const orders_user = orders_response.results?.filter(({ user }) => user === userSession.id)
      const orders_components_filters = []
      for await (const items of orders_user) {
        const components_order = components_response.results?.filter(({ orden }) => orden === items?.uuid)
        for await (const component of components_order) { if (component?.grupo) component.grupo_producto = await getProductGroup(component?.grupo, req) ?? null }
        const orders_components = {
          id: items?.uuid,
          fecha_creada: items?.fecha_creada,
          total: items?.total,
          currency: items?.currency,
          status: items?.status,
          tipo: items?.tipo,
          precio_envio: items?.precio_envio,
          destinatario: items?.destinatario,
          components: [...components_order]
        }
        orders_components_filters.push(orders_components)
      }
      return {
        props: {
          orders: orders_components_filters
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

export default Orders
