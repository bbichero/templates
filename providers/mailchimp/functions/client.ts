import axios from 'axios'

export default function(apikey: string, datacenter?: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer'
  }

  return axios.create({
    baseURL: `https://${datacenter || 'us1'}.api.mailchimp.com/3.0/`,
    timeout: 5000,
    auth: { username: 'anystring', password: apikey },
    headers
  })
}
