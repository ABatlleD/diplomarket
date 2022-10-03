import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'https://fakestoreapi.com'

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}

axiosClient.defaults.timeout = 10000

axiosClient.defaults.withCredentials = false

// Axios Verbs

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response)
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response)
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response)
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response)
}
