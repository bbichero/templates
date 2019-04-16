/**
 * This function lists the latest incidents (problems or issues) associated with the authenticated account.
 *
 * @context event.context.authAccess.apiKey: string
 * @returns Incidents[]
 */

import { TAPIKEYAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class FirstFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TAPIKEYAuthContext> {
  async action(event: TFetchActionEvent<Params, TAPIKEYAuthContext>): TFetchPromise<ReturnedData> {
    try {
      const apiKey = event.context.authAccess.apiKey
      const client = Client(apiKey)
      const { data } = await client.get('/incidents')

      const incidents = (data.incidents || []).map(incident => {
        return {
          id: incident.incident_number,
          title: incident.title,
          description: incident.description,
          data: incident.created_at
        }
      })
      return { data: incidents }
    } catch (error) {
      return { error: error.response ? error.response.data : error.toString() }
    }
  }

  // Uncomment the line above if you don't want your function to be called from the frontend
  // static backendOnly = true
}

/**
 * Typing
 */

export type Params = never

export type ReturnedData = {
  data: []
}
