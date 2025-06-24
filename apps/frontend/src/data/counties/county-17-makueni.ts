// county-17-makueni.ts - Makueni County data
import type { County } from './location-types';

export const county17: County = {
  id: '17',
  name: 'Makueni',
  code: '017',
  subcounties: [
{
      id: '1701',
      name: 'Subcounty 1',
      wards: [
{
          id: '170101',
          name: 'Ward 1'
        },
{
          id: '170102',
          name: 'Ward 2'
        },
{
          id: '170103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '1702',
      name: 'Subcounty 2',
      wards: [
{
          id: '170201',
          name: 'Ward 1'
        },
{
          id: '170202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1703',
      name: 'Subcounty 3',
      wards: [
{
          id: '170301',
          name: 'Ward 1'
        },
{
          id: '170302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county17;
