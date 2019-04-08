/**
 * This function returns a list of charges you've previously created.
 *
 * @context event.context.authAccess.apiKey
 * @returns Charges[]
 */

import { TAPIKEYAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class FirstFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TAPIKEYAuthContext> {
  async action(event: TFetchActionEvent<Params, TAPIKEYAuthContext>): TFetchPromise<ReturnedData> {
    try {
      const apiKey = event.context.authAccess.apiKey
      const client = Client(apiKey)
      const response = await client.get('/charges')

      return { data: response.data.data }
    } catch (error) {
      return { error: 'An error has occured, ' + error.toString() }
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
  data: any[]
}
