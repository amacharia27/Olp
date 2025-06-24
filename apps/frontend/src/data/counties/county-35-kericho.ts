// county-35-kericho.ts - Kericho County data
import type { County } from './location-types';

export const county35: County = {
  id: '35',
  name: 'Kericho',
  code: '035',
  subcounties: [
{
      id: '3501',
      name: 'Subcounty 1',
      wards: [
{
          id: '350101',
          name: 'Ward 1'
        },
{
          id: '350102',
          name: 'Ward 2'
        },
{
          id: '350103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3502',
      name: 'Subcounty 2',
      wards: [
{
          id: '350201',
          name: 'Ward 1'
        },
{
          id: '350202',
          name: 'Ward 2'
        },
{
          id: '350203',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3503',
      name: 'Subcounty 3',
      wards: [
{
          id: '350301',
          name: 'Ward 1'
        },
{
          id: '350302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county35;
