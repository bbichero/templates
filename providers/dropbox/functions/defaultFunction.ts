/**
 * This function lists all files within the root folder of a user Dropbox account.
 *
 * @context event.context.authAccess.accessToken: string
 * @returns File[] | error
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const dropbox = Client(token)

      const { data } = await dropbox.post('files/list_folder', { path: '' })

      const files = (data.entries || []).map(file => {
        return {
          id: file.id,
          name: file.name,
          path: file.path_lower,
          isFolder: file['.tag'] == 'folder'
        }
      })

      return { data: files }
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

export type File = {
  id: string
  name: string
  path: string
  isFolder: boolean
}

export type ReturnedData = File[]
