/**
 * This function returns a list of dashboards owned by or shared with the user.
 *
 * @context {string} accessToken
 * @return {JiraDashboard[]} data
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const domain = 'https://your-domain.atlassian.net/'

      const jira = Client(domain, token)

      const { data } = await jira.get('/dashboard')

      const dashboards = (data.dashboards || []).map(dashboard => {
        return {
          id: dashboard.id,
          name: dashboard.name,
          url: dashboard.self
        }
      })
      return { data: dashboards }
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
export type ReturnedData = JiraDashboard[]

export type JiraDashboard = {
  id: string
  name: string
  url: string
}
