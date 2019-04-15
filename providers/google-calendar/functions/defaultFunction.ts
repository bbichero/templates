/**
 * This function returns latest events of the authenticated user primary calendar.
 *
 * @context {string} accessToken
 * @return {CalendarEvent[]} data
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const googleCalendar = Client(token)

      const params = { maxResults: 10, timeMin: new Date().toISOString() }
      const { data } = await googleCalendar.get('/calendars/primary/events', { params })

      const events = (data.items || []).map(event => {
        return {
          title: event.summary,
          date: {
            start: event.start && event.start.dateTime,
            end: event.end && event.end.dateTime
          }
        }
      })
      return { data: events }
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
export type ReturnedData = CalendarEvent[]

export type CalendarEvent = {
  title: string
  date: {
    start: string
    end: string
  }
}
