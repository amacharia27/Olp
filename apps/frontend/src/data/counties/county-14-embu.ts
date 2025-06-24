// county-14-embu.ts - Embu County data
import type { County } from './location-types';

export const county14: County = {
  id: '14',
  name: 'Embu',
  code: '014',
  subcounties: [
{
      id: '1401',
      name: 'Subcounty 1',
      wards: [
{
          id: '140101',
          name: 'Ward 1'
        },
{
          id: '140102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1402',
      name: 'Subcounty 2',
      wards: [
{
          id: '140201',
          name: 'Ward 1'
        },
{
          id: '140202',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county14;
