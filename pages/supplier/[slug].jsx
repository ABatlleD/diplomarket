import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import resources from '../../restapi/resources'
// import { useTranslation } from 'react-i18next'

function Supplier() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [products, setProducts] = useState()
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState('{}')
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 15

  useEffect(() => {
    if (router.query.slug) {
      setTitle(router.query.slug?.join(' - ') ?? '')
      setLoading(true)
      resources.products_by.supplier(router.query.slug ?? '', 1, itemOffset, filter)
        .then(response => setProducts(response.data))
      setLoading(false)
    }
  }, [products])

  useEffect(() => {
    setPageCount(Math.ceil(products?.total / itemsPerPage))
  }, [itemOffset, itemsPerPage, products?.total])

  if (isLoading) {
    return (<>Loading...</>)
  }

  // const { t } = useTranslation()

  return (
    <>
      {title}
    </>
  )
}

Supplier.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Supplier
