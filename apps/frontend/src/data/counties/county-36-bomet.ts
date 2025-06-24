// county-36-bomet.ts - Bomet County data
import type { County } from './location-types';

export const county36: County = {
  id: '36',
  name: 'Bomet',
  code: '036',
  subcounties: [
{
      id: '3601',
      name: 'Subcounty 1',
      wards: [
{
          id: '360101',
          name: 'Ward 1'
        },
{
          id: '360102',
          name: 'Ward 2'
        },
{
          id: '360103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3602',
      name: 'Subcounty 2',
      wards: [
{
          id: '360201',
          name: 'Ward 1'
        },
{
          id: '360202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3603',
      name: 'Subcounty 3',
      wards: [
{
          id: '360301',
          name: 'Ward 1'
        },
{
          id: '360302',
          name: 'Ward 2'
        },
{
          id: '360303',
          name: 'Ward 3'
        },
{
          id: '360304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county36;
