// kenya-locations.ts - Seed data for Kenya counties, subcounties and wards

// Export types from the types file
export type { Ward, SubCounty, County } from './counties/location-types';

// Import types for local use
import type { County, SubCounty, Ward } from './counties/location-types';

// Import all counties from the index file
import {
  county1, county2, county3, county4, county5, county6, county7, county8, county9, county10,
  county11, county12, county13, county14, county15, county16, county17, county18, county19, county20,
  county21, county22, county23, county24, county25, county26, county27, county28, county29, county30,
  county31, county32, county33, county34, county35, county36, county37, county38, county39, county40,
  county41, county42, county43, county44, county45, county46, county47
} from './counties';

// Export the complete dataset of Kenya's 47 counties
export const kenyaCounties: County[] = [
  county1,
  county2,
  county3,
  county4,
  county5,
  county6,
  county7,
  county8,
  county9,
  county10,
  county11,
  county12,
  county13,
  county14,
  county15,
  county16,
  county17,
  county18,
  county19,
  county20,
  county21,
  county22,
  county23,
  county24,
  county25,
  county26,
  county27,
  county28,
  county29,
  county30,
  county31,
  county32,
  county33,
  county34,
  county35,
  county36,
  county37,
  county38,
  county39,
  county40,
  county41,
  county42,
  county43,
  county44,
  county45,
  county46,
  county47
];


// Helper function to get all subcounties for a given county
export const getSubcountiesForCounty = (countyId: string): SubCounty[] => {
  for (let i = 0; i < kenyaCounties.length; i++) {
    if (kenyaCounties[i].id === countyId) {
      return kenyaCounties[i].subcounties;
    }
  }
  return [];
};

// Helper function to get all wards for a given subcounty
export const getWardsForSubcounty = (countyId: string, subcountyId: string): Ward[] => {
  for (let i = 0; i < kenyaCounties.length; i++) {
    if (kenyaCounties[i].id === countyId) {
      const subcounties = kenyaCounties[i].subcounties;
      for (let j = 0; j < subcounties.length; j++) {
        if (subcounties[j].id === subcountyId) {
          return subcounties[j].wards;
        }
      }
      break;
    }
  }
  return [];
};

