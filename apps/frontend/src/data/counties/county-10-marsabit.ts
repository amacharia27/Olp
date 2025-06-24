// county-10-marsabit.ts - Marsabit County data
import type { County } from './location-types';

export const county10: County = {
  id: '10',
  name: 'Marsabit',
  code: '010',
  subcounties: [
{
      id: '1001',
      name: 'Subcounty 1',
      wards: [
{
          id: '100101',
          name: 'Ward 1'
        },
{
          id: '100102',
          name: 'Ward 2'
        },
{
          id: '100103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '1002',
      name: 'Subcounty 2',
      wards: [
{
          id: '100201',
          name: 'Ward 1'
        },
{
          id: '100202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1003',
      name: 'Subcounty 3',
      wards: [
{
          id: '100301',
          name: 'Ward 1'
        },
{
          id: '100302',
          name: 'Ward 2'
        },
{
          id: '100303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county10;
