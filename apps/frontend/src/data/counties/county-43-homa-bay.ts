// county-43-homa-bay.ts - Homa Bay County data
import type { County } from './location-types';

export const county43: County = {
  id: '43',
  name: 'Homa Bay',
  code: '043',
  subcounties: [
{
      id: '4301',
      name: 'Subcounty 1',
      wards: [
{
          id: '430101',
          name: 'Ward 1'
        },
{
          id: '430102',
          name: 'Ward 2'
        },
{
          id: '430103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '4302',
      name: 'Subcounty 2',
      wards: [
{
          id: '430201',
          name: 'Ward 1'
        },
{
          id: '430202',
          name: 'Ward 2'
        },
{
          id: '430203',
          name: 'Ward 3'
        },
{
          id: '430204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '4303',
      name: 'Subcounty 3',
      wards: [
{
          id: '430301',
          name: 'Ward 1'
        },
{
          id: '430302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county43;
