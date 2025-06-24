// county-16-machakos.ts - Machakos County data
import type { County } from './location-types';

export const county16: County = {
  id: '16',
  name: 'Machakos',
  code: '016',
  subcounties: [
{
      id: '1601',
      name: 'Subcounty 1',
      wards: [
{
          id: '160101',
          name: 'Ward 1'
        },
{
          id: '160102',
          name: 'Ward 2'
        },
{
          id: '160103',
          name: 'Ward 3'
        },
{
          id: '160104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '1602',
      name: 'Subcounty 2',
      wards: [
{
          id: '160201',
          name: 'Ward 1'
        },
{
          id: '160202',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county16;
