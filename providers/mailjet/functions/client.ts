import axios from 'axios'

export default function(username: string, password: string) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Bearer'
  }

  return axios.create({
    baseURL: 'https://api.mailjet.com/',
    timeout: 5000,
    auth: { username, password },
    headers
  })
}
