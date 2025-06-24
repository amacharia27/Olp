// county-07-garissa.ts - Garissa County data
import type { County } from './location-types';

export const county7: County = {
  id: '7',
  name: 'Garissa',
  code: '007',
  subcounties: [
{
      id: '701',
      name: 'Subcounty 1',
      wards: [
{
          id: '70101',
          name: 'Ward 1'
        },
{
          id: '70102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '702',
      name: 'Subcounty 2',
      wards: [
{
          id: '70201',
          name: 'Ward 1'
        },
{
          id: '70202',
          name: 'Ward 2'
        },
{
          id: '70203',
          name: 'Ward 3'
        },
{
          id: '70204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '703',
      name: 'Subcounty 3',
      wards: [
{
          id: '70301',
          name: 'Ward 1'
        },
{
          id: '70302',
          name: 'Ward 2'
        },
{
          id: '70303',
          name: 'Ward 3'
        },
{
          id: '70304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county7;
