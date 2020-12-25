/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?

Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/
// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {
    meats: ["Pepperoni", "Sausage", "Fennel Sausage",
        "Spicy Sausage", "Chicken", "BBQ Chicken", "Chorizo",
        "Chicken Andouille", "Salami", "Tofu", "Bacon",
        "Canadian Bacon", "Proscuitto", "Italian Sausage",
        "Ground Beef", "Anchovies", "Turkey", "Ham",
        "Venison", "Lamb", "Duck", "Soylent Green",
        "Carne Asada", "Soppressata Picante", "Coppa",
        "Pancetta", "Bresola", "Lox", "Guanciale", "Chili",
        "Beef Jerky", "Pastrami", "Kielbasa", "Scallops",
        "Filet Mignon"
    ],
    nonMeats: ["White Onions", "Red Onions", "Sauteed Onions",
        "Green Peppers", "Red Peppers", "Banana Peppers",
        "Ghost Peppers", "Habanero Peppers",
        "Jalapeno Peppers", "Stuffed Peppers", "Spinach",
        "Tomatoes", "Pineapple", "Pear Slices",
        "Apple Slices", "Mushrooms", "Arugula", "Basil",
        "Fennel", "Rosemary", "Cilantro", "Avocado",
        "Guacamole", "Salsa", "Swiss Chard", "Kale",
        "Sun Dried Tomatoes", "Walnuts", "Artichoke",
        "Asparagus", "Caramelized Onions", "Mango", "Garlic",
        "Olives", "Cauliflower", "Polenta", "Fried Egg",
        "Zucchini", "Hummus"
    ],
    cheeses: ["American Cheese", "Swiss Cheese", "Goat Cheese",
        "Mozzarella Cheese", "Parmesean Cheese",
        "Velveeta Cheese", "Gouda Cheese", "Muenster Cheese",
        "Applewood Cheese", "Asiago Cheese",
        "Bleu Cheese", "Boursin Cheese", "Brie Cheese",
        "Cheddar Cheese", "Chevre Cheese", "Havarti Cheese",
        "Jack Cheese", "Pepper Jack Cheese", "Gruyere Cheese",
        "Limberger Cheese", "Manchego Cheese",
        "Marscapone Cheese", "Pecorino Cheese",
        "Provolone Cheese", "Queso Cheese",
        "Roquefort Cheese",
        "Romano Cheese", "Ricotta Cheese", "Smoked Gouda"
    ],
    sauces: ["Red Sauce", "Marinara", "BBQ Sauce", "No Sauce",
        "Hot Sauce"
    ],
    crusts: ["White Crust", "Whole Wheat Crust",
        "Flatbread Crust", "Stuffed Crust"
    ]
};

