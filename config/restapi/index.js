import axios from 'axios'

export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN_API_ENDPOINT}`
  }
})

// Axios Verbs

export async function getRequest(URL) {
  return await AxiosClient.get(`${URL}`).then(response => response)
}

export async function postRequest(URL, payload) {
  return await AxiosClient.post(`/${URL}`, payload).then(response => response)
}

export async function putRequest(URL, payload) {
  return await AxiosClient.patch(`/${URL}`, payload).then(response => response)
}

export async function deleteRequest(URL) {
  return await AxiosClient.delete(`/${URL}`).then(response => response)
}
