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
    gameStart: "Start sorting!",
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

    stealCashActionText: "Try to steal ${amount}",
    caughtStealingMessage: "You were caught stealing! Cash pocketed: $0",
    pocketCashMessage: "You pocketed ${amount}",
    declineStealMessage: "You declined the cash.",
    outLabel: "OUT",
    unknownZipCode: "???",
    outgoingLetterMessage: "This letter needs to be sorted as OUT",
};

export const addresses = [
    { zipCode: "103 21", county: "Norrmalm", streets: ["Drottninggatan", "Kungsträdgårdsgatan", "Biblioteksgatan"], city: "Stockholm", country: "Sweden", sortAs: "21" },
    { zipCode: "115 26", county: "Vasastan", streets: ["Sankt Eriksgatan", "Birger Jarlsgatan", "Odengatan"], city: "Stockholm", country: "Sweden", sortAs: "26" },
    { zipCode: "114 28", county: "Östermalm", streets: ["Karlavägen", "Stureplan", "Nybroplan"], city: "Stockholm", country: "Sweden", sortAs: "28" },
    { zipCode: "141 35", county: "Flemingsberg", streets: ["Huddingevägen", "Fleminggatan", "Rudansvägen"], city: "Stockholm", country: "Sweden", sortAs: "35" },
    { zipCode: "116 38", county: "Södermalm", streets: ["Götgatan", "Hornsgatan", "Västerbroplan"], city: "Stockholm", country: "Sweden", sortAs: "38" },
    { zipCode: "143 41", county: "Vårby", streets: ["Bäckgårdsvägen", "Verdandi##", "Mogårdsvägen"], city: "Stockholm", country: "Sweden", sortAs: "41" },
    { zipCode: "143 42", county: "Vårby", streets: ["Krongårdsvägen", "Nygårdsvägen", "Duvbergsvägen"], city: "Stockholm", country: "Sweden", sortAs: "42" },
    { zipCode: "143 43", county: "Vårby", streets: ["Solhagavägen", "Lammholmsbacken", "Vårby allé"], city: "Stockholm", country: "Sweden", sortAs: "43" },
    { zipCode: "145 55", county: "Norsborg", streets: ["Rådmansbacken", "Albyvägen", "Alhagsvägen", "Noyans livs"], city: "Stockholm", country: "Sweden", sortAs: "55" },
    { zipCode: "120 55", county: "Älvsjö", streets: ["Stora Albyvägen", "Kanskevägen", "Hästhagsvägen"], city: "Stockholm", country: "Sweden", sortAs: "55" },
    { zipCode: "113 62", county: "Vasastan", streets: ["Karlbergsvägen", "Sveavägen", "Norrtullsgatan"], city: "Stockholm", country: "Sweden", sortAs: "62" },
    { zipCode: "145 76", county: "Norsborg", streets: ["Hundhamravägen", "Iduns väg", "Höders väg", "Noyans Livs"], city: "Stockholm", country: "Sweden", sortAs: "76" },

    // *** Asia (All Countries + Major Ones Missing) ***
    { zipCode: "100-0001", county: "Chiyoda", streets: ["Tokyo Imperial Palace", "Chiyoda Avenue", "Akasaka"], city: "Tokyo", country: "Japan", sortAs: "ASIA" },
    { zipCode: "11000", county: "Seoul", streets: ["Gyeongbokgung Palace", "Myeongdong", "Bukchon Hanok Village"], city: "Seoul", country: "South Korea", sortAs: "ASIA" },
    { zipCode: "2020", county: "Kolkata", streets: ["Park Street", "Howrah Bridge", "Victoria Memorial"], city: "Kolkata", country: "India", sortAs: "ASIA" },
    { zipCode: "2000", county: "Beijing", streets: ["Forbidden City", "Tiananmen Square", "Wangfujing"], city: "Beijing", country: "China", sortAs: "ASIA" },
    { zipCode: "1010", county: "Hanoi", streets: ["Hoan Kiem Lake", "Old Quarter", "Temple of Literature"], city: "Hanoi", country: "Vietnam", sortAs: "ASIA" },
    { zipCode: "2022", county: "Dubai", streets: ["Burj Khalifa", "Dubai Mall", "Jumeirah Beach"], city: "Dubai", country: "UAE", sortAs: "ASIA" },
    { zipCode: "7000", county: "Manila", streets: ["Intramuros", "Rizal Park", "Binondo"], city: "Manila", country: "Philippines", sortAs: "ASIA" },
    { zipCode: "15102", county: "Jakarta", streets: ["Monas", "Kota Tua", "Sudirman"], city: "Jakarta", country: "Indonesia", sortAs: "ASIA" },
    { zipCode: "90000", county: "Bangkok", streets: ["Grand Palace", "Wat Arun", "Khao San Road"], city: "Bangkok", country: "Thailand", sortAs: "ASIA" },
    { zipCode: "31000", county: "Kuala Lumpur", streets: ["Petronas Towers", "Batu Caves", "Merdeka Square"], city: "Kuala Lumpur", country: "Malaysia", sortAs: "ASIA" },

    // *** Added Key Countries: Russia, India, Middle East ***
    { zipCode: "101000", county: "Moscow", streets: ["Red Square", "Arbat Street", "Tverskaya Street"], city: "Moscow", country: "Russia", sortAs: "ASIA" },
    { zipCode: "11000", county: "New Delhi", streets: ["India Gate", "Qutub Minar", "Connaught Place"], city: "New Delhi", country: "India", sortAs: "ASIA" },
    { zipCode: "90001", county: "Tehran", streets: ["Golestan Palace", "Niavaran Palace", "Azadi Tower"], city: "Tehran", country: "Iran", sortAs: "ASIA" },
    { zipCode: "20000", county: "Riyadh", streets: ["Kingdom Centre", "Al-Murabba Palace", "National Museum"], city: "Riyadh", country: "Saudi Arabia", sortAs: "ASIA" },
    { zipCode: "64000", county: "Baghdad", streets: ["Tahrir Square", "Al-Mutanabbi Street", "Green Zone"], city: "Baghdad", country: "Iraq", sortAs: "ASIA" },

    // *** Europe (Important Countries + Lithuania) ***
    { zipCode: "1011", county: "Shkoder", streets: ["Rruga e Dajti", "Sheshi Skenderbeu", "Rruga Kalivo"], city: "Tirana", country: "Albania", sortAs: "EU" },
    { zipCode: "1020", county: "Wiener Neustadt", streets: ["Stephansplatz", "Mariahilfer Strasse", "Gumpendorfer Strasse"], city: "Vienna", country: "Austria", sortAs: "EU" },
    { zipCode: "1012", county: "Brussels", streets: ["Grand Place", "Rue de la Loi", "Avenue Louise"], city: "Brussels", country: "Belgium", sortAs: "EU" },
    { zipCode: "1002", county: "Sofia", streets: ["Vitosha Boulevard", "St. Alexander Nevsky Cathedral", "Sofia Square"], city: "Sofia", country: "Bulgaria", sortAs: "EU" },
    { zipCode: "1111", county: "Prague", streets: ["Old Town Square", "Wenceslas Square", "Charles Bridge"], city: "Prague", country: "Czech Republic", sortAs: "EU" },
    { zipCode: "1100", county: "Copenhagen", streets: ["Nyhavn", "Strøget", "Vesterbrogade"], city: "Copenhagen", country: "Denmark", sortAs: "EU" },
    { zipCode: "92000", county: "Vilnius", streets: ["Gedimino Avenue", "Pilies Street", "Bernardinu Garden"], city: "Vilnius", country: "Lithuania", sortAs: "EU" },
    { zipCode: "75001", county: "Paris", streets: ["Champs-Élysées", "Montmartre", "Rue de Rivoli"], city: "Paris", country: "France", sortAs: "EU" },
    { zipCode: "1010", county: "Madrid", streets: ["Puerta del Sol", "Gran Via", "Retiro Park"], city: "Madrid", country: "Spain", sortAs: "EU" },
    { zipCode: "50123", county: "Rome", streets: ["Colosseum", "Vatican City", "Piazza del Popolo"], city: "Rome", country: "Italy", sortAs: "EU" },

    // *** United States (Notable States) ***
    { zipCode: "10001", county: "New York", streets: ["Times Square", "Central Park", "Broadway"], city: "New York", country: "United States", sortAs: "USA" },
    { zipCode: "20005", county: "Washington, D.C.", streets: ["National Mall", "Lincoln Memorial", "Smithsonian"], city: "Washington, D.C.", country: "United States", sortAs: "USA" },
    { zipCode: "90001", county: "Los Angeles", streets: ["Hollywood Blvd", "Venice Beach", "Griffith Observatory"], city: "Los Angeles", country: "United States", sortAs: "USA" },
    { zipCode: "30301", county: "Atlanta", streets: ["Centennial Park", "Georgia Aquarium", "Martin Luther King Jr. National Historical Park"], city: "Atlanta", country: "United States", sortAs: "USA" },
    { zipCode: "60601", county: "Chicago", streets: ["Millennium Park", "Navy Pier", "Magnificent Mile"], city: "Chicago", country: "United States", sortAs: "USA" },
    { zipCode: "33101", county: "Miami", streets: ["South Beach", "Little Havana", "Wynwood Walls"], city: "Miami", country: "United States", sortAs: "USA" },

    // *** South America (Notable Countries) ***
    { zipCode: "1010", county: "Buenos Aires", streets: ["Plaza de Mayo", "Recoleta Cemetery", "Calle Florida"], city: "Buenos Aires", country: "Argentina", sortAs: "LATIN" },
    { zipCode: "2000", county: "São Paulo", streets: ["Avenida Paulista", "Ibirapuera Park", "Rua Oscar Freire"], city: "São Paulo", country: "Brazil", sortAs: "LATIN" },
    { zipCode: "5000", county: "Lima", streets: ["Plaza Mayor", "Miraflores", "Parque Kennedy"], city: "Lima", country: "Peru", sortAs: "LATIN" },
    { zipCode: "3000", county: "Bogotá", streets: ["La Candelaria", "Monserrate", "Gold Museum"], city: "Bogotá", country: "Colombia", sortAs: "LATIN" },
    { zipCode: "7000", county: "Santiago", streets: ["Plaza de Armas", "Cerro San Cristóbal", "Barrio Bellavista"], city: "Santiago", country: "Chile", sortAs: "LATIN" },
    { zipCode: "20000", county: "Quito", streets: ["Plaza de la Independencia", "La Ronda", "Calle La Mariscal"], city: "Quito", country: "Ecuador", sortAs: "LATIN" },

    // *** Africa (Notable Countries) ***
    { zipCode: "1010", county: "Lagos", streets: ["Lekki Market", "Victoria Island", "National Theatre"], city: "Lagos", country: "Nigeria", sortAs: "AFRICA" },
    { zipCode: "1234", county: "Cairo", streets: ["Pyramids of Giza", "Tahrir Square", "Khan el-Khalili"], city: "Cairo", country: "Egypt", sortAs: "AFRICA" },
    { zipCode: "1000", county: "Nairobi", streets: ["Nairobi National Park", "Karen Blixen Museum", "Giraffe Centre"], city: "Nairobi", country: "Kenya", sortAs: "AFRICA" },
    { zipCode: "20100", county: "Cape Town", streets: ["Table Mountain", "V&A Waterfront", "Robben Island"], city: "Cape Town", country: "South Africa", sortAs: "AFRICA" },
    { zipCode: "44101", county: "Accra", streets: ["Labadi Beach", "Kwame Nkrumah Memorial Park", "Osu Castle"], city: "Accra", country: "Ghana", sortAs: "AFRICA" },
    { zipCode: "1000", county: "Addis Ababa", streets: ["National Museum", "Bole", "Menelik II Square"], city: "Addis Ababa", country: "Ethiopia", sortAs: "AFRICA" },

    // *** Oceania (Couple of Countries) **
]

