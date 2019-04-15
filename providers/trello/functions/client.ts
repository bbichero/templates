import axios from 'axios'

export default function(key: string, token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer'
  }

  return axios.create({
    baseURL: 'https://api.hubapi.com',
    timeout: 5000,
    headers,
    params: {
      key, // APP key
      token // OAuth1 access token
    }
  })
}
