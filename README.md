# fatec-api

API for SIGA from Centro Paula Souza made for students to create scripts based in their profile data.

# Usage

Install the package:

```sh
npm install fatec-api --save
```

Start to use it:

```js
const FatecApi = require('fatec-api')

const USERNAME = 'YOUR_USERNAME'
const PASSWORD = 'YOUR_PASSWORD'

let account = new FatecApi.Account(USERNAME, PASSWORD)

account.login().then(() => {
  return account.getName()
})
// <- USER NAME
```

# Documentation

## Account (user: string, password: string)

#### `.login(): Promise`

This will request SIGA for access and set the account as logged in.

#### `.getName(): Promise<string>`

Will return the account's user name

#### `.getRegisteredEmails(): Promise<IRegisteredEmail[]>`

Will return a list of registered emails and it's respective integrations:

```
[{
  email: string,
  integrations: [ 'fatec', 'etec', 'preferential', 'websai']
}]
```


# Development

1. **Clone:**
```sh
git clone https://github.com/filipemeneses/fatec-api.git
cd fatec-api
```
2. **Install:**
```sh
npm i
```
3. **Test:**

  Create the `.env` file in the root with the required values to test.
  ```
  LOGIN=TEST
  PASSWORD=TEST
  NAME=TEST
  ```

  There is two important test files to keep track with:

  - `tests/FatecApi.test.ts` to test the library features
  ```sh
  npm run test:api
  ```

  - `tests/Siga.test.ts` to test the integrity of SIGA (check if scrapped tags remains the same)
  ```sh
  npm run test:siga
  ```

  To test all:
  ```sh
  npm run test
  ```
