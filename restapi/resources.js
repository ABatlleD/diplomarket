import { ENDPOINTS } from './endpoints'
import { getRequest, postRequest } from '.'

const resources = {
  auth: {
    signup: async (data) => await postRequest(`${ENDPOINTS.USERS}`, data)
  },
  carousel: {
    all: async () => await getRequest(`${ENDPOINTS.CAROUSEL}`)
  },
  products: {
    all: async (options) => {
      const { offset, limit, municipality_id, min, max, category, subcategory, brand, provider } = options
      let filter = `?offset=${offset}&limit=${limit}&municipios=${municipality_id}`

      if (min) filter += `&min=${min}`
      if (max) filter += `&max=${max}`
      if (category) filter += `&categoria=${category}`
      if (subcategory) filter += `&subcategoria=${subcategory}`
      if (brand) filter += `&marca=${brand}`
      if (provider) filter += `&proveedor=${provider}`

      return await getRequest(`${ENDPOINTS.PRODUCTS}/${filter}`)
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
    paths: async () => await getRequest(`${ENDPOINTS.CATEGORIES_TREE}`)
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
  place: {
    district: {
      all: async () => await getRequest(ENDPOINTS.MUNICIPALITY),
      one: async (id) => await getRequest(`${ENDPOINTS.MUNICIPALITY}${id}`)
    },
    city: {
      all: async () => await getRequest(ENDPOINTS.PROVINCES)
    }
  },
  faq: {
    all: async () => await getRequest(`${ENDPOINTS.FAQ}`)
  },
  help: {
    all: async () => await getRequest(`${ENDPOINTS.HELP}`)
  },
  contacts: {
    get: async () => await getRequest(`${ENDPOINTS.CONTACT}`)
  }
}

export default resources
