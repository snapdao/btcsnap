export class BaseError extends Error {
  code: number | string;
  constructor(code: number | string) {
    super();
    this.code = code;
  }
  resolve = (fn: Function) => {
    fn();
  };
}
