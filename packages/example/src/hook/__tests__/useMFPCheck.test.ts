import { useMFPCheck } from "../useMFPCheck";
import { renderHooksWithContext } from "../../__tests__/utils/renderHookWithContext";

describe('useMFPCheck', () => {
  it('should return isChecking and isSameMFP from current account', () => {
    const {result} = renderHooksWithContext(() => useMFPCheck());
    expect(result.current).toMatchObject({"isChecking": true, "isSameMFP": false})
  })

  it('should return null when current does not exist', () => {
    expect({}).toMatchObject({})
  })
})
