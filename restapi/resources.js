import { ENDPOINTS } from './endpoints'
import axios from 'axios'
import { getRequest, postRequest, putRequest } from '.'

const resources = {
  auth: {
    signup: async (data) => await postRequest(`${ENDPOINTS.USERS}`, data),
    signin: async (data) => await postRequest(`${ENDPOINTS.AUTH}`, data),
    changePassword: async (data) => await postRequest(ENDPOINTS.CHANGE_PASSWORD, data)
  },
  carousel: {
    all: async () => await getRequest(`${ENDPOINTS.CAROUSEL}`)
  },
  comercial: async (data) => await postRequest(ENDPOINTS.COMERCIAL, data),
  checkout: async (data) => await postRequest(ENDPOINTS.CHECKOUT, data),
  bofa: async (data) => await postRequest(ENDPOINTS.BOFA, data),
  delivery: {
    get: async (items, municipio) => {
      const response = await axios.post('/api/checkout/checkdelivery', {
        items,
        municipio
      })
      return response.data.total
    },
    create: async (data) => await postRequest(ENDPOINTS.DELIVERY, data)
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
    search: async (municipality, type) => await getRequest(`${ENDPOINTS.SEARCH}/${municipality}/${type}/`),
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
    all: async () => await getRequest(ENDPOINTS.CATEGORY_SPECIAL),
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
      all: async () => await getRequest(ENDPOINTS.PROVINCES),
      one: async (id) => await getRequest(`${ENDPOINTS.PROVINCES}${id}`)
    },
    country: {
      all: async () => await getRequest(ENDPOINTS.COUNTRIES),
      one: async (id) => await getRequest(`${ENDPOINTS.COUNTRIES}${id}`)
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
  },
  configuration: {
    get: async () => await getRequest(`${ENDPOINTS.CONFIGURACION}`)
  },
  users: {
    all: async () => await getRequest(`${ENDPOINTS.USERS}`),
    get: async (email) => {
      const users = await getRequest(`${ENDPOINTS.USERS}`)
      const { results } = users.data
      return results.find(user => user.email === email)
    },
    update: async (id, data) => await putRequest(`${ENDPOINTS.USERS}${id}/`, data)
  },
  recipients: {
    all: async () => await getRequest(ENDPOINTS.RECIPIENTS),
    one: async (id) => await getRequest(`${ENDPOINTS.RECIPIENTS}${id}/`),
    create: async (data) => await postRequest(ENDPOINTS.RECIPIENTS, data),
    update: async (id, data) => await putRequest(`${ENDPOINTS.RECIPIENTS}${id}/`, data)
  }
}

export default resources
