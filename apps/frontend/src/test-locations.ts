import { getSubcountiesForCounty, getWardsForSubcounty, kenyaCounties } from "./data/kenya-locations";

// This is a test script for the Kenya locations dataset

// Test the Kenya locations dataset
console.log(`Total counties: ${kenyaCounties.length}`);

// Test the first county
const firstCounty = kenyaCounties[0];
console.log(`First county: ${firstCounty.name} (${firstCounty.code})`);
console.log(`Subcounties in ${firstCounty.name}: ${firstCounty.subcounties.length}`);

// Test the helper functions
const subcounties = getSubcountiesForCounty('1');
console.log(`Subcounties in Mombasa: ${subcounties.length}`);

const wards = getWardsForSubcounty('1', '1-1');
console.log(`Wards in Changamwe: ${wards.length}`);
