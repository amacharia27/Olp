// county-31-laikipia.ts - Laikipia County data
import type { County } from './location-types';

export const county31: County = {
  id: '31',
  name: 'Laikipia',
  code: '031',
  subcounties: [
{
      id: '3101',
      name: 'Subcounty 1',
      wards: [
{
          id: '310101',
          name: 'Ward 1'
        },
{
          id: '310102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3102',
      name: 'Subcounty 2',
      wards: [
{
          id: '310201',
          name: 'Ward 1'
        },
{
          id: '310202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3103',
      name: 'Subcounty 3',
      wards: [
{
          id: '310301',
          name: 'Ward 1'
        },
{
          id: '310302',
          name: 'Ward 2'
        },
{
          id: '310303',
          name: 'Ward 3'
        },
{
          id: '310304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county31;
