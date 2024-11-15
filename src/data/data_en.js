export const messages = {
    labels: {
        name: "Name",
        street: "Street",
        zipCode: "Zip Code",
        county: "County",
        location: "Location"
    },
    title: "Pigeonholed",
    headerTitle: "PIGEONHOLED",
    instructions: "Mail sorting sim. Sort letters by the two last digits in the ZIP code. You can get fired if you make too many mistakes, the timer runs out, or if you get caught stealing.",
    correctMessage: "Correct!",
    incorrectMessage: "Incorrect.",
    levelUpMessage: "Level Up! Welcome to level {level}!",
    totalCashPocketedMessage: "Total Cash Pocketed: ${totalCash}",
    firedCaughtStealingMessage: "YOU'RE FIRED! You were caught stealing!",
    firedOutOfTimeMessage: "YOU'RE FIRED! Too slow!",
    firedMistakesMessage: "YOU'RE FIRED! You made too many mistakes!",

    livesMessage: "Lives: {lives}",
    cashMessage: "Cash: ${cash}",
    timerMessage: "Time remaining: {time} seconds",

    stealCashDialogMessage: "This letter contains cash. Do you want to steal ${amount}?",
    stealCashActionText: "Steal Cash",
    stealCashCancelText: "Decline",
    caughtStealingMessage: "You were caught stealing! Cash pocketed: $0",
    pocketCashMessage: "You pocketed ${amount}",
    declineStealMessage: "You declined the cash.",
    outLabel: "OUT",
    unknownZipCode: "???",
    outgoingLetterMessage: "This letter needs to be sorted as OUT",
};

