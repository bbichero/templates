/**
 * This function returns a list of all user messages.
 *
 * @context {string, string} {username, password}
 * @return {TwilioMessage[]} data
 */

import { TBASICAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TBASICAuthContext> {
  async action(event: TFetchActionEvent<Params, TBASICAuthContext>): TFetchPromise<ReturnedData> {
    try {
      const { username, password } = event.context.auth

      const twilio = Client(username, password)
      const { data } = await twilio.get('/Messages.json')

      const messages = (data.messages || []).map(message => {
        return {
          sid: message.sid,
          date_sent: message.date_sent,
          to: message.to,
          from: message.from,
          body: message.body
        }
      })

      return { data: messages }
    } catch (error) {
      return error.response ? { error: JSON.stringify(error.response.data) } : { error: error.toString() }
    }
  }

  // Uncomment the line below to restrict the function to be called only from a server-side context
  // static serverSideRestricted = true
}

/**
 * Typing
 */
export type Params = {}

export type ReturnedData = TwilioMessage[]

export type TwilioMessage = {
  sid: string
  date_sent: string
  to: string
  from: string
  body: string
}
