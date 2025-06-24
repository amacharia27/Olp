// county-01-mombasa.ts - Mombasa County data
import type { County } from './location-types';

export const county1: County = {
  id: '1',
  name: 'Mombasa',
  code: '001',
  subcounties: [
{
      id: '101',
      name: 'Changamwe',
      wards: [
{
          id: '10101',
          name: 'Port Reitz'
        },
{
          id: '10102',
          name: 'Kipevu'
        },
{
          id: '10103',
          name: 'Airport'
        },
{
          id: '10104',
          name: 'Changamwe'
        },
{
          id: '10105',
          name: 'Chaani'
        }
      ]
    },
{
      id: '102',
      name: 'Jomvu',
      wards: [
{
          id: '10201',
          name: 'Jomvu Kuu'
        },
{
          id: '10202',
          name: 'Miritini'
        },
{
          id: '10203',
          name: 'Mikindani'
        }
      ]
    },
{
      id: '103',
      name: 'Kisauni',
      wards: [
{
          id: '10301',
          name: 'Mjambere'
        },
{
          id: '10302',
          name: 'Junda'
        },
{
          id: '10303',
          name: 'Bamburi'
        },
{
          id: '10304',
          name: 'Mwakirunge'
        },
{
          id: '10305',
          name: 'Mtopanga'
        },
{
          id: '10306',
          name: 'Magogoni'
        },
{
          id: '10307',
          name: 'Shanzu'
        }
      ]
    }
  ]
};

export default county1;