// Populate Arrays for Adjectives and Nouns
// OPTIMIZATION: Store Adjectives and Nouns Inside Object Instead of Seperate Arrays to Simplify Process
var adjectives = {
        types: ["dark", "color", "whimsical", "shiny", "noise",
            "apocalyptic", "insulting", "praise", "scientific"
        ], // types of adjectives for pizza titles
        dark: ["dark", "morbid", "scary", "spooky", "gothic",
            "deviant", "creepy", "sadistic", "black", "dangerous",
            "dejected", "haunted", "morose", "tragic",
            "shattered", "broken", "sad", "melancholy", "somber",
            "dark",
            "gloomy", "homicidal", "murderous", "shady", "misty",
            "dusky", "ghostly", "shadowy", "demented",
            "cursed", "insane", "possessed", "grotesque",
            "obsessed"
        ],
        colors: ["blue", "green", "purple", "grey", "scarlet",
            "NeonGreen", "NeonBlue", "NeonPink", "HotPink",
            "pink",
            "black", "red", "maroon", "silver", "golden",
            "yellow", "orange", "mustard", "plum", "violet",
            "cerulean", "brown", "lavender", "violet", "magenta",
            "chestnut", "rosy", "copper", "crimson", "teal",
            "indigo", "navy", "azure", "periwinkle", "brassy",
            "verdigris", "veridian", "tan", "raspberry", "beige",
            "sandy", "ElectricBlue", "white", "champagne",
            "coral", "cyan"
        ],
        whimsy: ["whimsical", "silly", "drunken", "goofy", "funny",
            "weird", "strange", "odd", "playful", "clever",
            "boastful", "breakdancing", "hilarious", "conceited",
            "happy", "comical", "curious", "peculiar",
            "quaint", "quirky", "fancy", "wayward", "fickle",
            "yawning", "sleepy", "cockeyed", "dizzy", "dancing",
            "absurd", "laughing", "hairy", "smiling", "perplexed",
            "baffled", "cockamamie", "vulgar", "hoodwinked",
            "brainwashed"
        ],
        shine: ["sapphire", "opal", "silver", "gold", "platinum",
            "ruby", "emerald", "topaz", "diamond", "amethyst",
            "turquoise", "starlit", "moonlit", "bronze", "metal",
            "jade", "amber", "garnet", "obsidian", "onyx",
            "pearl", "copper", "sunlit", "brass", "brassy",
            "metallic"
        ],
        noisy: ["untuned", "loud", "soft", "shrieking", "melodious",
            "musical", "operatic", "symphonic", "dancing",
            "lyrical", "harmonic", "orchestral", "noisy",
            "dissonant", "rhythmic", "hissing", "singing",
            "crooning",
            "shouting", "screaming", "wailing", "crying",
            "howling", "yelling", "hollering", "caterwauling",
            "bawling", "bellowing", "roaring", "squealing",
            "beeping", "knocking", "tapping", "rapping",
            "humming",
            "scatting", "whispered", "whispering", "rasping",
            "buzzing", "whirring", "whistling", "whistled"
        ],
        apocalyptic: ["nuclear", "apocalyptic", "desolate", "atomic",
            "zombie", "collapsed", "grim", "fallen",
            "collapsed", "cannibalistic", "radioactive", "toxic",
            "poisonous", "venomous", "disastrous", "grimy",
            "dirty", "undead", "bloodshot", "rusty", "glowing",
            "decaying", "rotten", "deadly", "plagued",
            "decimated", "rotting", "putrid", "decayed",
            "deserted", "acidic"
        ],
        insulting: ["stupid", "idiotic", "fat", "ugly", "hideous",
            "grotesque", "dull", "dumb", "lazy", "sluggish",
            "brainless", "slow", "gullible", "obtuse", "dense",
            "dim", "dazed", "ridiculous", "witless", "daft",
            "crazy", "vapid", "inane", "mundane", "hollow",
            "vacuous", "boring", "insipid", "tedious",
            "monotonous",
            "weird", "bizarre", "backward", "moronic", "ignorant",
            "scatterbrained", "forgetful", "careless",
            "lethargic", "insolent", "indolent", "loitering",
            "gross", "disgusting", "bland", "horrid", "unseemly",
            "revolting", "homely", "deformed", "disfigured",
            "offensive", "cowardly", "weak", "villainous",
            "fearful", "monstrous", "unattractive", "unpleasant",
            "nasty", "beastly", "snide", "horrible",
            "syncophantic", "unhelpful", "bootlicking"
        ],
        praise: ["beautiful", "intelligent", "smart", "genius",
            "ingenious", "gorgeous", "pretty", "witty", "angelic",
            "handsome", "graceful", "talented", "exquisite",
            "enchanting", "fascinating", "interesting", "divine",
            "alluring", "ravishing", "wonderful", "magnificient",
            "marvelous", "dazzling", "cute", "charming",
            "attractive", "nifty", "delightful", "superior",
            "amiable", "gentle", "heroic", "courageous",
            "valiant",
            "brave", "noble", "daring", "fearless", "gallant",
            "adventurous", "cool", "enthusiastic", "fierce",
            "awesome", "radical", "tubular", "fearsome",
            "majestic", "grand", "stunning"
        ],
        scientific: ["scientific", "technical", "digital",
            "programming", "calculating", "formulating",
            "cyberpunk",
            "mechanical", "technological", "innovative", "brainy",
            "chemical", "quantum", "astro", "space",
            "theoretical", "atomic", "electronic", "gaseous",
            "investigative", "solar", "extinct", "galactic"
        ]
    },
    nouns = {
        types: ["animals", "everyday", "fantasy", "gross", "horror",
            "jewelry", "places", "scifi"
        ], // types of nouns for pizza titles
        animals: ["flamingo", "hedgehog", "owl", "elephant",
            "pussycat", "alligator", "dachsund", "poodle",
            "beagle",
            "crocodile", "kangaroo", "wallaby", "woodpecker",
            "eagle", "falcon", "canary", "parrot", "parakeet",
            "hamster", "gerbil", "squirrel", "rat", "dove",
            "toucan", "raccoon", "vulture", "peacock", "goldfish",
            "rook", "koala", "skunk", "goat", "rooster", "fox",
            "porcupine", "llama", "grasshopper", "gorilla",
            "monkey", "seahorse", "wombat", "wolf", "giraffe",
            "badger", "lion", "mouse", "beetle", "cricket",
            "nightingale", "hawk", "trout", "squid", "octopus",
            "sloth", "snail", "locust", "baboon", "lemur",
            "meerkat", "oyster", "frog", "toad", "jellyfish",
            "butterfly", "caterpillar", "tiger", "hyena", "zebra",
            "snail", "pig", "weasel", "donkey", "penguin",
            "crane", "buzzard", "vulture", "rhino",
            "hippopotamus",
            "dolphin", "sparrow", "beaver", "moose", "minnow",
            "otter", "bat", "mongoose", "swan", "firefly",
            "platypus"
        ],
        professions: ["doctor", "lawyer", "ninja", "writer",
            "samurai", "surgeon", "clerk", "artist", "actor",
            "engineer", "mechanic", "comedian", "fireman",
            "nurse", "RockStar", "musician", "carpenter",
            "plumber",
            "cashier", "electrician", "waiter", "president",
            "governor", "senator", "scientist", "programmer",
            "singer", "dancer", "director", "mayor", "merchant",
            "detective", "investigator", "navigator", "pilot",
            "priest", "cowboy", "stagehand", "soldier",
            "ambassador", "pirate", "miner", "police"
        ],
        fantasy: ["centaur", "wizard", "gnome", "orc", "troll",
            "sword", "fairy", "pegasus", "halfling", "elf",
            "changeling", "ghost", "knight", "squire", "magician",
            "witch", "warlock", "unicorn", "dragon",
            "wyvern", "princess", "prince", "king", "queen",
            "jester", "tower", "castle", "kraken", "seamonster",
            "mermaid", "psychic", "seer", "oracle"
        ],
        horror: ["murderer", "chainsaw", "knife", "sword", "murder",
            "devil", "killer", "psycho", "ghost", "monster",
            "godzilla", "werewolf", "vampire", "demon",
            "graveyard", "zombie", "mummy", "curse", "death",
            "grave",
            "tomb", "beast", "nightmare", "frankenstein",
            "specter", "poltergeist", "wraith", "corpse",
            "scream",
            "massacre", "cannibal", "skull", "bones",
            "undertaker", "zombie", "creature", "mask",
            "psychopath",
            "fiend", "satanist", "moon", "fullMoon"
        ],
        music: ["violin", "flute", "bagpipe", "guitar", "symphony",
            "orchestra", "piano", "trombone", "tuba", "opera",
            "drums", "harpsichord", "harp", "harmonica",
            "accordion", "tenor", "soprano", "baritone", "cello",
            "viola", "piccolo", "ukelele", "woodwind",
            "saxophone", "bugle", "trumpet", "sousaphone",
            "cornet",
            "stradivarius", "marimbas", "bells", "timpani",
            "bongos", "clarinet", "recorder", "oboe", "conductor",
            "singer"
        ],
        gross: ["slime", "bug", "roach", "fluid", "pus", "booger",
            "spit", "boil", "blister", "orifice", "secretion",
            "mucus", "phlegm", "centipede", "beetle", "fart",
            "snot", "crevice", "flatulence", "juice", "mold",
            "mildew", "germs", "discharge", "toilet", "udder",
            "odor", "substance", "fluid", "moisture", "garbage",
            "trash", "bug"
        ],
        everyday: ["mirror", "knife", "fork", "spork", "spoon",
            "tupperware", "minivan", "suburb", "lamp", "desk",
            "stereo", "television", "TV", "book", "car", "truck",
            "soda", "door", "video", "game", "computer",
            "calender", "tree", "plant", "flower", "chimney",
            "attic", "kitchen", "garden", "school", "wallet",
            "bottle"
        ],
        jewelry: ["earrings", "ring", "necklace", "pendant", "choker",
            "brooch", "bracelet", "cameo", "charm", "bauble",
            "trinket", "jewelry", "anklet", "bangle", "locket",
            "finery", "crown", "tiara", "blingBling", "chain",
            "rosary", "jewel", "gemstone", "beads", "armband",
            "pin", "costume", "ornament", "treasure"
        ],
        places: ["swamp", "graveyard", "cemetery", "park", "building",
            "house", "river", "ocean", "sea", "field",
            "forest", "woods", "neighborhood", "city", "town",
            "suburb", "country", "meadow", "cliffs", "lake",
            "stream", "creek", "school", "college", "university",
            "library", "bakery", "shop", "store", "theater",
            "garden", "canyon", "highway", "restaurant", "cafe",
            "diner", "street", "road", "freeway", "alley"
        ],
        scifi: ["robot", "alien", "raygun", "spaceship", "UFO",
            "rocket", "phaser", "astronaut", "spaceman", "planet",
            "star", "galaxy", "computer", "future", "timeMachine",
            "wormHole", "timeTraveler", "scientist",
            "invention", "martian", "pluto", "jupiter", "saturn",
            "mars", "quasar", "blackHole", "warpDrive",
            "laser", "orbit", "gears", "molecule", "electron",
            "neutrino", "proton", "experiment", "photon",
            "apparatus", "universe", "gravity", "darkMatter",
            "constellation", "circuit", "asteroid"
        ]
    };

