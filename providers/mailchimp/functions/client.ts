import axios from 'axios'

export default function(apikey: string, datacenter?: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer'
  }

  const dc = datacenter ? datacenter : apikey.split('-').pop()

  return axios.create({
    baseURL: `https://${dc || 'us1'}.api.mailchimp.com/3.0/`,
    timeout: 5000,
    auth: { username: 'anystring', password: apikey },
    headers
  })
}
