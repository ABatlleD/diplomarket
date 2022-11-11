import axios from 'axios'

export const AxiosBackendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN_API_ENDPOINT}`
  }
})

export const AxiosApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
    // Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN_API_ENDPOINT}`,
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

// Axios Verbs

export async function getRequest(URL) {
  return await AxiosBackendClient.get(`${URL}`).then(response => response)
}

export async function postRequest(URL, payload) {
  return await AxiosBackendClient.post(`${URL}`, payload).then(response => response)
}

export async function putRequest(URL, payload) {
  return await AxiosBackendClient.patch(`${URL}`, payload).then(response => response)
}

export async function deleteRequest(URL) {
  return await AxiosBackendClient.delete(`${URL}`).then(response => response)
}
