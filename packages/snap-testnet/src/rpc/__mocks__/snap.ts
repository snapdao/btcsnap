import {Snap} from "../../interface";

type RpcStubs = "snap_getBip32Entropy" | "snap_manageState" | "snap_dialog"

export class SnapMock implements Snap {
  public readonly registerRpcMessageHandler = jest.fn();

  public readonly requestStub = jest.fn();

  public readonly rpcStubs: Record<RpcStubs, jest.Mock> = {
    snap_getBip32Entropy: jest.fn(),
    snap_manageState: jest.fn(),
    snap_dialog: jest.fn(),
  }

  public request<T>(options: { method: RpcStubs, params: unknown[] }): Promise<T> {
    const { method, params = [] } = options;
    if (this.rpcStubs.hasOwnProperty(method)) {
      return this.rpcStubs[method].apply(params);
    }
    return this.requestStub(options);
  }

  public reset(): void {
    this.registerRpcMessageHandler.mockClear();
    this.requestStub.mockClear();
    Object.values(this.rpcStubs).forEach(
      (stub) => stub.mockClear()
    );
  }
}
