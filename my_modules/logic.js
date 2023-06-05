export class Calculator {
  static #operators = {
    "+": this.add,
    "-": this.sub,
    "*": this.mul,
    "%": this.mod,
    x: this.mul,
    "/": this.div,
    "=": this.parse,
  };

  static add = (el1, el2) => el1 + el2;
  static sub = (el1, el2) => el1 - el2;
  static mul = (el1, el2) => el1 * el2;
  static div = (el1, el2) => el1 / el2;

  static parse(str) {
    const indirectEval = eval; //this is for esbuild bundler. it doesn't support direct eval
    let result = Number(indirectEval(str));
    return result;
  }

  static isOperator(str) {
    let result = str in this.#operators;
    return result;
  }
}
