// county-37-kakamega.ts - Kakamega County data
import type { County } from './location-types';

export const county37: County = {
  id: '37',
  name: 'Kakamega',
  code: '037',
  subcounties: [
{
      id: '3701',
      name: 'Subcounty 1',
      wards: [
{
          id: '370101',
          name: 'Ward 1'
        },
{
          id: '370102',
          name: 'Ward 2'
        },
{
          id: '370103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3702',
      name: 'Subcounty 2',
      wards: [
{
          id: '370201',
          name: 'Ward 1'
        },
{
          id: '370202',
          name: 'Ward 2'
        },
{
          id: '370203',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county37;
