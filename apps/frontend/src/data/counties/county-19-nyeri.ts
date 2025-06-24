// county-19-nyeri.ts - Nyeri County data
import type { County } from './location-types';

export const county19: County = {
  id: '19',
  name: 'Nyeri',
  code: '019',
  subcounties: [
{
      id: '1901',
      name: 'Subcounty 1',
      wards: [
{
          id: '190101',
          name: 'Ward 1'
        },
{
          id: '190102',
          name: 'Ward 2'
        },
{
          id: '190103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '1902',
      name: 'Subcounty 2',
      wards: [
{
          id: '190201',
          name: 'Ward 1'
        },
{
          id: '190202',
          name: 'Ward 2'
        },
{
          id: '190203',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county19;
