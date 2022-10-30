import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import { useCategoryProducts } from '../../restapi/hooks'
// import { useTranslation } from 'react-i18next'

function Category() {
  const router = useRouter()
  const { slug } = router.query
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('{}')
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 15
  const { products, total, isLoading, isSuccess, error } = useCategoryProducts({ slug, municipality_id: 1, page: itemOffset, filter })

  useEffect(() => {
    setTitle(router.query.slug?.join(' - ') ?? '')
  }, [router.query])

  useEffect(() => {
    setPageCount(Math.ceil(total / itemsPerPage))
  }, [itemOffset, itemsPerPage, total])

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

Category.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Category
