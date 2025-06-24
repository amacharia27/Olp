// county-20-kirinyaga.ts - Kirinyaga County data
import type { County } from './location-types';

export const county20: County = {
  id: '20',
  name: 'Kirinyaga',
  code: '020',
  subcounties: [
{
      id: '2001',
      name: 'Subcounty 1',
      wards: [
{
          id: '200101',
          name: 'Ward 1'
        },
{
          id: '200102',
          name: 'Ward 2'
        },
{
          id: '200103',
          name: 'Ward 3'
        },
{
          id: '200104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '2002',
      name: 'Subcounty 2',
      wards: [
{
          id: '200201',
          name: 'Ward 1'
        },
{
          id: '200202',
          name: 'Ward 2'
        },
{
          id: '200203',
          name: 'Ward 3'
        },
{
          id: '200204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county20;
