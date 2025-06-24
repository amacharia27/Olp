// county-13-tharaka-nithi.ts - Tharaka Nithi County data
import type { County } from './location-types';

export const county13: County = {
  id: '13',
  name: 'Tharaka Nithi',
  code: '013',
  subcounties: [
{
      id: '1301',
      name: 'Subcounty 1',
      wards: [
{
          id: '130101',
          name: 'Ward 1'
        },
{
          id: '130102',
          name: 'Ward 2'
        },
{
          id: '130103',
          name: 'Ward 3'
        },
{
          id: '130104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '1302',
      name: 'Subcounty 2',
      wards: [
{
          id: '130201',
          name: 'Ward 1'
        },
{
          id: '130202',
          name: 'Ward 2'
        },
{
          id: '130203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '1303',
      name: 'Subcounty 3',
      wards: [
{
          id: '130301',
          name: 'Ward 1'
        },
{
          id: '130302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county13;
