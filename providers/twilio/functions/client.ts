import axios from 'axios'

export default function(username: string, password: string) {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Bearer'
  }

  return axios.create({
    baseURL: `https://api.twilio.com/2010-04-01/Accounts/${username}`,
    timeout: 5000,
    auth: { username, password },
    headers
  })
}
