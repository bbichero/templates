import { TCUSTOMAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
// Uncomment the line below to use the API Client
import Client from './client'

export default class MyFunctionFunction extends FetchData implements FetchData<ReturnedData, any, TCUSTOMAuthContext> {
  async action(event: TFetchActionEvent<Params, TCUSTOMAuthContext>): TFetchPromise<ReturnedData> {
    // Put your logic here
    try {
      const ovh = Client(process.env.APP_KEY, process.env.APP_SECRET, process.env.CONSUMER_KEY)

      const { data } = await ovh.get('/domain', {})

      const domains = (data || []).map(domain => {
        return {
          name: domain.name,
        }
      })

      return { data: domains }
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
export type ReturnedData = Domains[]

export type Domains = {
  name: string
}

