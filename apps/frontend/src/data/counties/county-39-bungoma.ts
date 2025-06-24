// county-39-bungoma.ts - Bungoma County data
import type { County } from './location-types';

export const county39: County = {
  id: '39',
  name: 'Bungoma',
  code: '039',
  subcounties: [
{
      id: '3901',
      name: 'Subcounty 1',
      wards: [
{
          id: '390101',
          name: 'Ward 1'
        },
{
          id: '390102',
          name: 'Ward 2'
        },
{
          id: '390103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '3902',
      name: 'Subcounty 2',
      wards: [
{
          id: '390201',
          name: 'Ward 1'
        },
{
          id: '390202',
          name: 'Ward 2'
        },
{
          id: '390203',
          name: 'Ward 3'
        },
{
          id: '390204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '3903',
      name: 'Subcounty 3',
      wards: [
{
          id: '390301',
          name: 'Ward 1'
        },
{
          id: '390302',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county39;
