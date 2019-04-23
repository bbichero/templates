/**
 * This function returns account information from the authenticated DocuSign User.
 *
 * @context {string} accessToken
 * @return {DocuSignUser[]} data
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.auth.accessToken
      const docusign = Client(token)

      const { data } = await docusign.get('/oauth/userinfo ')

      const user = {
        name: data.name,
        created: data.created,
        email: data.email,
        accounts: (data.accounts || []).map(account => ({
          id: account.account_id,
          name: account.account_name,
          url: account.base_uri,
          isDefault: account.is_default
        }))
      }

      return { data: user }
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

export type Params = {}
export type ReturnedData = DocuSignUser

type DocuSignAccount = {
  id: string
  name: string
  url: string
  isDefault: boolean
}

type DocuSignUser = {
  name: string
  created: string
  email: string
  accounts: DocuSignAccount[]
}
