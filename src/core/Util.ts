import Parser from "core/Parser";

export default class Util {

  public static getPrefixProperties (gxState: string | object): string {
    if (typeof gxState === "string") {
      gxState = Parser.parseGxState(gxState);
    }
    const [prefix] = Object.keys(gxState).join(",").match(/MPW\d{4}/) || ["MPW0041"];
    return prefix;
  }

}
