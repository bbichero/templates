/**
 * This function lets you send a basic email using Mailjet infrastructure.
 *
 * @context username:string
 * @context password:string
 * @returns Success | Error
 */

import { TBASICAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class FirstFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TBASICAuthContext> {
  async action(event: TFetchActionEvent<Params, TBASICAuthContext>): TFetchPromise<ReturnedData> {
    try {
      const { username, password } = event.context.authAccess
      const client = Client(username, password)

      // Start by retrieving authorized sender list
      // see: https://dev.mailjet.com/reference/email/sender-addresses-and-domains/sender/#v3_get_sender
      const firstRequest = await client.get('/v3/REST/sender')

      if (firstRequest.data['Data'].length < 1) {
        throw Error(
          'Please set a sender addresse before continuing. Learn more here: https://dev.mailjet.com/reference/email/sender-addresses-and-domains/sender/#v3_get_sender'
        )
      }

      // Then, send a welcome email!
      const sender = firstRequest.data['Data'][0]
      const secondRequest = await client.post('/v3.1/send', {
        Messages: [
          {
            From: { Email: sender['Email'] },
            To: [{ Email: 'hello@bearer.sh' }, { Email: sender['Email'] }],
            Subject: 'Hello Bearer',
            TextPart: "Hi, \n\n I'm setting up a Bearer integration using the Mailjet template."
          }
        ]
      })
      return { data: secondRequest.data }
    } catch (err) {
      console.error(err)
    }
  }

  // Uncomment the line above if you don't want your function to be called from the frontend
  // static backendOnly = true
}

/**
 * Typing
 */
export type Params = {
  // name: string
}

export type ReturnedData = {
  // foo: string[]
}
