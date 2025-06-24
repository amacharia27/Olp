// county-33-narok.ts - Narok County data
import type { County } from './location-types';

export const county33: County = {
  id: '33',
  name: 'Narok',
  code: '033',
  subcounties: [
{
      id: '3301',
      name: 'Subcounty 1',
      wards: [
{
          id: '330101',
          name: 'Ward 1'
        },
{
          id: '330102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3302',
      name: 'Subcounty 2',
      wards: [
{
          id: '330201',
          name: 'Ward 1'
        },
{
          id: '330202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3303',
      name: 'Subcounty 3',
      wards: [
{
          id: '330301',
          name: 'Ward 1'
        },
{
          id: '330302',
          name: 'Ward 2'
        },
{
          id: '330303',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county33;
