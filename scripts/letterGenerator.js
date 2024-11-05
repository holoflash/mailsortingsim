import { firstNames, lastNames, stockholmAddresses, defaultCity, defaultCountry, otherCities, otherCountries } from './data.js';

function getRandomStreetNumber() {
    return Math.floor(Math.random() * 1000) + 1; // Random street number between 1 and 100
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]; // Get a random element from an array
}

export function generateLetter(level) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const address = getRandomElement(Object.entries(stockholmAddresses)); // Use Object.entries to get both key and value

    let zipCode = address[0]; // ZIP code is the key
    let street = `${getRandomElement(address[1])} ${getRandomStreetNumber()}`; // Random street name from array + random street number
    let city = defaultCity;
    let country = defaultCountry;
    let requiresOutgoing = false;

    // Adjust based on level
    if (level === "medium") {
        if (Math.random() < 0.5) city = getRandomElement(otherCities);
        if (Math.random() < 0.5) country = getRandomElement(otherCountries);
    } else if (level === "hard") {
        if (Math.random() < 0.3) {
            // Sometimes show an incorrect/random ZIP code
            zipCode = `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}`;
        } else if (Math.random() < 0.3) {
            // Sometimes hide ZIP code altogether
            zipCode = null;
        }
        if (Math.random() < 0.2) {
            city = getRandomElement(otherCities);
            country = getRandomElement(otherCountries);
            requiresOutgoing = true;
        }
    }

    return {
        firstName,
        lastName,
        street,
        zipCode,
        county: zipCode ? (zipCode.startsWith("143") ? "Vårby Gård" : "Norsborg") : null,
        city,
        country,
        requiresOutgoing,
    };
}