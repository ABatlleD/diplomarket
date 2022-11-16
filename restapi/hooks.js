/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { isEmpty } from '../libs/serialize'
import { ENDPOINTS } from './endpoints'
import resources from './resources'
const DEFAULT_CONFIG = {
  phones: [],
  emails: [],
  social_media: [],
  zelle_email: '',
  zelle_time: null,
  directo_email: '',
  moneda: false
}

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

export function useContact() {
  const { data, isLoading, error } = useQuery(
    [ENDPOINTS.CONTACT],
    () => resources.contacts.get() ?? ({
      results: [{
        contactos: [
          ...DEFAULT_CONFIG.phones,
          ...DEFAULT_CONFIG.emails,
          ...DEFAULT_CONFIG.social_media
        ],
        correo_zelle: DEFAULT_CONFIG.zelle_email,
        tiempo_espera_zelle: DEFAULT_CONFIG.zelle_time
      }]
    })
  )
  const contactos = data?.results
  const zelle_email = data?.results[0]?.correo_zelle ?? DEFAULT_CONFIG.zelle_email
  const zelle_time = data?.results[0]?.tiempo_espera_zelle ?? DEFAULT_CONFIG.zelle_time
  const emails = !isEmpty(contactos)
    ? !isEmpty(contactos?.filter(
      (data) =>
        data?.tipo === 'email'
    ))
      ? contactos?.filter(
        (data) =>
          data?.tipo === 'email'
      )
      : [
        ...DEFAULT_CONFIG.emails
      ]
    : [
      ...DEFAULT_CONFIG.emails
    ]
  const phone = !isEmpty(contactos)
    ? !isEmpty(contactos?.filter(
      (data) =>
        data?.tipo === 'telefono'
    ))
      ? contactos?.filter(
        (data) =>
          data?.tipo === 'telefono'
      )
      : []
    : []

  const whatsapp = !isEmpty(contactos)
    ? !isEmpty(contactos?.filter(
      (data) =>
        data?.tipo === 'whatsapp'
    ))
      ? contactos?.filter(
        (data) =>
          data?.tipo === 'whatsapp'
      )
      : [
        ...DEFAULT_CONFIG.phones
      ]
    : [
      ...DEFAULT_CONFIG.phones
    ]

  const social_media = !isEmpty(contactos)
    ? !isEmpty(contactos?.filter(
      (data) =>
        data?.tipo?.includes('facebook') ||
        data?.tipo?.includes('telegram') ||
        data?.tipo?.includes('twitter') ||
        data?.tipo?.includes('instagram')
    ))
      ? contactos?.filter(
        (data) =>
          data?.tipo?.includes('facebook') ||
          data?.tipo?.includes('telegram') ||
          data?.tipo?.includes('twitter') ||
          data?.tipo?.includes('instagram')
      )
      : [
        ...DEFAULT_CONFIG.social_media
      ]
    : [
      ...DEFAULT_CONFIG.social_media
    ]
  const address = !isEmpty(contactos)
    ? !isEmpty(contactos?.filter(
      (data) =>
        data?.tipo === 'direccion'
    ))
      ? contactos?.filter(
        (data) =>
          data?.tipo === 'direccion'
      )
      : []
    : []

  return {
    contacts: {
      emails,
      phones: {
        whatsapp,
        phone
      },
      social_media,
      address,
      zelle: {
        zelle_email,
        zelle_time
      }
    },
    isLoading,
    error
  }
}
