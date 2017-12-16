# fatec-api

API for SIGA from Centro Paula Souza made for students to create scripts based in their profile data.

# Usage

Install the package:

```sh
npm install fatec-api --save
```

Check the documentation at: https://filipemeneses.gitbooks.io/fatec-api/


# Documentation

Available at: https://filipemeneses.gitbooks.io/fatec-api/

# Discussion

Available at: https://discord.gg/RUv5Kxw

# How it works

This library scrap data using HTTP requests with `request` and parses the HTML with `cheerio` library.

The `Account` class does the heavy lifting. Here's the flow of Account.getName():

![](https://filipemeneses.gitbooks.io/fatec-api/content/assets/requests.svg)

The scrapped data is later available at `Account.student` on an account instance.

Check out the [documentation](https://filipemeneses.gitbooks.io/fatec-api/) for more info.


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
