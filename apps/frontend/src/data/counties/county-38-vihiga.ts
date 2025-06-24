// county-38-vihiga.ts - Vihiga County data
import type { County } from './location-types';

export const county38: County = {
  id: '38',
  name: 'Vihiga',
  code: '038',
  subcounties: [
{
      id: '3801',
      name: 'Subcounty 1',
      wards: [
{
          id: '380101',
          name: 'Ward 1'
        },
{
          id: '380102',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3802',
      name: 'Subcounty 2',
      wards: [
{
          id: '380201',
          name: 'Ward 1'
        },
{
          id: '380202',
          name: 'Ward 2'
        },
{
          id: '380203',
          name: 'Ward 3'
        },
{
          id: '380204',
          name: 'Ward 4'
        }
      ]
    },
{
      id: '3803',
      name: 'Subcounty 3',
      wards: [
{
          id: '380301',
          name: 'Ward 1'
        },
{
          id: '380302',
          name: 'Ward 2'
        }
      ]
    },
{
      id: '3804',
      name: 'Subcounty 4',
      wards: [
{
          id: '380401',
          name: 'Ward 1'
        },
{
          id: '380402',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county38;
