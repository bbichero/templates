/**
 * This function creates a Slack reminder for the authenticated user.
 *
 * @context ACCESS_TOKEN
 * @param {string|undefined} text
 * @return SlackReminder[]
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken

      const text = event.params.text || `Don't forget to bring your 🐻!`
      const time = event.params.time || 'in 2 seconds'

      const slack = Client(token)
      const { data } = await slack.post('/reminders.add', { text, time })

      const reminder = {
        id: data.reminder.id,
        text: data.reminder.text,
        creator: data.reminder.creator
      }

      return { data: [reminder] }
    } catch (error) {
      return { error: error.response ? error.response.data : error.toString() }
    }
  }

  // Uncomment the line below to restrict the function to be called only from a server-side context
  // static serverSideRestricted = true
}

/**
 * Typing
 */
export type Params = {
  text?: string
  time?: string
}

export type SlackReminder = {
  id: string
  text: string
  creator: string
}
export type ReturnedData = SlackReminder[]
