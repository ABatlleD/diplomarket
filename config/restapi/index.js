import axios from 'axios'
import { getCookie } from 'cookies-next'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN_API_ENDPOINT}`,
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  Cookie: `NEXT_LOCALE=${getCookie('NEXT_LOCALE')};`
}

axiosClient.defaults.timeout = 100000

axiosClient.defaults.withCredentials = true

// Axios Verbs

export async function getRequest(URL) {
  return await axiosClient.get(`${URL}`).then(response => response)
}

export async function postRequest(URL, payload) {
  return await axiosClient.post(`/${URL}`, payload).then(response => response)
}

export async function putRequest(URL, payload) {
  return await axiosClient.patch(`/${URL}`, payload).then(response => response)
}

export async function deleteRequest(URL) {
  return await axiosClient.delete(`/${URL}`).then(response => response)
}
