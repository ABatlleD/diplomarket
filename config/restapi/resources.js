import { ENDPOINTS } from './endpoints'
import { getRequest } from '.'

const resources = {
  carousel: {
    all: async () => await getRequest(`${ENDPOINTS.CAROUSEL}`)
  },
  products: {
    all: async () => await getRequest(`${ENDPOINTS.PRODUCTS}/`),
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
  place: {
    district: {
      all: async () => {
        await getRequest(ENDPOINTS.MUNICIPALITY)
      },
      one: async (id) => {
        await getRequest(`${ENDPOINTS.MUNICIPALITY}${id}`)
      }
    },
    city: {
      all: async () => { await getRequest(ENDPOINTS.PROVINCES) }
    }
  }
}

export default resources
