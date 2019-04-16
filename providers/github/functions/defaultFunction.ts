/**
 * This function lists authenticated user repositories
 *
 * @context authAccess
 * @returns Repository[]
 */

import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class FirstFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const token = event.context.authAccess.accessToken
      const github = Client(token)
      const { data } = await github.get('/user/repos')

      const repositories = (data || []).map(repo => {
        return {
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          private: repo.private
        }
      })
      return { data: repositories }
    } catch (error) {
      return { error: error.response ? error.response.data : error.toString() }
    }
  }

  // Uncomment the line below if you don't want your function to be called from the frontend
  // static backendOnly = true
}

/**
 * Typing
 */
export type Params = {}

type Repository = {
  id: string
  name: string
  url: string
  private: boolean
}

export type ReturnedData = Repository[]
