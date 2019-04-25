<h1 align="center">
  <br>
  <a href="https://www.bearer.sh">
    <img src="https://www.bearer.sh/static/logo-d32d08802baea0238ffecdc9055bc133.svg" alt="Twilio" height="100">
  </a>
  <br>
  Bearer Template for Twilio API
  <br>
</h1>

<h4 align="center">A pre-configured solution to quickly integrate with Twilio API.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#functions">Functions</a> •
  <a href="#in-your-app">In your app</a> •
  <a href="#more-templates">More templates</a> •
  <a href="#license">License</a>
</p>

## Key Features

- **pre-configured:** with an API client ready to query Twilio API
- **built-in authentication process:** no need to re-implement an OAuth2 handler
- **TypeScript**: our Functions system reposes on TypeScript
- **integrate seemlessly:** quickly use it on your app with our integration clients
- **monitor and log**: every API call to the Twilio API is traceable
- **hosted and scalable:** focus on the business-logic, we take care of the rest

## How To Use

1. First, clone this template:

   ```console
   $ git clone https://github.com/Bearer/templates && cd templates/providers/twilio
   ```

2. Install dependencies:

   ```console
   $ npm install
   ```

3. Setup your Twilio integration.

   1. Start by creating an account on [Twilio developer website](https://www.twilio.com/docs/).
   2. Then create an app following [this link](https://www.twilio.com/console).
   3. Once ready, setup your integration locally:
      ```console
      $ npm run bearer setup:auth
      ```

4. Test the pre-built function:

   ```console
   $ npm run bearer invoke defaultFunction
   ```

5. Start coding your own function:

   ```console
   $ npm run bearer generate:function myFunction
   ```

6. Deploy on Bearer platform:
   ```console
   $ npm run bearer push
   ```

## Functions

A default function (see the file `functions/defaultFunction`) is provided to quickly start querying Twilio API. It returns basic information about the authenticated user.

```typescript
import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import Client from './client'

export default class DefaultFunctionFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
    try {
      const { username, password } = event.context.auth

      const twilio = Client(username, password)
      const { data } = await twilio.get('/Messages.json')

      const messages = (data.messages || []).map(message => {
        return {
          sid: message.sid,
          date_sent: message.date_sent,
          to: message.to,
          from: message.from,
          body: message.body
        }
      })

      return { data: messages }
    } catch (error) {
      return error.response ? { error: JSON.stringify(error.response.data) } : { error: error.toString() }
    }
  }
}
```

If you dive deeper, you'll see that:

1. Bearer injects the API credentials directly into the function's context:

   ```typescript
   const token = event.context.authAccess.accessToken
   ```

2. This template includes a pre-configured API client to query Twilio API:

   ```typescript
   const twilio = Client(username, password)
   const { data } = await twilio.get('/Messages.json')
   ```

   The API client is configured in `functions/client.ts`

3. You can do any data manipulation or even make multiple API call.

## In Your App

Bearer works as a hosting solution for your API integrations. Using it from your app is made easy with integrations clients available in NodeJS, Python, Ruby, VanillaJS, React, etc. More on that [in the documentation](https://docs.bearer.sh/working-with-bearer/integration-clients).

## More Templates

Bearer proposes tons of templates to help you easily integrate with all APIs. Including: [Airtable](/providers/airtable), [Dropbox](/providers/dropbox), [Google Suite](/providers/google-drive), [GitHub template](/providers/github), [Mailchimp](/Bearer/templates/providers/mailchimp),
[Slack](/providers/slack), [Stripe](/providers/stripe), [Trello](/providers/trello), [Typeform](/providers/typeform), [Zendesk](/providers/zendesk)...

[Explore them all on our website](https://www.bearer.sh/integrations).

## License

Bearer is [MIT licensed](https://github.com/Bearer/templates/blob/master/LICENSE).
