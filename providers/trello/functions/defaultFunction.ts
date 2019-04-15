import { TOAUTH1AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
// Uncomment the line below to use the API Client
// import Client from './client'

export default class DefaultFunctionFunction extends FetchData implements FetchData<ReturnedData, any, TOAUTH1AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH1AuthContext>): TFetchPromise<ReturnedData> {
    // Put your logic here
    return { data: [] }
  }

  // Uncomment the line below to restrict the function to be called only from a server-side context
  // static serverSideRestricted = true

}

/**
 * Typing
 */
export type Params = {
  // name: string
}

export type ReturnedData = {
  // foo: string[]
}
