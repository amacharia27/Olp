// location-types.ts - Type definitions for Kenya locations data

export interface Ward {
  id: string;
  name: string;
}

export interface SubCounty {
  id: string;
  name: string;
  wards: Ward[];
}

export interface County {
  id: string;
  name: string;
  code: string;
  subcounties: SubCounty[];
}
