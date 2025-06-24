// county-12-meru.ts - Meru County data
import type { County } from './location-types';

export const county12: County = {
  id: '12',
  name: 'Meru',
  code: '012',
  subcounties: [
{
      id: '1201',
      name: 'Subcounty 1',
      wards: [
{
          id: '120101',
          name: 'Ward 1'
        },
{
          id: '120102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1202',
      name: 'Subcounty 2',
      wards: [
{
          id: '120201',
          name: 'Ward 1'
        },
{
          id: '120202',
          name: 'Ward 2'
        },
{
          id: '120203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '1203',
      name: 'Subcounty 3',
      wards: [
{
          id: '120301',
          name: 'Ward 1'
        },
{
          id: '120302',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '1204',
      name: 'Subcounty 4',
      wards: [
{
          id: '120401',
          name: 'Ward 1'
        },
{
          id: '120402',
          name: 'Ward 2'
        },
{
          id: '120403',
          name: 'Ward 3'
        },
{
          id: '120404',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county12;
