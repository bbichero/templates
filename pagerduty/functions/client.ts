import axios from 'axios'

export default function(token: string) {
  const headers = {
    Accept: 'application/vnd.pagerduty+json;version=2',
    'User-Agent': 'Bearer',
    Authorization: `Token token=${token}`
  }

  return axios.create({
    baseURL: 'https://api.pagerduty.com/',
    timeout: 5000,
    headers
  })
}
