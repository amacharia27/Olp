// county-29-nandi.ts - Nandi County data
import type { County } from './location-types';

export const county29: County = {
  id: '29',
  name: 'Nandi',
  code: '029',
  subcounties: [
{
      id: '2901',
      name: 'Subcounty 1',
      wards: [
{
          id: '290101',
          name: 'Ward 1'
        },
{
          id: '290102',
          name: 'Ward 2'
        },
{
          id: '290103',
          name: 'Ward 3'
        },
{
          id: '290104',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '2902',
      name: 'Subcounty 2',
      wards: [
{
          id: '290201',
          name: 'Ward 1'
        },
{
          id: '290202',
          name: 'Ward 2'
        },
{
          id: '290203',
          name: 'Ward 3'
        },
{
          id: '290204',
          name: 'Ward 4'
        }
      ]
    }
  ]
};

export default county29;
