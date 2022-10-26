import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AxiosClient } from '.'
import { ENDPOINTS } from './endpoints'

export function useTreeCategories() {
  const { data, isSuccess, error, isFetching } = useQuery(
    [ENDPOINTS.CATEGORIES_TREE],
    async () => await AxiosClient.get(`${ENDPOINTS.CATEGORIES_TREE}`)
  )

  const [categories, setCategories] = useState({})

  useEffect(() => {
    if (data && isSuccess) {
      console.log('🚀 ~ file: hooks.js ~ line 16 ~ useEffect ~ data', data)
      setCategories(data)
    }
  }, [data])

  return {
    categories,
    isSuccess,
    error,
    isFetching
  }
}
