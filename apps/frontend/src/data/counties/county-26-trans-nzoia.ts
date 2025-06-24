// county-26-trans-nzoia.ts - Trans Nzoia County data
import type { County } from './location-types';

export const county26: County = {
  id: '26',
  name: 'Trans Nzoia',
  code: '026',
  subcounties: [
{
      id: '2601',
      name: 'Subcounty 1',
      wards: [
{
          id: '260101',
          name: 'Ward 1'
        },
{
          id: '260102',
          name: 'Ward 2'
        },
{
          id: '260103',
          name: 'Ward 3'
        }
      ]
    },
{
      id: '2602',
      name: 'Subcounty 2',
      wards: [
{
          id: '260201',
          name: 'Ward 1'
        },
{
          id: '260202',
          name: 'Ward 2'
        }
      ]
    }
  ]
};

export default county26;
