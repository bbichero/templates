/**
 * This function lists all your forms from Typeform.
 *
 * @context ACCESS_TOKEN
 * @returns Contact[]
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const typeform = Client(token)
      const { data } = await typeform.get('/forms')

      const forms = (data.items || []).map(form => {
        return {
          id: form.id,
          title: form.title,
          url: form.self.href
        }
      })

      return { data: forms }
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

export type Form = {
  id: string
  title: string
  url: string
}

export type ReturnedData = Form[]
