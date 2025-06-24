// county-24-west-pokot.ts - West Pokot County data
import type { County } from './location-types';

export const county24: County = {
  id: '24',
  name: 'West Pokot',
  code: '024',
  subcounties: [
{
      id: '2401',
      name: 'Subcounty 1',
      wards: [
{
          id: '240101',
          name: 'Ward 1'
        },
{
          id: '240102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '2402',
      name: 'Subcounty 2',
      wards: [
{
          id: '240201',
          name: 'Ward 1'
        },
{
          id: '240202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '2403',
      name: 'Subcounty 3',
      wards: [
{
          id: '240301',
          name: 'Ward 1'
        },
{
          id: '240302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county24;
