export class SnapError extends Error {
  code: number
  constructor(code: number) {
    super();
    this.code = code;
  }
  
  static of({code, message}: {code: number, message: string}){
    const snapError = new SnapError(code)
    snapError.message = message
    return snapError
  }
}
