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
// <- User name
```

# Documentation

## Account (user: string, password: string)

#### .login(): Promise

This will request SIGA for access and set the account as logged in.

#### .getName(): string

Will return the account's user name



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

  Create the `.env` file in the root with the required values to test available at `tests/FatecApi.test.ts`. Then run:
```sh
npm run test
```
