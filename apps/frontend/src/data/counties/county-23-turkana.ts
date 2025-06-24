// county-23-turkana.ts - Turkana County data
import type { County } from './location-types';

export const county23: County = {
  id: '23',
  name: 'Turkana',
  code: '023',
  subcounties: [
{
      id: '2301',
      name: 'Subcounty 1',
      wards: [
{
          id: '230101',
          name: 'Ward 1'
        },
{
          id: '230102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '2302',
      name: 'Subcounty 2',
      wards: [
{
          id: '230201',
          name: 'Ward 1'
        },
{
          id: '230202',
          name: 'Ward 2'
        },
{
          id: '230203',
          name: 'Ward 3'
        },
{
          id: '230204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county23;
