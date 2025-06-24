// county-03-kilifi.ts - Kilifi County data
import type { County } from './location-types';

export const county3: County = {
  id: '3',
  name: 'Kilifi',
  code: '003',
  subcounties: [
{
      id: '301',
      name: 'Kilifi North',
      wards: [
{
          id: '30101',
          name: 'Tezo'
        },
{
          id: '30102',
          name: 'Sokoni'
        },
{
          id: '30103',
          name: 'Kibarani'
        },
{
          id: '30104',
          name: 'Dabaso'
        },
{
          id: '30105',
          name: 'Matsangoni'
        }
      ]
    },
{
      id: '302',
      name: 'Kilifi South',
      wards: [
{
          id: '30201',
          name: 'Junju'
        },
{
          id: '30202',
          name: 'Mwarakaya'
        },
{
          id: '30203',
          name: 'Shimo La Tewa'
        }
      ]
    }
  ]
};

export default county3;
