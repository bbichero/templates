import axios from 'axios'

export default function(token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer',
    Authorization: `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://app.asana.com/api/1.0/',
    timeout: 5000,
    headers
  })
}