// Pulls adjective out of array using random number sent from generator
function getAdj(x) {
    switch (x) {
        case "dark":
            return adjectives.dark;
        case "color":
            return adjectives.colors;
        case "whimsical":
            return adjectives.whimsy;
        case "shiny":
            return adjectives.shine;
        case "noisy":
            return adjectives.noisy;
        case "apocalyptic":
            return adjectives.apocalyptic;
        case "insulting":
            return adjectives.insulting;
        case "praise":
            return adjectives.praise;
        case "scientific":
        default:
            return adjectives.scientific;
    }
}

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
    switch (y) {
        case "animals":
            return nouns.animals;
        case "profession":
            return nouns.professions;
        case "fantasy":
            return nouns.fantasy;
        case "music":
            return nouns.music;
        case "horror":
            return nouns.horror;
        case "gross":
            return nouns.gross;
        case "everyday":
            return nouns.everyday;
        case "jewelry":
            return nouns.jewelry;
        case "places":
            return nouns.places;
        case "scifi":
        default:
            return nouns.scifi;
    }
}

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
    var adjectivess = getAdj(adj),
        nounss = getNoun(noun);
    
    var randomAdjective = parseInt(Math.random() * adjectivess.length, 10),
        randomNoun = parseInt(Math.random() * nounss.length, 10),
        name = "The " + adjectivess[randomAdjective].capitalize() +
        " " + nounss[randomNoun].capitalize();

    return name;
}

