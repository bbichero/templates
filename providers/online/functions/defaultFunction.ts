/**
 * This function lists all safes from online c14 storage
 *
 * @context event.context.auth.accessToken: string
 * @returns Safes[] | error
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.auth.accessToken
      const online = Client(token)

      const { data } = await online.get('/storage/c14/safe', {})

      const safes = (data || []).map(safe => {
        return {
          name: safe.name,
          status: safe.status,
        }
      })

      return { data: safes }
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

export type Safes = {
  name: string
  status: string
}

export type ReturnedData = Safes[]
