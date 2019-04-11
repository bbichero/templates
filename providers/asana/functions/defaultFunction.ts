/**
 * This function returns information about the authenticated user.
 *
 * @context {string} accessToken
 * @return {User} data
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const asana = Client(token)
      const { data } = await asana.get('/users/me')

      const user = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        workspaces: (data.data.workspaces || []).map(workspace => {
          return {
            id: workspace.id,
            name: workspace.name
          }
        })
      }

      return { data: user }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // Uncomment the line below to restrict the function to be called only from a server-side context
  // static serverSideRestricted = true
}

/**
 * Typing
 */
export type Params = {}
export type ReturnedData = AsanaUser

export type AsanaUser = {
  id: string
  name: string
  email: string
  workspaces: AsanaWorkspace[]
}

export type AsanaWorkspace = {
  id: string
  name: string
}
