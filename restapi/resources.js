import { ENDPOINTS } from './endpoints'
import { AxiosApiClient, getRequest } from '.'

const resources = {
  carousel: {
    all: async () => await getRequest(`${ENDPOINTS.CAROUSEL}`)
  },
  products: {
    all: async (offset, limit, municipality_id) => {
      console.log(`${ENDPOINTS.PRODUCTS}/?offset=${offset}&limit=${limit}&municipios=${municipality_id}`)
      return await getRequest(`${ENDPOINTS.PRODUCTS}/?offset=${offset}&limit=${limit}&municipios=${municipality_id}`)
    },
    one: async (id) => await getRequest(`${ENDPOINTS.PRODUCTS}/${id}/`)
  },
  featured_products: {
    all: async (municipalityId) => await getRequest(`${ENDPOINTS.PRODUCTS_FEATURED}/${municipalityId}/`)
  },
  today_recomendations: {
    all: async (municipalityId) => await getRequest(`${ENDPOINTS.PRODUCTS_RECOMMENDED_DAY}/${municipalityId}/`)
  },
  recently_solds: {
    all: async (municipalityId) => await getRequest(`${ENDPOINTS.PRODUCTS_BEST_SELLERS}/${municipalityId}/`)
  },
  products_related: {
    all: async (productId, municipalityId) => await getRequest(`${ENDPOINTS.PRODUCTS_RELATED}/${municipalityId}/${productId}`)
  },
  categories: {
    all: async (municipalityId) => await getRequest(ENDPOINTS.CATEGORY_SPECIAL),
    paths: async () => await getRequest(`${ENDPOINTS.CATEGORIES_TREE}`),
    products: async (slug, municipality_id, page = 0, filter) => {
      const response = await AxiosApiClient.get(
        `/products?arbol=${slug}&municipio=${municipality_id}&page=${page}&filter=${filter}`
      )
      return response.data
    }
  },
  brands: {
    all: async () => await getRequest(ENDPOINTS.GET_BRANDS)
  },
  suppliers: {
    all: async () => await getRequest(ENDPOINTS.GET_SUPPLIER)
  },
  tags: {
    all: async () => await getRequest(ENDPOINTS.GET_TAGS)
  },
  products_by: {
    supplier: async (provider, municipio, page, filter) => {
      const response = await AxiosApiClient.get(
        `/supplier?municipio=${municipio}&proveedor=${provider}&page=${page}&filter=${filter}`
        // {
        //   baseURL: 'https://www.diplomarket.com'
        // }
      )
      return response.data
    },
    brand: async (marca, municipio, page, filter) => {
      const response = await AxiosApiClient.get(
        `/brand?municipio=${municipio}&marca=${marca}&page=${page}&filter=${filter}`
      )
      return response.data
    },
    category: async (subcategory, municipio, page, filter) => {
      const response = await AxiosApiClient.get(
        `/category?municipio=${municipio}&subcategory=${subcategory}&page=${page}&filter=${filter}`
      )
      return response.data
    }
  },
  place: {
    district: {
      all: async () => await getRequest(ENDPOINTS.MUNICIPALITY),
      one: async (id) => await getRequest(`${ENDPOINTS.MUNICIPALITY}${id}`)
    },
    city: {
      all: async () => await getRequest(ENDPOINTS.PROVINCES)
    }
  }
}

export default resources
