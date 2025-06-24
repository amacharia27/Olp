// county-18-nyandarua.ts - Nyandarua County data
import type { County } from './location-types';

export const county18: County = {
  id: '18',
  name: 'Nyandarua',
  code: '018',
  subcounties: [
{
      id: '1801',
      name: 'Subcounty 1',
      wards: [
{
          id: '180101',
          name: 'Ward 1'
        },
{
          id: '180102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1802',
      name: 'Subcounty 2',
      wards: [
{
          id: '180201',
          name: 'Ward 1'
        },
{
          id: '180202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1803',
      name: 'Subcounty 3',
      wards: [
{
          id: '180301',
          name: 'Ward 1'
        },
{
          id: '180302',
          name: 'Ward 2'
        },
{
          id: '180303',
          name: 'Ward 3'
        },
{
          id: '180304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county18;
