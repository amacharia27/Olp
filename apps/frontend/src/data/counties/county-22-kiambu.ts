// county-22-kiambu.ts - Kiambu County data
import type { County } from './location-types';

export const county22: County = {
  id: '22',
  name: 'Kiambu',
  code: '022',
  subcounties: [
{
      id: '2201',
      name: 'Subcounty 1',
      wards: [
{
          id: '220101',
          name: 'Ward 1'
        },
{
          id: '220102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '2202',
      name: 'Subcounty 2',
      wards: [
{
          id: '220201',
          name: 'Ward 1'
        },
{
          id: '220202',
          name: 'Ward 2'
        },
{
          id: '220203',
          name: 'Ward 3'
        },
{
          id: '220204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county22;
