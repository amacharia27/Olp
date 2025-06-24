// county-41-siaya.ts - Siaya County data
import type { County } from './location-types';

export const county41: County = {
  id: '41',
  name: 'Siaya',
  code: '041',
  subcounties: [
{
      id: '4101',
      name: 'Subcounty 1',
      wards: [
{
          id: '410101',
          name: 'Ward 1'
        },
{
          id: '410102',
          name: 'Ward 2'
        },
{
          id: '410103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '4102',
      name: 'Subcounty 2',
      wards: [
{
          id: '410201',
          name: 'Ward 1'
        },
{
          id: '410202',
          name: 'Ward 2'
        },
{
          id: '410203',
          name: 'Ward 3'
        },
{
          id: '410204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county41;
