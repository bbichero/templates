/**
 * This function lists the boards that the authenticated user is a member of.
 *
 * @context {string} apiKey
 * @return {Campaigns[]} data
 */

import { TAPIKEYAuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TAPIKEYAuthContext> {
  async action(event: TFetchActionEvent<Params, TAPIKEYAuthContext>): TFetchPromise<ReturnedData> {
    try {
      const { apiKey } = event.context.authAccess

      const mailchimp = Client(apiKey)
      const { data } = await mailchimp.get('/campaigns')

      const campaigns = (data || []).map(campaign => {
        return {
          id: campaign.id,
          subject: campaign.settings.subject_line,
          counter: campaign.emails_sent
        }
      })
      return { data: campaigns }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // Uncomment the line above if you don't want your function to be called from the frontend
  // static backendOnly = true
}

/**
 * Typing
 */

export type Params = {}

export type Campaigns = {
  id: string
  subject: string
  counter: number
}

export type ReturnedData = Campaigns[]
