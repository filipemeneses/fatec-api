export default class Parser {

  public static strDate (date: string) {
    const nullDate = /(0{4})-(0{2})-(0{2})(T(0{2}):(0{2}):(0{2}))?/;
    if (nullDate.test(date)) {
      return new Date(0);
    } else {
      return new Date(date);
    }
  }

  public static strNumber (n: string) {
    return isNaN(parseFloat(n)) ? 0 : parseFloat(n);
  }

  public static nBoolean (n: number) {
    return n === 1 ? true : false;
  }

}
