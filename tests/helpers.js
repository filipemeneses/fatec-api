import Account from "../src/auth/Account";
import * as dotenv from "dotenv";
import FatecApi from "../src";

dotenv.config();

const getAccount = () => {
  const user = process.env.LOGIN;
  const pass = process.env.PASSWORD;
  if (!user || !pass || !process.env.NAME) {
    throw new Error(
      "\n\tTo test, create a file named \".env\" in the root folder and add the values:\n" +
      "\tLOGIN=TEST\n" +
      "\tPASSWORD=TEST\n" +
      "\tNAME=TEST\n"
    );
  }
  return new FatecApi.Account(user, pass);
}

export {
  getAccount
}