// Chooses random adjective and random noun
function randomName() {
    var randomNumberAdj = parseInt(Math.random() * adjectives.types.length,
            10),
        randomNumberNoun = parseInt(Math.random() * nouns.types.length,
            10);

    return generator(adjectives.types[randomNumberAdj], nouns.types[
        randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
    var randomMeat = pizzaIngredients.meats[Math.floor(Math.random() *
        pizzaIngredients.meats.length)];
    return randomMeat;
};

var selectRandomNonMeat = function() {
    var randomNonMeat = pizzaIngredients.nonMeats[Math.floor(Math
        .random() * pizzaIngredients.nonMeats.length)];
    return randomNonMeat;
};

var selectRandomCheese = function() {
    var randomCheese = pizzaIngredients.cheeses[Math.floor(Math.random() *
        pizzaIngredients.cheeses.length)];
    return randomCheese;
};

var selectRandomSauce = function() {
    var randomSauce = pizzaIngredients.sauces[Math.floor(Math.random() *
        pizzaIngredients.sauces.length)];
    return randomSauce;
};

var selectRandomCrust = function() {
    var randomCrust = pizzaIngredients.crusts[Math.floor(Math.random() *
        pizzaIngredients.crusts.length)];
    return randomCrust;
};

var ingredientItemizer = function(string) {
    return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
    // OPTIMIZATION: combine all variable under same declaration and remove unnecessary parentheses
    var pizza = "",
        numberOfMeats = Math.floor(Math.random() * 4),
        numberOfNonMeats = Math.floor(Math.random() * 3),
        numberOfCheeses = Math.floor(Math.random() * 2);

    for (var i = 0; i < numberOfMeats; i++) {
        pizza = pizza + ingredientItemizer(selectRandomMeat());
    }

    for (var j = 0; j < numberOfNonMeats; j++) {
        pizza = pizza + ingredientItemizer(selectRandomNonMeat());
    }

    for (var k = 0; k < numberOfCheeses; k++) {
        pizza = pizza + ingredientItemizer(selectRandomCheese());
    }

    pizza = pizza + ingredientItemizer(selectRandomSauce()) +
        ingredientItemizer(selectRandomCrust());

    return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
    var pizzaContainer = document.createElement("div"), // contains pizza title, image and list of ingredients
        pizzaImageContainer = document.createElement("div"), // contains the pizza image
        pizzaImage = document.createElement("img"), // the pizza image itself
        pizzaDescriptionContainer = document.createElement("div"), // contains the pizza title and list of ingredients
        pizzaName = document.createElement("h4"), // the pizza name itself
        ul = document.createElement("ul"); // the list of ingredients

    pizzaContainer.classList.add("randomPizzaContainer");
    pizzaContainer.style.width = "33.33%";
    pizzaContainer.style.height = "325px";
    pizzaContainer.id = "pizza" + i; // gives each pizza element a unique id
    pizzaImageContainer.classList.add("col-md-6");

    pizzaImage.src = "images/pizza.png";
    pizzaImage.classList.add("img-responsive");
    pizzaImageContainer.appendChild(pizzaImage);
    pizzaContainer.appendChild(pizzaImageContainer);

    pizzaDescriptionContainer.classList.add("col-md-6");

    pizzaName.innerHTML = randomName();
    pizzaDescriptionContainer.appendChild(pizzaName);

    ul.innerHTML = makeRandomPizza();
    pizzaDescriptionContainer.appendChild(ul);
    pizzaContainer.appendChild(pizzaDescriptionContainer);

    return pizzaContainer;
};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
    window.performance.mark("mark_start_resize"); // User Timing API function

    // Changes the value for the size of the pizza above the slider
    function changeSliderLabel(size) {
        switch (size) {
            case "1":
                document.getElementById("pizzaSize").innerHTML = // Use Id Selector Instead of Query Selector
                    "Small";
                return;
            case "2":
                document.getElementById("pizzaSize").innerHTML =
                    "Medium";
                return;
            case "3":
                document.getElementById("pizzaSize").innerHTML =
                    "Large";
                return;
            default:
                console.log("bug in changeSliderLabel");
        }
    }

    changeSliderLabel(size);

    // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
    function determineDx(elem, size) {
        var oldwidth = elem.offsetWidth,
            windowwidth = document.getElementById("randomPizzas")
            .offsetWidth,
            oldsize = oldwidth / windowwidth;

        // Changes the slider value to a percent width
        function sizeSwitcher(size) {
            switch (size) {
                case "1":
                    return 0.25;
                case "2":
                    return 0.3333;
                case "3":
                    return 0.5;
                default:
                    console.log("bug in sizeSwitcher");
            }
        }

        var newsize = sizeSwitcher(size),
            dx = (newsize - oldsize) * windowwidth;

        return dx;
    }
    // Iterates through pizza elements on the page and changes their widths
    // OPTIMIZATION: set randomPizzaContainer element outside of loop and perform other calculations outside of loop so they are not repeated unnecessarily
    function changePizzaSizes(size) {
        var randomPizzaContainer = document.getElementsByClassName(
                "randomPizzaContainer"),
            dx = determineDx(randomPizzaContainer[0], size),
            newwidth = (randomPizzaContainer[0].offsetWidth + dx)
                +'px';

        for (var i = 0, len = randomPizzaContainer.length; i <
            len; i++) {
            randomPizzaContainer[i].style.width = newwidth;
        }
    }

    changePizzaSizes(size);

    // User Timing API is awesome
    window.performance.mark("mark_end_resize");
    window.performance.measure("measure_pizza_resize",
        "mark_start_resize", "mark_end_resize");

    var timeToResize = window.performance.getEntriesByName(
        "measure_pizza_resize");
    console.log("Time to resize pizzas: " + timeToResize[0].duration +
        "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data
// This for-loop actually creates and appends all of the pizzas when the page loads
// OPTIMIZATION: Removed pizzasDiv from loop as it is the same element, reduced count of pizzas to enhance performance as well
var pizzasDiv = document.getElementById("randomPizzas");
for (var i = 2; i < 100; i++) {
    pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation",
    "mark_start_generating", "mark_end_generating");

var timeToGenerate = window.performance.getEntriesByName(
    "measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration +
    "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) { // times is the array of User Timing measurements from updatePositions()
    var numberOfEntries = times.length - 1,
        sum = 0;
    for (var i = numberOfEntries; i > numberOfEntries - 10; i--) {
        sum = sum + times[i].duration;
    }
    console.log("Average time to generate last 10 frames: " + sum /
        10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame");
    // OPTIMIZATION: Use single var declaration for all four variables; instantiate phase variable and precalculate top variable outside of the for loop in order to increase performance
    var items = document.getElementsByClassName('mover'),
        top = document.body.scrollTop / 1250,
        phase;
    
    for (var i = 0, len = items.length; i < len; i++) {
        phase = Math.sin(top + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
    }

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration",
        "mark_start_frame", "mark_end_frame");

    if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName(
            "measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
    }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
    // OPTIMIZATION: Use single var declaration for all four variables; instantiate elem variable and reference pizGroup element outside for loop as not to repeatedly declare the same variables
    var cols = 8,
        s = 256,
        elem,
        pizGroup = document.getElementById("movingPizzas1");
    // OPTIMIZATION: Decrease Number of Pizzas in Background to Enhance Performance
    for (var i = 0; i < 48; i++) {
        elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        pizGroup.appendChild(elem);
    }
    updatePositions();
});