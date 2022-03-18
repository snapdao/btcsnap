import {Wallet} from "../../src/interface";
import sinon from "sinon";

export class WalletMock implements Wallet {
  public readonly registerRpcMessageHandler = sinon.stub();

  public readonly requestStub = sinon.stub()

  public readonly rpcStubs = {
    snap_getBip44Entropy_0: sinon.stub(),
    snap_getBip44Entropy_1: sinon.stub(),
    snap_confirm: sinon.stub(),
  }

  public request(options: { method: string, params: unknown[] }): Promise<unknown> {
    const { method, params = [] } = options;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      return (this.rpcStubs as any)[method](...params)
    }
    return this.requestStub(options)
  }

  public reset(): void {
    this.registerRpcMessageHandler.reset();
    this.requestStub.reset();
    Object.values(this.rpcStubs).forEach(
      (stub: ReturnType<typeof sinon.stub>) => stub.reset()
    );
  }
}