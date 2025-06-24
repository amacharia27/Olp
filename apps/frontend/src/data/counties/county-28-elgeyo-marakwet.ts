// county-28-elgeyo-marakwet.ts - Elgeyo Marakwet County data
import type { County } from './location-types';

export const county28: County = {
  id: '28',
  name: 'Elgeyo Marakwet',
  code: '028',
  subcounties: [
{
      id: '2801',
      name: 'Subcounty 1',
      wards: [
{
          id: '280101',
          name: 'Ward 1'
        },
{
          id: '280102',
          name: 'Ward 2'
        },
{
          id: '280103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '2802',
      name: 'Subcounty 2',
      wards: [
{
          id: '280201',
          name: 'Ward 1'
        },
{
          id: '280202',
          name: 'Ward 2'
        },
{
          id: '280203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '2803',
      name: 'Subcounty 3',
      wards: [
{
          id: '280301',
          name: 'Ward 1'
        },
{
          id: '280302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county28;
