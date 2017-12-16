export default class Parser {

  public static strDate (date: string): any {
    const nullDate = /(0{4})-(0{2})-(0{2})(T(0{2}):(0{2}):(0{2}))?/;
    if (nullDate.test(date)) {
      return new Date(0);
    } else {
      if (isNaN(Date.parse(date))) {
        return null;
      }
      return new Date(date);
    }
  }

  public static strNumber (n: string): number {
    return isNaN(parseFloat(n)) ? 0 : parseFloat(n);
  }

  public static nBoolean (n: number): boolean {
    return n === 1 ? true : false;
  }

  public static parseGxState (gxState: string): object {
    let data: any;
    try {
      data = JSON.parse(gxState);
    } catch (e) {
      data = JSON.parse(gxState.replace(/\\>/g, "&gt"));
    }
    return data;
  }

}