export const addresses = {
    "145 33": {
        county: "Botkyrka",
        streets: ["Tumba Centrum", "Norsborgsvägen", "Bromstensvägen"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "33"
    },
    "123 45": {
        county: "Farsta",
        streets: ["Riksvägen", "Skogsvägen", "Östervägen"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "45"
    },
    "111 22": {
        county: "Gamla Stan",
        streets: ["Stora Nygatan", "Lilla Nygatan", "Västerlånggatan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "22"
    },
    "114 28": {
        county: "Östermalm",
        streets: ["Karlavägen", "Stureplan", "Nybroplan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "28"
    },
    "116 38": {
        county: "Södermalm",
        streets: ["Götgatan", "Hornsgatan", "Västerbroplan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "38"
    },
    "121 23": {
        county: "Vårby",
        streets: ["Albyvägen", "Fittja Torg", "Vårby Allé"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "23"
    },
    "113 62": {
        county: "Vasastan",
        streets: ["Karlbergsvägen", "Sveavägen", "Norrtullsgatan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "62"
    },
    "120 55": {
        county: "Älvsjö",
        streets: ["Stora Albyvägen", "Kanskevägen", "Hästhagsvägen"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "55"
    },
    "103 21": {
        county: "Norrmalm",
        streets: ["Drottninggatan", "Kungsträdgårdsgatan", "Biblioteksgatan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "21"
    },
    "107 76": {
        county: "Kungsholmen",
        streets: ["Fridhemsgatan", "Stadshuset", "Hornsgatan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "76"
    },

    // Adding more Stockholm zip codes
    "115 26": {
        county: "Vasastan",
        streets: ["Sankt Eriksgatan", "Birger Jarlsgatan", "Odengatan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "26"
    },
    "141 35": {
        county: "Flemingsberg",
        streets: ["Huddingevägen", "Fleminggatan", "Rudansvägen"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "35"
    },

    // Swedish Addresses
    "352 41": {
        county: "Fagerås",
        streets: ["Storgatan", "Fjällgatan", "Lilla Vägen"],
        city: "Växjö",
        country: "Sweden",
        sortAs: "SE"
    },
    "751 03": {
        county: "Kungsängen",
        streets: ["Bäckgatan", "Östervägen", "Brunnsvägen"],
        city: "Östersund",
        country: "Sweden",
        sortAs: "SE"
    },
    "413 21": {
        county: "Hisingen",
        streets: ["Hisingensgatan", "Lilla Varholmen", "Hisingeleden"],
        city: "Gothenburg",
        country: "Sweden",
        sortAs: "SE"
    },
    "831 53": {
        county: "Norrland",
        streets: ["Granitgatan", "Björnvägen", "Österlånggatan"],
        city: "Luleå",
        country: "Sweden",
        sortAs: "SE"
    },
    "491 61": {
        county: "Strängnäs",
        streets: ["Storgatan", "Strandvägen", "Nygatan"],
        city: "Strängnäs",
        country: "Sweden",
        sortAs: "SE"
    },
    "742 34": {
        county: "Fagersta",
        streets: ["Hedvägen", "Björngatan", "Södergatan"],
        city: "Fagersta",
        country: "Sweden",
        sortAs: "SE"
    },
    "796 22": {
        county: "Hedemora",
        streets: ["Malmvägen", "Hagalundsgatan", "Östra Allén"],
        city: "Hedemora",
        country: "Sweden",
        sortAs: "SE"
    },

    "1000": {
        county: "Shkoder",
        streets: ["Rruga e Dajti", "Sheshi Skenderbeu", "Rruga Kalivo"],
        city: "Tirana",
        country: "Albania",
        sortAs: "AL"
    },
    "0001": {
        county: "Ararat",
        streets: ["Abovyan Street", "Ararat Highway", "Vahramaberd Street"],
        city: "Yerevan",
        country: "Armenia",
        sortAs: "AM"
    },
    "2000": {
        county: "Sydney Suburb",
        streets: ["Circular Quay", "Macquarie Street", "George St."],
        city: "Sydney",
        country: "Australia",
        sortAs: "AU"
    },
    "1010": {
        county: "Wiener Neustadt",
        streets: ["Stephansplatz", "Mariahilfer Strasse", "Gumpendorfer Strasse"],
        city: "Vienna",
        country: "Austria",
        sortAs: "AT"
    },
    "1000": {
        county: "Baku",
        streets: ["Fountain Square", "Baku Boulevard", "Targovishte"],
        city: "Baku",
        country: "Azerbaijan",
        sortAs: "AZ"
    },
    "2200": {
        county: "Minsk",
        streets: ["Nezavisimosti Avenue", "Oktyabrskaya Square", "Frantsisk Skorina"],
        city: "Minsk",
        country: "Belarus",
        sortAs: "BY"
    },
    "1000": {
        county: "Brussels",
        streets: ["Grand Place", "Rue de la Loi", "Avenue Louise"],
        city: "Brussels",
        country: "Belgium",
        sortAs: "BE"
    },
    "71000": {
        county: "Sarajevo",
        streets: ["Baščaršija", "Titova Street", "Maršala Tita"],
        city: "Sarajevo",
        country: "Bosnia & Herzegovina",
        sortAs: "BA"
    },
    "1000": {
        county: "Sofia",
        streets: ["Vitosha Boulevard", "St. Alexander Nevsky Cathedral", "Sofia Square"],
        city: "Sofia",
        country: "Bulgaria",
        sortAs: "BG"
    },
    "10000": {
        county: "Zagreb",
        streets: ["Ban Jelačić Square", "Ilica Street", "Trg Kralja Tomislava"],
        city: "Zagreb",
        country: "Croatia",
        sortAs: "HR"
    },
    "1010": {
        county: "Nicosia",
        streets: ["Makarios Avenue", "Stasikratous", "Ledra Street"],
        city: "Nicosia",
        country: "Cyprus",
        sortAs: "CY"
    },
    "11000": {
        county: "Prague",
        streets: ["Old Town Square", "Wenceslas Square", "Charles Bridge"],
        city: "Prague",
        country: "Czech Republic",
        sortAs: "CZ"
    },
    "1000": {
        county: "Copenhagen",
        streets: ["Nyhavn", "Strøget", "Vesterbrogade"],
        city: "Copenhagen",
        country: "Denmark",
        sortAs: "DK"
    },
    "10100": {
        county: "Tallinn",
        streets: ["Viru Street", "Tallinn Old Town", "Pärnu Road"],
        city: "Tallinn",
        country: "Estonia",
        sortAs: "EE"
    },
    "00100": {
        county: "Helsinki",
        streets: ["Mannerheimintie", "Esplanadi", "Aleksanterinkatu"],
        city: "Helsinki",
        country: "Finland",
        sortAs: "FI"
    },
    "75000": {
        county: "Paris",
        streets: ["Champs-Élysées", "Montmartre", "Rue de Rivoli"],
        city: "Paris",
        country: "France",
        sortAs: "FR"
    },
    "0100": {
        county: "Tbilisi",
        streets: ["Rustaveli Avenue", "Freedom Square", "Chavchavadze Avenue"],
        city: "Tbilisi",
        country: "Georgia",
        sortAs: "GE"
    },
    "10100": {
        county: "Berlin",
        streets: ["Brandenburger Tor", "Unter den Linden", "Alexanderplatz"],
        city: "Berlin",
        country: "Germany",
        sortAs: "DE"
    },
    "10557": {
        county: "Athens",
        streets: ["Syntagma Square", "Athenian Riviera", "Acropolis"],
        city: "Athens",
        country: "Greece",
        sortAs: "GR"
    },
    "1011": {
        county: "Budapest",
        streets: ["Andrássy Avenue", "Heroes' Square", "Chain Bridge"],
        city: "Budapest",
        country: "Hungary",
        sortAs: "HU"
    },
    "10101": {
        county: "Reykjavík",
        streets: ["Laugavegur", "Skólavörðustígur", "Höfðatorg"],
        city: "Reykjavík",
        country: "Iceland",
        sortAs: "IS"
    },
    "2D01": {
        county: "Dublin",
        streets: ["O'Connell Street", "Temple Bar", "St. Stephen's Green"],
        city: "Dublin",
        country: "Ireland",
        sortAs: "IE"
    },
    "64725": {
        county: "Tel Aviv",
        streets: ["Rothschild Boulevard", "Dizengoff Street", "Allenby Street"],
        city: "Tel Aviv",
        country: "Israel",
        sortAs: "IL"
    },
    "00100": {
        county: "Rome",
        streets: ["Piazza Venezia", "Via del Corso", "Piazza del Popolo"],
        city: "Rome",
        country: "Italy",
        sortAs: "IT"
    },
    "LV-1050": {
        county: "Riga",
        streets: ["Old Town", "Elizabetes Street", "Jurmala"],
        city: "Riga",
        country: "Latvia",
        sortAs: "LV"
    },
    "2015": {
        county: "Vilnius",
        streets: ["Gedimino Avenue", "Pilies Street", "Naugarduko Street"],
        city: "Vilnius",
        country: "Lithuania",
        sortAs: "LT"
    },
    "12100": {
        county: "Valletta",
        streets: ["Republic Street", "St. John's Co-Cathedral", "The Grand Harbour"],
        city: "Valletta",
        country: "Malta",
        sortAs: "MT"
    },
    "2020": {
        county: "Chisinau",
        streets: ["Stefan Cel Mare", "Mihai Eminescu Street", "Pushkin Street"],
        city: "Chisinau",
        country: "Moldova",
        sortAs: "MD"
    },
    "98000": {
        county: "Monaco",
        streets: ["Casino Square", "Avenue de la Costa", "Boulevard de Belgique"],
        city: "Monaco",
        country: "Monaco",
        sortAs: "MC"
    },
    "81000": {
        county: "Podgorica",
        streets: ["Slobode Boulevard", "Njegoševa Street", "Stari Grad"],
        city: "Podgorica",
        country: "Montenegro",
        sortAs: "ME"
    },
    "1012": {
        county: "Amsterdam",
        streets: ["Dam Square", "Leidseplein", "Red Light District"],
        city: "Amsterdam",
        country: "Netherlands",
        sortAs: "NL"
    },
    "1000": {
        county: "Skopje",
        streets: ["Macedonia Square", "Boris Trajkovski Blvd", "Vardar River"],
        city: "Skopje",
        country: "North Macedonia",
        sortAs: "MK"
    },
    "0130": {
        county: "Oslo",
        streets: ["Karl Johans Gate", "Aker Brygge", "Vigeland Sculpture Park"],
        city: "Oslo",
        country: "Norway",
        sortAs: "NO"
    },
    "00-001": {
        county: "Warsaw",
        streets: ["Krakowskie Przedmieście", "Nowy Świat", "Castle Square"],
        city: "Warsaw",
        country: "Poland",
        sortAs: "PL"
    },
    "1000": {
        county: "Lisbon",
        streets: ["Avenida da Liberdade", "Baixa District", "Alfama"],
        city: "Lisbon",
        country: "Portugal",
        sortAs: "PT"
    },
    "0500": {
        county: "Bucharest",
        streets: ["Calea Victoriei", "Piata Unirii", "Romanian Athenaeum"],
        city: "Bucharest",
        country: "Romania",
        sortAs: "RO"
    },
    "101000": {
        county: "Moscow",
        streets: ["Red Square", "Arbat Street", "Tverskaya Street"],
        city: "Moscow",
        country: "Russia",
        sortAs: "RU"
    },
    "50000": {
        county: "San Marino",
        streets: ["Piazza della Libertà", "Viale Federico", "Piazza del Titano"],
        city: "San Marino",
        country: "San Marino",
        sortAs: "SM"
    },
    "11000": {
        county: "Belgrade",
        streets: ["Knez Mihailova", "Republic Square", "Terazije"],
        city: "Belgrade",
        country: "Serbia",
        sortAs: "RS"
    },
    "82100": {
        county: "Bratislava",
        streets: ["Špitálska Street", "St. Michael's Tower", "Main Square"],
        city: "Bratislava",
        country: "Slovakia",
        sortAs: "SK"
    },
    "1000": {
        county: "Ljubljana",
        streets: ["Prešeren Square", "Stari Trg", "Tivoli Park"],
        city: "Ljubljana",
        country: "Slovenia",
        sortAs: "SI"
    },
    "28000": {
        county: "Madrid",
        streets: ["Puerta del Sol", "Gran Vía", "Plaza Mayor"],
        city: "Madrid",
        country: "Spain",
        sortAs: "ES"
    },
    "10100": {
        county: "Stockholm",
        streets: ["Gamla Stan", "Drottninggatan", "Stureplan"],
        city: "Stockholm",
        country: "Sweden",
        sortAs: "SE"
    },
    "8000": {
        county: "Zurich",
        streets: ["Bahnhofstrasse", "Lake Zurich", "Old Town"],
        city: "Zurich",
        country: "Switzerland",
        sortAs: "CH"
    },
    "01001": {
        county: "Kyiv",
        streets: ["Khreshchatyk", "Independence Square", "Andriyivskyy Descent"],
        city: "Kyiv",
        country: "Ukraine",
        sortAs: "UA"
    },
    "E1 6AN": {
        county: "London",
        streets: ["Buckingham Palace", "Oxford Street", "Westminster"],
        city: "London",
        country: "United Kingdom",
        sortAs: "GB"
    },
};



export const firstNames = [
    "Adam",
    "Albin",
    "Alfred",
    "Alma",
    "Alvar",
    "Alve",
    "Amir",
    "Anna",
    "Anton",
    "Aron",
    "Astrid",
    "August",
    "Axel",
    "Benjamin",
    "Bill",
    "Björn",
    "Charlie",
    "Christina",
    "Casper",
    "Dante",
    "Ebba",
    "Ebbi",
    "Eduard",
    "Elias",
    "Elina",
    "Ellie",
    "Emma",
    "Emil",
    "Erik",
    "Eva",
    "Filip",
    "Folke",
    "Frans",
    "Gabriel",
    "Gustav",
    "Hanna",
    "Harry",
    "Henry",
    "Hjalmar",
    "Hugo",
    "Ivar",
    "Jack",
    "Jan",
    "Johan",
    "Joel",
    "Julian",
    "Karin",
    "Karl",
    "Kerstin",
    "Kian",
    "Knut",
    "Lars",
    "Levi",
    "Liam",
    "Lena",
    "Leo",
    "Leon",
    "Lili",
    "Lina",
    "Linnéa",
    "Lisa",
    "Liva",
    "Loke",
    "Love",
    "Lucas",
    "Ludvig",
    "Lukas",
    "Luna",
    "Madeleine",
    "Malte",
    "Maria",
    "Marie",
    "Matheo",
    "Max",
    "Melker",
    "Melvin",
    "Mikael",
    "Milan",
    "Milo",
    "Milton",
    "Nils",
    "Noel",
    "Omar",
    "Oliver",
    "Olle",
    "Otis",
    "Otto",
    "Oskar",
    "Per",
    "Peter",
    "Philip",
    "Sam",
    "Sara",
    "Sigge",
    "Sixten",
    "Sophia",
    "Theo",
    "Thomas",
    "Valter",
    "Vera",
    "Viggo",
    "Vincent",
    "William",
    "Wilhelm",
    "Walter",
    "Xavier",
    "Ylva",
    "Åke"
];

export const lastNames = [
    "Abrahamsson",
    "Ahmed",
    "Ali",
    "Andreasson",
    "Arvidsson",
    "Axelsson",
    "Bengtsson",
    "Berger",
    "Berggren",
    "Bergkvist",
    "Bergman",
    "Bergström",
    "Blom",
    "Blomberg",
    "Blomkvist",
    "Blomquist",
    "Blomqvist",
    "Björk",
    "Björklund",
    "Björnsson",
    "Claesson",
    "Danielsson",
    "Dahlberg",
    "Ek",
    "Ekberg",
    "Ekblad",
    "Ekholm",
    "Ekström",
    "Eliasson",
    "Engström",
    "Eriksson",
    "Eklund",
    "Fallberg",
    "Fredriksson",
    "Fransson",
    "Frantzén",
    "Frisk",
    "Gunnarsson",
    "Gustafsson",
    "Gyllenhaal",
    "Hallberg",
    "Hansson",
    "Hedberg",
    "Hellström",
    "Henriksson",
    "Hermansson",
    "Holberg",
    "Holmgren",
    "Holmqvist",
    "Hultén",
    "Hägg",
    "Hällström",
    "Jakobsson",
    "Jansson",
    "Johansson",
    "Jonsson",
    "Jönsson",
    "Karlsson",
    "Klintberg",
    "Klingberg",
    "Klintström",
    "Knutsson",
    "Krüger",
    "Kullberg",
    "Kullén",
    "Kurck",
    "Larsson",
    "Lindberg",
    "Lindblad",
    "Lindell",
    "Lindgren",
    "Lindholm",
    "Lindkvist",
    "Lindner",
    "Lindroos",
    "Lindström",
    "Lindqvist",
    "Lindsten",
    "Lindwall",
    "Ljungberg",
    "Ljunggren",
    "Löfgren",
    "Lundberg",
    "Lundgren",
    "Lundkvist",
    "Lundmark",
    "Lundström",
    "Magnusson",
    "Mattsson",
    "Malmberg",
    "Malmgren",
    "Malmqvist",
    "Malmström",
    "Månsson",
    "Martinsson",
    "Melin",
    "Mellberg",
    "Mellgren",
    "Mellqvist",
    "Mellström",
    "Mohamed",
    "Molin",
    "Moller",
    "Mörner",
    "Mörtberg",
    "Mörtén",
    "Mörtstedt",
    "Norberg",
    "Nordin",
    "Nyberg",
    "Nyström",
    "Olsson",
    "Olofsson",
    "Persson",
    "Pettersson",
    "Pålsson",
    "Sandberg",
    "Sandström",
    "Sjögren",
    "Sjöberg",
    "Ström",
    "Strömberg",
    "Sundberg",
    "Sundström",
    "Söderberg",
    "Tage",
    "Viklund",
    "Wallin",
    "Åberg",
    "Åkesson",
    "Åström"
];

