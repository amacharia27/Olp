// county-25-samburu.ts - Samburu County data
import type { County } from './location-types';

export const county25: County = {
  id: '25',
  name: 'Samburu',
  code: '025',
  subcounties: [
{
      id: '2501',
      name: 'Subcounty 1',
      wards: [
{
          id: '250101',
          name: 'Ward 1'
        },
{
          id: '250102',
          name: 'Ward 2'
        },
{
          id: '250103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '2502',
      name: 'Subcounty 2',
      wards: [
{
          id: '250201',
          name: 'Ward 1'
        },
{
          id: '250202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '2503',
      name: 'Subcounty 3',
      wards: [
{
          id: '250301',
          name: 'Ward 1'
        },
{
          id: '250302',
          name: 'Ward 2'
        },
{
          id: '250303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county25;
