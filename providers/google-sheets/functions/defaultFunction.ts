import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const spreadsheetId = event.params.id || '1oB6jDTYUb8_UznDhhL5RQ083Z5zn4RacuUma22_8byQ'
      const client = Client(event.context.authAccess.accessToken)
      const range = event.params.range || 'A2:D9'
      const { data } = await client.get(`${spreadsheetId}/values/${range}`)
      return {
        data: data.values.map(row => ({
          name: row[0],
          region: row[1],
          population: row[2].match('N/A') ? undefined : parseInt(row[2], 10)
        }))
      }
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
  // name: string
  id?: string
  range?: string
}

type Bear = {
  name: string
  region: string
  population?: number
}
export type ReturnedData = Bear[]
