// county-21-murang-a.ts - Murang'a County data
import type { County } from './location-types';

export const county21: County = {
  id: '21',
  name: 'Murang\'a',
  code: '021',
  subcounties: [
{
      id: '2101',
      name: 'Kangema',
      wards: [
{
          id: '210101',
          name: 'Kanyenya-ini'
        },
{
          id: '210102',
          name: 'Muguru'
        },
{
          id: '210103',
          name: 'Rwathia'
        }
      ]
    },
{
      id: '2102',
      name: 'Mathioya',
      wards: [
{
          id: '210201',
          name: 'Gitugi'
        },
{
          id: '210202',
          name: 'Kiru'
        },
{
          id: '210203',
          name: 'Kamacharia'
        }
      ]
    }
  ]
};

export default county21;
