// county-08-wajir.ts - Wajir County data
import type { County } from './location-types';

export const county8: County = {
  id: '8',
  name: 'Wajir',
  code: '008',
  subcounties: [
{
      id: '801',
      name: 'Subcounty 1',
      wards: [
{
          id: '80101',
          name: 'Ward 1'
        },
{
          id: '80102',
          name: 'Ward 2'
        },
{
          id: '80103',
          name: 'Ward 3'
        },
{
          id: '80104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '802',
      name: 'Subcounty 2',
      wards: [
{
          id: '80201',
          name: 'Ward 1'
        },
{
          id: '80202',
          name: 'Ward 2'
        },
{
          id: '80203',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county8;
