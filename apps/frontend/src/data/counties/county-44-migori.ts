// county-44-migori.ts - Migori County data
import type { County } from './location-types';

export const county44: County = {
  id: '44',
  name: 'Migori',
  code: '044',
  subcounties: [
{
      id: '4401',
      name: 'Subcounty 1',
      wards: [
{
          id: '440101',
          name: 'Ward 1'
        },
{
          id: '440102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4402',
      name: 'Subcounty 2',
      wards: [
{
          id: '440201',
          name: 'Ward 1'
        },
{
          id: '440202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4403',
      name: 'Subcounty 3',
      wards: [
{
          id: '440301',
          name: 'Ward 1'
        },
{
          id: '440302',
          name: 'Ward 2'
        },
{
          id: '440303',
          name: 'Ward 3'
        },
{
          id: '440304',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county44;
