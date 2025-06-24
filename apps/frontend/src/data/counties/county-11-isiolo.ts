// county-11-isiolo.ts - Isiolo County data
import type { County } from './location-types';

export const county11: County = {
  id: '11',
  name: 'Isiolo',
  code: '011',
  subcounties: [
{
      id: '1101',
      name: 'Subcounty 1',
      wards: [
{
          id: '110101',
          name: 'Ward 1'
        },
{
          id: '110102',
          name: 'Ward 2'
        },
{
          id: '110103',
          name: 'Ward 3'
        },
{
          id: '110104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '1102',
      name: 'Subcounty 2',
      wards: [
{
          id: '110201',
          name: 'Ward 1'
        },
{
          id: '110202',
          name: 'Ward 2'
        },
{
          id: '110203',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county11;
