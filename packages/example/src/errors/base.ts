export class BaseError extends Error {
  code: number
  constructor(code: number) {
    super();
    this.code = code;
  }
  resolve = (fn: () => void) => {
    fn();
  };
}
