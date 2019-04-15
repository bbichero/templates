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
      const { data } = await client.get('/charges')

      const charges = (data.data || []).map(charge => {
        return {
          id: charge.id,
          amount: charge.amount,
          created: charge.created,
          currency: charge.currency,
          paid: charge.paid
        }
      })

      return { data: charges }
    } catch (error) {
      return error.response ? { error: JSON.stringify(error.response.data) } : { error: error.toString() }
    }
  }

  // Uncomment the line above if you don't want your function to be called from the frontend
  // static backendOnly = true
}

/**
 * Typing
 */
export type Params = {}

type StripeCharges = {
  id: string
  amount: number
  created: number
  paid: boolean
}

export type ReturnedData = StripeCharges[]