export const firstNames = [
    "Adam", "Albin", "Alfred", "Alma", "Alvar", "Alve", "Amir", "Anna", "Anton", "Aron", "Astrid",
    "August", "Axel", "Benjamin", "Bill", "Björn", "Charlie", "Christina", "Casper", "Dante", "Ebba",
    "Ebbi", "Eduard", "Elias", "Elina", "Ellie", "Emma", "Emil", "Erik", "Eva", "Filip", "Folke", "Frans",
    "Gabriel", "Gustav", "Hanna", "Harry", "Henry", "Hjalmar", "Hugo", "Ivar", "Jack", "Jan", "Johan", "Joel",
    "Julian", "Karin", "Karl", "Kerstin", "Kian", "Knut", "Lars", "Levi", "Liam", "Lena", "Leo", "Leon", "Lili",
    "Lina", "Linnéa", "Lisa", "Liva", "Loke", "Love", "Lucas", "Ludvig", "Lukas", "Luna", "Madeleine", "Malte",
    "Maria", "Marie", "Matheo", "Max", "Melker", "Melvin", "Mikael", "Milan", "Milo", "Milton", "Nils", "Noel",
    "Omar", "Oliver", "Olle", "Otis", "Otto", "Oskar", "Per", "Peter", "Philip", "Sam", "Sara", "Sigge", "Sixten",
    "Sophia", "Theo", "Thomas", "Valter", "Vera", "Viggo", "Vincent", "William", "Wilhelm", "Walter", "Xavier",
    "Ylva", "Åke", "Ava", "Liam", "Zara", "Ibrahim", "Hiroshi", "Fatima", "Carlos", "Mohammed", "Priya", "Luca",
    "Elena", "Maya", "Amira", "Sebastian", "Lucas", "Leo", "Kai", "Ximena", "Youssef", "Ayaan", "Kofi", "Jade",
    "Xander", "Nia", "Thalia", "Noah", "Keisha", "Santiago", "Leila", "Evelyn", "Tariq", "Sanaa", "Soraya",
    "Matteo", "Jin", "Tenzin", "Jun", "Ravi", "Gita", "Chinonso", "Oluwaseun", "Dinesh", "Rhea", "Javier",
    "Zane", "Tariq", "Hassan", "Arvind", "Ramon", "Tomas", "Lina", "Juan", "Alicia", "Carmen", "Lucia", "Zara",
    "Mariam", "Khalid", "Asma", "Sami", "Hassan", "Yara", "Chloe", "Noelle", "Anjali", "Indira", "Ayesha", "Anwar",
    "Rashid", "Zubair", "Matilda", "Sven", "Isha", "Benedicta", "Chetan", "Kwame", "Musa", "Kwabena", "Felix",
    "Zahra", "Isabella", "Nadia", "Eloise", "Oscar", "Eva", "Jasmin", "Diana", "Karim", "Zoya", "Nina", "Hadiya",
    "Lorenzo", "Esme", "Leandro", "Aurelia", "Boris", "Omar", "Mira", "Raj", "Yasmin", "Diana", "Gustavo", "Tunde",
    "Lola", "Dimitri", "Ksenia", "Sasha", "Nikolai", "Svetlana", "Darya", "Rostislav", "Karolina", "Zbigniew",
    "Andrei", "Elena", "Milena", "Zofia", "Lucian", "Bogdan", "Aditya", "Disha", "Pooja", "Lalita", "Swati", "Manoj",
    "Alejandro", "Leonardo", "Marcelo", "Francisco", "Andres", "Violet", "Fernanda", "Luz", "Joaquin", "Victoria",
    "Marta", "Carla", "Lucas", "Giulia", "Matilde", "Luisa", "Mia", "Sofia", "Gabriela", "Camila", "Isadora", "Anya",
    "Sofia", "Giovanni", "Zoe", "Camila", "Anastasia", "Rania", "Katerina", "Elif", "Leyla", "Mira", "Nina"
];

