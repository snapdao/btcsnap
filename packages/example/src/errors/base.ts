export class BaseError extends Error {
  code: {
    message: string,
    code: number
  };
  constructor(code: {
    message: string,
    code: number
  }) {
    super();
    this.code = code;
  }
  resolve = (fn: Function) => {
    fn();
  };
}
