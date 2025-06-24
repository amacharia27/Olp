// county-04-tana-river.ts - Tana River County data
import type { County } from './location-types';

export const county4: County = {
  id: '4',
  name: 'Tana River',
  code: '004',
  subcounties: [
{
      id: '401',
      name: 'Subcounty 1',
      wards: [
{
          id: '40101',
          name: 'Ward 1'
        },
{
          id: '40102',
          name: 'Ward 2'
        },
{
          id: '40103',
          name: 'Ward 3'
        },
{
          id: '40104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '402',
      name: 'Subcounty 2',
      wards: [
{
          id: '40201',
          name: 'Ward 1'
        },
{
          id: '40202',
          name: 'Ward 2'
        },
{
          id: '40203',
          name: 'Ward 3'
        },
{
          id: '40204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '403',
      name: 'Subcounty 3',
      wards: [
{
          id: '40301',
          name: 'Ward 1'
        },
{
          id: '40302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county4;
