// county-30-baringo.ts - Baringo County data
import type { County } from './location-types';

export const county30: County = {
  id: '30',
  name: 'Baringo',
  code: '030',
  subcounties: [
{
      id: '3001',
      name: 'Subcounty 1',
      wards: [
{
          id: '300101',
          name: 'Ward 1'
        },
{
          id: '300102',
          name: 'Ward 2'
        },
{
          id: '300103',
          name: 'Ward 3'
        },
{
          id: '300104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '3002',
      name: 'Subcounty 2',
      wards: [
{
          id: '300201',
          name: 'Ward 1'
        },
{
          id: '300202',
          name: 'Ward 2'
        },
{
          id: '300203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3003',
      name: 'Subcounty 3',
      wards: [
{
          id: '300301',
          name: 'Ward 1'
        },
{
          id: '300302',
          name: 'Ward 2'
        },
{
          id: '300303',
          name: 'Ward 3'
        },
{
          id: '300304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county30;