export const lastNames = [
    "Abrahamsson", "Ahmed", "Ali", "Andreasson", "Arvidsson", "Axelsson", "Bengtsson", "Berger", "Berggren",
    "Bergkvist", "Bergman", "Bergström", "Blom", "Blomberg", "Blomkvist", "Blomquist", "Blomqvist", "Björk",
    "Björklund", "Björnsson", "Claesson", "Danielsson", "Dahlberg", "Ek", "Ekberg", "Ekblad", "Ekholm", "Ekström",
    "Eliasson", "Engström", "Eriksson", "Eklund", "Fallberg", "Fredriksson", "Fransson", "Frantzén", "Frisk",
    "Gunnarsson", "Gustafsson", "Gyllenhaal", "Hallberg", "Hansson", "Hedberg", "Hellström", "Henriksson",
    "Hermansson", "Holberg", "Holmgren", "Holmqvist", "Hultén", "Hägg", "Hällström", "Jakobsson", "Jansson",
    "Johansson", "Jonsson", "Jönsson", "Karlsson", "Klintberg", "Klingberg", "Klintström", "Knutsson", "Krüger",
    "Kullberg", "Kullén", "Kurck", "Larsson", "Lindberg", "Lindblad", "Lindell", "Lindgren", "Lindholm", "Lindkvist",
    "Lindner", "Lindroos", "Lindström", "Lindqvist", "Lindsten", "Lindwall", "Ljungberg", "Ljunggren", "Löfgren",
    "Lundberg", "Lundgren", "Lundkvist", "Lundmark", "Lundström", "Magnusson", "Mattsson", "Malmberg", "Malmgren",
    "Malmqvist", "Malmström", "Månsson", "Martinsson", "Melin", "Mellberg", "Mellgren", "Mellqvist", "Mellström",
    "Mohamed", "Molin", "Moller", "Mörner", "Mörtberg", "Mörtén", "Mörtstedt", "Norberg", "Nordin", "Nyberg",
    "Nyström", "Olsson", "Olofsson", "Persson", "Pettersson", "Pålsson", "Sandberg", "Sandström", "Sjögren",
    "Sjöberg", "Ström", "Strömberg", "Sundberg", "Sundström", "Söderberg", "Tage", "Viklund", "Wallin", "Åberg",
    "Åkesson", "Åström", "Nguyen", "Tanaka", "Li", "Wang", "Chavez", "Ramirez", "Gomez", "Hernandez", "Lopez",
    "Martinez", "Perez", "Garcia", "Rodriguez", "Kim", "Park", "Choi", "Lee", "Jang", "Song", "Kang", "Yang",
    "Kumar", "Patel", "Sharma", "Singh", "Mehta", "Gupta", "Reddy", "Naidu", "Ibrahim", "Abdullah", "Aliyu",
    "Mohammed", "Bello", "Aminu", "Zhang", "Xu", "Chen", "Liu", "Mao", "Zhao", "Wang", "Tan", "Ng", "Tan", "Khoo",
    "Fong", "Jansen", "De Vries", "Van den Berg", "De Jong", "Smit", "Bakker", "Hofman", "Visser", "Van Dijk",
    "Schmidt", "Müller", "Schneider", "Weber", "Fischer", "Becker", "Wagner", "Hoffmann", "Klein", "Zimmermann",
    "Schulz", "Bauer", "Weiss", "Meier", "Böhm", "Krause", "Steiner", "Schwarz", "Hartmann", "Bauer", "Hansen",
    "Johansen", "Olsen", "Eriksen", "Nilsen", "Andersen", "Larsen", "Jensen", "Pedersen", "Kristensen", "Wang",
    "Tso", "Lau", "Wu", "Yip", "Cheng", "Shen", "Tanaka", "Abe", "Takeda", "Nakamura", "Yamamoto", "Matsumoto",
    "Inoue", "Fujimoto", "Kobayashi", "Yoshida", "Chung", "Yip", "Hong", "Huang", "Nguyen", "Tran", "Pham", "Luu",
    "Fong", "Yeo", "Liu", "Lin", "Sullivan", "Kelly", "O'Connor", "Murphy", "Smith", "Davis", "Miller", "Wilson",
    "Taylor", "Moore", "Clark", "Johnson", "Lewis", "Scott", "Roberts", "Walker", "Young", "Allen", "Harris",
    "Baker", "Gonzalez", "Ramirez", "Adams", "Nelson", "Hill", "Carter", "Mitchell", "Perez", "Green", "Phillips",
    "King", "Campbell", "Davis", "Evans", "Turner", "Thomas", "Bashir", "Aliyev", "Khan", "Khoury", "Sanchez"
];

