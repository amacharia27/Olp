// county-47-nairobi.ts - Nairobi County data
import type { County } from './location-types';

export const county47: County = {
  id: '47',
  name: 'Nairobi',
  code: '047',
  subcounties: [
{
      id: '4701',
      name: 'Subcounty 1',
      wards: [
{
          id: '470101',
          name: 'Ward 1'
        },
{
          id: '470102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4702',
      name: 'Subcounty 2',
      wards: [
{
          id: '470201',
          name: 'Ward 1'
        },
{
          id: '470202',
          name: 'Ward 2'
        },
{
          id: '470203',
          name: 'Ward 3'
        },
{
          id: '470204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '4703',
      name: 'Subcounty 3',
      wards: [
{
          id: '470301',
          name: 'Ward 1'
        },
{
          id: '470302',
          name: 'Ward 2'
        },
{
          id: '470303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county47;
