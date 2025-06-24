// county-42-kisumu.ts - Kisumu County data
import type { County } from './location-types';

export const county42: County = {
  id: '42',
  name: 'Kisumu',
  code: '042',
  subcounties: [
{
      id: '4201',
      name: 'Subcounty 1',
      wards: [
{
          id: '420101',
          name: 'Ward 1'
        },
{
          id: '420102',
          name: 'Ward 2'
        },
{
          id: '420103',
          name: 'Ward 3'
        },
{
          id: '420104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '4202',
      name: 'Subcounty 2',
      wards: [
{
          id: '420201',
          name: 'Ward 1'
        },
{
          id: '420202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4203',
      name: 'Subcounty 3',
      wards: [
{
          id: '420301',
          name: 'Ward 1'
        },
{
          id: '420302',
          name: 'Ward 2'
        },
{
          id: '420303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county42;
