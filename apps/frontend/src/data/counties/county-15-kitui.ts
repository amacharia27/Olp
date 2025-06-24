// county-15-kitui.ts - Kitui County data
import type { County } from './location-types';

export const county15: County = {
  id: '15',
  name: 'Kitui',
  code: '015',
  subcounties: [
{
      id: '1501',
      name: 'Subcounty 1',
      wards: [
{
          id: '150101',
          name: 'Ward 1'
        },
{
          id: '150102',
          name: 'Ward 2'
        },
{
          id: '150103',
          name: 'Ward 3'
        },
{
          id: '150104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '1502',
      name: 'Subcounty 2',
      wards: [
{
          id: '150201',
          name: 'Ward 1'
        },
{
          id: '150202',
          name: 'Ward 2'
        },
{
          id: '150203',
          name: 'Ward 3'
        },
{
          id: '150204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county15;
