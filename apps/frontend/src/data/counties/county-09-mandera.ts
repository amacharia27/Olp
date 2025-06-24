// county-09-mandera.ts - Mandera County data
import type { County } from './location-types';

export const county9: County = {
  id: '9',
  name: 'Mandera',
  code: '009',
  subcounties: [
{
      id: '901',
      name: 'Subcounty 1',
      wards: [
{
          id: '90101',
          name: 'Ward 1'
        },
{
          id: '90102',
          name: 'Ward 2'
        },
{
          id: '90103',
          name: 'Ward 3'
        },
{
          id: '90104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '902',
      name: 'Subcounty 2',
      wards: [
{
          id: '90201',
          name: 'Ward 1'
        },
{
          id: '90202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '903',
      name: 'Subcounty 3',
      wards: [
{
          id: '90301',
          name: 'Ward 1'
        },
{
          id: '90302',
          name: 'Ward 2'
        },
{
          id: '90303',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '904',
      name: 'Subcounty 4',
      wards: [
{
          id: '90401',
          name: 'Ward 1'
        },
{
          id: '90402',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county9;
