/**
 * This function returns all files for the authenticated user.
 *
 * @context {string} accessToken
 * @return {File[]} data
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const googleDrive = Client(token)

      const params = { corpus: 'user', fields: 'files(id, name, mimeType)' }
      const { data } = await googleDrive.get('/files', { params })

      const files = (data.files || []).map(file => {
        return {
          id: file.id,
          url: `https://drive.google.com/open?id=${file.id}`,
          name: file.name,
          mimeType: file.mimeType
        }
      })
      return { data: files }
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
export type ReturnedData = File[]

export type File = {
  id: string
  url: string
  name: string
  mimeType: string
}
