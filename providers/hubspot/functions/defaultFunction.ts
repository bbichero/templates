/**
 * This function lists all the contacts that have been created in Hubspot portal.
 *
 * @context ACCESS_TOKEN
 * @returns Contact[]
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class FirstFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const hubspot = Client(token)
      const { data } = await hubspot.get('/contacts/v1/lists/all/contacts/all')

      const contacts = (data.contacts || []).map(contact => {
        const properties = {
          // Default values
          firstname: { value: '' },
          lastname: { value: '' },
          company: { value: '' },

          // API values override default (if exist)
          ...(contact.properties || {})
        }

        return {
          firstname: properties.firstname.value,
          lastname: properties.lastname.value,
          company: properties.company.value
        }
      })
      return { data: contacts }
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
export type Params = {}

type Contact = {
  firstname: string
  lastname: string
  company: string
}

export type ReturnedData = Contact[]
