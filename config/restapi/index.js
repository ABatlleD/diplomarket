import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN_API_ENDPOINT}`,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

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
