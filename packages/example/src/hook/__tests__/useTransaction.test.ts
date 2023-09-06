import { useTransaction } from '../useTransaction';
import { act } from '@testing-library/react-hooks';
import * as api from '../../api/v1/activities';
import { renderHooksWithContext } from '../../__tests__/utils/renderHookWithContext';

jest.mock('../../api/v1/activities', () => ({
  queryActivities: jest.fn().mockResolvedValue({ activities: [
    {
      'id': '694450751165972480',
      'txid': 'f1b6b41b542482c3b522ce0c235358f897e8377c2ba96b81f9ab9a2b085e2a3d',
      'explorerUrl': 'https://www.blockchain.com/btc-testnet/tx/f1b6b41b542482c3b522ce0c235358f897e8377c2ba96b81f9ab9a2b085e2a3d',
      'action': 'send_external',
      'amount': 27232,
      'memo': '',
      'status': 'complete',
      'modifiedTime': 1665569961.34958,
      'createdTime': 1665569961.349537,
      'senderAddresses': [
        'tb1qfrzssvcwucgadrcp043yftnq34xk0a9wgy98rn'
      ],
      'receiverAddresses': [
        [
          '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          20000,
          'M/49\'/1\'/0\'/0/0'
        ],
        [
          'tb1q9ue9cer6gp0dl2kf067290xwwcsnhnqe0sk5xz',
          1471113,
          'M/84\'/1\'/0\'/1/1'
        ]
      ],
      'confirmedNum': 2,
      'confirmThreshold': 2,
      'fee': 7232,
      'replacedBy': ''
    },
    {
      'id': '694394178305540096',
      'txid': '1ebe5975480c13bf1b6a5418a14f91ee9113fe5af195fd7832527a398bc1a7c9',
      'explorerUrl': 'https://www.blockchain.com/btc-testnet/tx/1ebe5975480c13bf1b6a5418a14f91ee9113fe5af195fd7832527a398bc1a7c9',
      'action': 'send_external',
      'amount': 110848,
      'memo': '',
      'status': 'complete',
      'modifiedTime': 1665556473.328639,
      'createdTime': 1665556473.328601,
      'senderAddresses': [
        'tb1qmu9n2csuk42dczlt6eek6x6sar9kghpacpqsnu'
      ],
      'receiverAddresses': [
        [
          '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          100000,
          'M/49\'/1\'/0\'/0/0'
        ],
        [
          'tb1qfrzssvcwucgadrcp043yftnq34xk0a9wgy98rn',
          1498345,
          'M/84\'/1\'/0\'/1/0'
        ]
      ],
      'confirmedNum': 2,
      'confirmThreshold': 2,
      'fee': 10848,
      'replacedBy': ''
    }
  ] }),
  ActivityStatus: jest.fn().mockReturnValue({
    Confirming: 'Confirming',
    Complete: 'complete',
    Pending: 'pending',
    Failed: 'failed',
    ToBeMultiSigned: 'to_be_multi_signed',
    Other: 'other',
  })
}));

describe('useTransaction', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return hasMore and txList when current exist', async() => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useTransaction({ size:5 }));
    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      hasMore: true,
      loading: false,
      txList: [
        {
          'ID': 'f1b6b41b542482c3b522ce0c235358f897e8377c2ba96b81f9ab9a2b085e2a3d',
          'address': '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          'amount': 20000,
          'confirmThreshold': 2,
          'confirmedNum': 2,
          'date': 1665569961349,
          'fee': 7232,
          'from': 'tb1qfrzssvcwucgadrcp043yftnq34xk0a9wgy98rn',
          'marker': 1665569961.34958,
          'status': 'pending',
          'to': '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          'type': 'sent',
          'url': 'https://www.blockchain.com/btc-testnet/tx/f1b6b41b542482c3b522ce0c235358f897e8377c2ba96b81f9ab9a2b085e2a3d',
        },
        {
          'ID': '1ebe5975480c13bf1b6a5418a14f91ee9113fe5af195fd7832527a398bc1a7c9',
          'address': '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          'amount': 100000,
          'confirmThreshold': 2,
          'confirmedNum': 2,
          'date': 1665556473328,
          'fee': 10848,
          'from': 'tb1qmu9n2csuk42dczlt6eek6x6sar9kghpacpqsnu',
          'marker': 1665556473.328639,
          'status': 'pending',
          'to': '2MyhDKPYhnYAnJWCu26Q6fhMCZGMRA8KjXD',
          'type': 'sent',
          'url': 'https://www.blockchain.com/btc-testnet/tx/1ebe5975480c13bf1b6a5418a14f91ee9113fe5af195fd7832527a398bc1a7c9',
        },
      ],
    });
  });

  it('should be able to refresh transaction', async() => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useTransaction({ size:5 }));
    await waitForNextUpdate();
    expect(api.queryActivities).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(api.queryActivities).toBeCalledTimes(2);
  });
});
