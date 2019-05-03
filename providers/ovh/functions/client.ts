import axios from 'axios'
import * as crypto from 'crypto'

function signRequest(appSecret: string, consumerKey: string, httpMethod: string, url: string, body: string, timestamp: number) {
  let s = [
    appSecret,
    consumerKey,
    httpMethod,
    url,
    body || '',
    timestamp
  ]
console.log(s);
 
  return '$1$' + crypto.createHash('sha1').update(s.join('+')).digest('hex')
}

export default function(appKey: string, appSecret: string, consumerKey: string) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Ovh-Application': `${appKey}`,
    'X-Ovh-Consumer': `${consumerKey}`,
    'X-Ovh-Signature': signRequest(
      appSecret, consumerKey, 'GET',
      'https://eu.api.ovh.com/1.0/domain', null, Math.round(Date.now() / 1000)),
    'X-Ovh-Timestamp': Math.round(Date.now() / 1000)
  }
console.log(headers);

  return axios.create({
    baseURL: 'https://eu.api.ovh.com/1.0',
    timeout: 5000,
    headers
  })
}
