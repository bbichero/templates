import axios from 'axios'

export default function(domain: string, token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  return axios.create({
    baseURL: `${domain}/rest/api/3/`,
    timeout: 5000,
    headers
  })
}
