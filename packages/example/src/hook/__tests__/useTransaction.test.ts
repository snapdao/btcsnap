import { useTransaction } from "../useTransaction";
import { renderHook, act } from '@testing-library/react-hooks';
import * as api from "../../api/v1/activities";
import { renderHooksWithContext } from "../../__tests__/utils/renderHookWithContext";

describe('useTransaction', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(api, 'queryActivities').mockResolvedValue({
      activities: []
    } as never)
  })
  it("should return hasMore, loading and txList when current exist ", async() => {
    const {result, waitForNextUpdate} = renderHooksWithContext(() => useTransaction({size:5}));
    await waitForNextUpdate();
    expect(result.current).toMatchObject({
      hasMore: false,
      loading: false,
      txList: [],
    })
  })

  it('should refresh transaction', async() => {
    const {result, waitForNextUpdate} = renderHooksWithContext(() => useTransaction({size:5}));
    await waitForNextUpdate();
    expect(api.queryActivities).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    })
    await waitForNextUpdate();
    expect(api.queryActivities).toBeCalledTimes(2);
  })
})
