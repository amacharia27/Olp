// county-06-taita-taveta.ts - Taita Taveta County data
import type { County } from './location-types';

export const county6: County = {
  id: '6',
  name: 'Taita Taveta',
  code: '006',
  subcounties: [
{
      id: '601',
      name: 'Subcounty 1',
      wards: [
{
          id: '60101',
          name: 'Ward 1'
        },
{
          id: '60102',
          name: 'Ward 2'
        },
{
          id: '60103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '602',
      name: 'Subcounty 2',
      wards: [
{
          id: '60201',
          name: 'Ward 1'
        },
{
          id: '60202',
          name: 'Ward 2'
        },
{
          id: '60203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '603',
      name: 'Subcounty 3',
      wards: [
{
          id: '60301',
          name: 'Ward 1'
        },
{
          id: '60302',
          name: 'Ward 2'
        },
{
          id: '60303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county6;
