/**
 * This function lists the boards that the authenticated user is a member of.
 *
 * @context {string} consumerKey
 * @context {string} accessToken
 * @return {TrelloBoard[]} data
 */

import { TOAUTH1AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH1AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH1AuthContext>): TFetchPromise<ReturnedData> {
    try {
      // @ts-ignore
      const appkey = event.context.auth.consumerKey
      const token = event.context.auth.accessToken

      const trello = Client(appkey, token)
      const { data } = await trello.get('/members/me/boards')

      const boards = (data || []).map(board => {
        return {
          id: board.id,
          name: board.name,
          url: board.url
        }
      })
      return { data: boards }
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

export type Params = {
  boardId: string
}

export type TrelloBoard = {
  id: string
  name: string
  url: string
}

export type ReturnedData = TrelloBoard[]
