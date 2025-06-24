// county-05-lamu.ts - Lamu County data
import type { County } from './location-types';

export const county5: County = {
  id: '5',
  name: 'Lamu',
  code: '005',
  subcounties: [
{
      id: '501',
      name: 'Subcounty 1',
      wards: [
{
          id: '50101',
          name: 'Ward 1'
        },
{
          id: '50102',
          name: 'Ward 2'
        },
{
          id: '50103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '502',
      name: 'Subcounty 2',
      wards: [
{
          id: '50201',
          name: 'Ward 1'
        },
{
          id: '50202',
          name: 'Ward 2'
        },
{
          id: '50203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '503',
      name: 'Subcounty 3',
      wards: [
{
          id: '50301',
          name: 'Ward 1'
        },
{
          id: '50302',
          name: 'Ward 2'
        },
{
          id: '50303',
          name: 'Ward 3'
        },
{
          id: '50304',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '504',
      name: 'Subcounty 4',
      wards: [
{
          id: '50401',
          name: 'Ward 1'
        },
{
          id: '50402',
          name: 'Ward 2'
        },
{
          id: '50403',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county5;
