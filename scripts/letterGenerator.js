import { firstNames, lastNames, addresses, defaultCity, defaultCounty, defaultCountry, otherCities, otherCountries } from './data_gr.js';

function getRandomStreetNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateLetter(level) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const address = getRandomElement(Object.entries(addresses));

    let zipCode = address[0];
    let street = `${getRandomElement(address[1])} ${getRandomStreetNumber()}`;
    let county = defaultCounty;
    let city = defaultCity;
    let country = defaultCountry;
    let requiresOutgoing = false;

    if (level === "medium") {
        if (Math.random() < 0.5) city = getRandomElement(otherCities);
        if (Math.random() < 0.5) country = getRandomElement(otherCountries);
    } else if (level === "hard") {
        if (Math.random() < 0.3) {
            zipCode = `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}`;
            requiresOutgoing = true;
        } else if (Math.random() < 0.3) {
            zipCode = null;
            requiresOutgoing = true;
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
        county,
        city,
        country,
        requiresOutgoing,
    };
}