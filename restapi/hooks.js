import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ENDPOINTS } from './endpoints'
import resources from './resources'

export function useTreeCategories() {
  const { data, isSuccess, error, isFetching } = useQuery(
    [ENDPOINTS.CATEGORIES_TREE],
    () => resources.categories.paths()
  )

  const [categories, setCategories] = useState({})

  useEffect(() => {
    if (data && isSuccess) {
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

export function useSuppliers() {
  const { data, isSuccess, error, isFetching } = useQuery(
    [ENDPOINTS.GET_SUPPLIER],
    () => resources.suppliers.all()
  )

  const [suppliers, setSuppliers] = useState({})

  useEffect(() => {
    if (data && isSuccess) {
      setSuppliers(data)
    }
  }, [data])

  return {
    suppliers,
    isSuccess,
    error,
    isFetching
  }
}
export function useBrands() {
  const { data, isSuccess, error, isFetching } = useQuery(
    [ENDPOINTS.GET_BRANDS],
    () => resources.brands.all()
  )

  const [brands, setBrands] = useState({})

  useEffect(() => {
    if (data && isSuccess) {
      setBrands(data)
    }
  }, [data])

  return {
    brands,
    isSuccess,
    error,
    isFetching
  }
}

export function useRelatedProducts(productId, municipalityId) {
  const { data, isSuccess, error, isFetching } = useQuery(
    [ENDPOINTS.PRODUCTS_RELATED],
    () => resources.products_related.all(productId, municipalityId)
  )

  const [products, setProducts] = useState({})

  useEffect(() => {
    if (data && isSuccess) {
      setProducts(data)
    }
  }, [data])

  return {
    products,
    isSuccess,
    error,
    isFetching
  }
}

export function useCategoryProducts({ slug, municipality_id, page = 0, filter }) {
  const { data, isLoading, isSuccess, error } = useQuery(
    ['/products', slug, municipality_id, page, filter],
    () => resources.categories.products(slug, municipality_id, page, filter)
  )
  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isSuccess,
    error
  }
}

export function useSupplier({ provider, municipality_id, page = 0, filter }) {
  const { data, isSuccess, isLoading, error } = useQuery(
    ['/supplier', provider, municipality_id, page, filter],
    () => resources.products_by.supplier(provider, municipality_id, page, filter)
  )

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    isSuccess,
    isLoading,
    error
  }
}

export function useStates() {
  const { data, isSuccess, isLoading, error } = useQuery(
    ['/cities'],
    () => resources.place.city.all()
  )

  return {
    states: data?.data ?? [],
    isSuccess,
    isLoading,
    error
  }
}

export function useDistricts() {
  const { data, isSuccess, isLoading, error } = useQuery(
    ['/districts'],
    () => resources.place.district.all()
  )

  return {
    districts: data?.data ?? [],
    isSuccess,
    isLoading,
    error
  }
}
