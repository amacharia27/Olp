// county-46-nyamira.ts - Nyamira County data
import type { County } from './location-types';

export const county46: County = {
  id: '46',
  name: 'Nyamira',
  code: '046',
  subcounties: [
{
      id: '4601',
      name: 'Subcounty 1',
      wards: [
{
          id: '460101',
          name: 'Ward 1'
        },
{
          id: '460102',
          name: 'Ward 2'
        },
{
          id: '460103',
          name: 'Ward 3'
        },
{
          id: '460104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '4602',
      name: 'Subcounty 2',
      wards: [
{
          id: '460201',
          name: 'Ward 1'
        },
{
          id: '460202',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county46;
