import axios from 'axios'

export default function(token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  return axios.create({
    // use https://account.docusign.com/ on production
    baseURL: 'https://account-d.docusign.com/',
    timeout: 5000,
    headers
  })
}
