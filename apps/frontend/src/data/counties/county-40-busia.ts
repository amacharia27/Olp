// county-40-busia.ts - Busia County data
import type { County } from './location-types';

export const county40: County = {
  id: '40',
  name: 'Busia',
  code: '040',
  subcounties: [
{
      id: '4001',
      name: 'Subcounty 1',
      wards: [
{
          id: '400101',
          name: 'Ward 1'
        },
{
          id: '400102',
          name: 'Ward 2'
        },
{
          id: '400103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '4002',
      name: 'Subcounty 2',
      wards: [
{
          id: '400201',
          name: 'Ward 1'
        },
{
          id: '400202',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4003',
      name: 'Subcounty 3',
      wards: [
{
          id: '400301',
          name: 'Ward 1'
        },
{
          id: '400302',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '4004',
      name: 'Subcounty 4',
      wards: [
{
          id: '400401',
          name: 'Ward 1'
        },
{
          id: '400402',
          name: 'Ward 2'
        },
{
          id: '400403',
          name: 'Ward 3'
        }
      ]
    }
  ]
};

export default county40;
