import axios from 'axios'

export default function(token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://sheets.googleapis.com/v4/spreadsheets',
    timeout: 5000,
    headers
  })
}
