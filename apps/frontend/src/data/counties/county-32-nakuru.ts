// county-32-nakuru.ts - Nakuru County data
import type { County } from './location-types';

export const county32: County = {
  id: '32',
  name: 'Nakuru',
  code: '032',
  subcounties: [
{
      id: '3201',
      name: 'Subcounty 1',
      wards: [
{
          id: '320101',
          name: 'Ward 1'
        },
{
          id: '320102',
          name: 'Ward 2'
        },
{
          id: '320103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3202',
      name: 'Subcounty 2',
      wards: [
{
          id: '320201',
          name: 'Ward 1'
        },
{
          id: '320202',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county32;
