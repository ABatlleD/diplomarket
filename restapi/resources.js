import { ENDPOINTS } from "./endpoints"
import axios from "axios"
import { getRequest, postRequest, putRequest, patchRequest } from "."

const resources = {
  auth: {
    signup: async (data) => await postRequest(`${ENDPOINTS.USERS}`, data),
    signin: async (data) => await postRequest(`${ENDPOINTS.AUTH}`, data),
    changePassword: async (data) =>
      await postRequest(ENDPOINTS.CHANGE_PASSWORD, data),
  },

  banner: {
    all: async () => await getRequest(`${ENDPOINTS.BANNER}`),
  },

  job: {
    all: async () => await getRequest(`${ENDPOINTS.JOBS}`),
  },

  community: {
    all: async () => await getRequest(`${ENDPOINTS.COMMUNITY}`),
  },

  termsprivacy: {
    all: async () => await getRequest(`${ENDPOINTS.TERMSPRIVACY}`),
  },

  bofa: async (data) => await postRequest(ENDPOINTS.BOFA, data),

  carousel: {
    all: async () => await getRequest(`${ENDPOINTS.CAROUSEL}`),
  },

  categories: {
    all: async () => await getRequest(ENDPOINTS.CATEGORY_SPECIAL),
    paths: async () => await getRequest(`${ENDPOINTS.CATEGORIES_TREE}`),
  },

  checkout: async (data) => await postRequest(ENDPOINTS.CHECKOUT, data),

  comercial: async (data) => await postRequest(ENDPOINTS.COMERCIAL, data),

  component: {
    get: async () => await getRequest(`${ENDPOINTS.COMPONENT}`),
  },

  contact: async (data) => await postRequest(ENDPOINTS.SEND_MAIL, data),

  delivery: {
    get: async (items, municipio) => {
      const response = await axios.post("/api/checkout/checkdelivery", {
        items,
        municipio,
      })
      return response.data.total
    },
    create: async (data) => await postRequest(ENDPOINTS.DELIVERY, data),
  },

  featured_products: {
    all: async (municipalityId) =>
      await getRequest(`${ENDPOINTS.PRODUCTS_FEATURED}/${municipalityId}/`),
  },

  order: {
    get: async () => await getRequest(`${ENDPOINTS.ORDER}`),
  },

  products: {
    all: async (options) => {
      const {
        // eslint-disable-next-line no-unused-vars
        offset= '',
        // eslint-disable-next-line no-unused-vars
        limit = '',
        municipality_id,
        min,
        max,
        category,
        subcategory,
        brand,
        // eslint-disable-next-line no-unused-vars
        provider,
        extra,
        ordering,
        version = 1,
        page = 1,
      } = options

      let filter = `?version=${version}&page=${page}&municipios=${municipality_id}`

      if (min) filter += `&min=${min}`
      if (max) filter += `&max=${max}`
      if (category) filter += `&categoria=${category}`
      if (subcategory) filter += `&subcategoria=${subcategory}`
      if (brand.id > 0) filter += `&marca=${brand.id}`
      /* if (provider.id > 0) filter += `&proveedor=${provider.id}` */
      if (extra) filter += `&extra=${extra}`
      if (ordering) filter += `&ordering=${ordering}`

      return await getRequest(`${version === 2 ? '/dm' : ''}${ENDPOINTS.PRODUCTS}/${filter}`)
    },
    search: async (municipality, type) =>
      await getRequest(`${ENDPOINTS.SEARCH}/${municipality}/${type}/`),
    tip: async (municipality) =>
      await getRequest(`${ENDPOINTS.TIP}${municipality}/`),
    one: async (id) => await getRequest(`${ENDPOINTS.PRODUCTS}/${id}/`),
  },

  products_related: {
    all: async (productId, municipalityId) =>
      await getRequest(
        `${ENDPOINTS.PRODUCTS_RELATED}/${municipalityId}/${productId}`
      ),
  },

  recently_solds: {
    all: async (municipalityId) =>
      await getRequest(`${ENDPOINTS.PRODUCTS_BEST_SELLERS}/${municipalityId}/`),
  },

  today_recomendations: {
    all: async (municipalityId) =>
      await getRequest(
        `${ENDPOINTS.PRODUCTS_RECOMMENDED_DAY}/${municipalityId}/`
      ),
  },

  brands: {
    all: async () => await getRequest(ENDPOINTS.GET_BRANDS),
    one: async (id) => await getRequest(`${ENDPOINTS.GET_BRANDS}${id}`),
  },

  suppliers: {
    all: async () => await getRequest(ENDPOINTS.GET_SUPPLIER),
    one: async (id) => await getRequest(`${ENDPOINTS.GET_SUPPLIER}${id}`),
  },

  tags: {
    all: async () => await getRequest(ENDPOINTS.GET_TAGS),
  },

  place: {
    district: {
      all: async () => await getRequest(ENDPOINTS.MUNICIPALITY),
      one: async (id) => await getRequest(`${ENDPOINTS.MUNICIPALITY}${id}`),
    },
    city: {
      all: async () => await getRequest(ENDPOINTS.PROVINCES),
      one: async (id) => await getRequest(`${ENDPOINTS.PROVINCES}${id}`),
    },
    country: {
      all: async () => await getRequest(ENDPOINTS.COUNTRIES),
      one: async (id) => await getRequest(`${ENDPOINTS.COUNTRIES}${id}`),
    },
  },

  faq: {
    all: async () => await getRequest(`${ENDPOINTS.FAQ}`),
  },

  help: {
    all: async () => await getRequest(`${ENDPOINTS.HELP}`),
  },

  contacts: {
    get: async () => await getRequest(`${ENDPOINTS.CONTACT}`),
  },

  configuration: {
    get: async () => await getRequest(`${ENDPOINTS.CONFIGURACION}`),
  },

  users: {
    all: async () => await getRequest(`${ENDPOINTS.USERS}?limit=10000&offset=0`),
    get: async (email) => {
      const user = await getRequest(`${ENDPOINTS.USER}${encodeURIComponent(email)}`)
      return user.data
    },
    update: async (id, data) =>
      await patchRequest(`${ENDPOINTS.USERS}${id}/`, data),
  },

  recipients: {
    all: async () => await getRequest(ENDPOINTS.RECIPIENTS),
    one: async (id) => await getRequest(`${ENDPOINTS.RECIPIENTS}${id}/`),
    create: async (data) => await postRequest(ENDPOINTS.RECIPIENTS, data),
    update: async (id, data) =>
      await putRequest(`${ENDPOINTS.RECIPIENTS}${id}/`, data),
  },
}

export default resources
