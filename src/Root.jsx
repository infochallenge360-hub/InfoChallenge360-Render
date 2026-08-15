import "./index.css";
import { Composition } from "remotion";
import { MnbetyIntro, TOTAL_FRAMES } from "./Mnbety";
import { MnbetyHost, HOST_FRAMES } from "./Mnbety/host";
import { MnbetyCareer, CAREER_FRAMES } from "./Mnbety/career";
import { MnbetyReel, REEL_FRAMES } from "./Mnbety/reel";
import { MnbetyCourseIntroEnglish, COURSE_INTRO_ENGLISH_FRAMES } from "./Mnbety/scenes/CourseIntroEnglish";
import { FlagQuiz, BgPreview, LogoPreview } from "./Quiz";
import { PlayerQuizSample, PLAYER_SAMPLE_FRAMES, PlayerQuiz, PLAYER_FRAMES } from "./Quiz/players";
import { LogoQuiz, LOGO_FRAMES, LogoQuizSample, LOGO_SAMPLE_FRAMES } from "./Quiz/logos";
import { LogoQuiz2, LOGO2_FRAMES } from "./Quiz/logos2";
import { FlagQuiz2GS, FLAG2_FRAMES } from "./Quiz/flags2";
import { CapitalQuiz2GS, CAPITAL2_FRAMES } from "./Quiz/capitals2";
import { LogoQuiz3, LOGO3_FRAMES } from "./Quiz/logos3";
import { LOGOS3 } from "./Quiz/logos3Data";
import { ShapeQuizGS, SHAPE_FRAMES } from "./Quiz/shapes";
import { SHAPES1 } from "./Quiz/shapes1Data";
import { LogoQuiz4, LOGO4_FRAMES } from "./Quiz/logos4";
import { LOGOS4 } from "./Quiz/logos4Data";
import { CountryQuiz2GS, COUNTRY2_FRAMES } from "./Quiz/countries2";
import { ShapeQuiz2GS, SHAPE2_FRAMES } from "./Quiz/shapes2";
import { SHAPES2 } from "./Quiz/shapes2Data";
import { AnimalQuiz, ANIMAL_FRAMES } from "./Quiz/animals";
import { ANIMALS } from "./Quiz/animalsData";
import { ANIMAL_FACTS } from "./Quiz/animalFacts";
import { FoodQuiz, FOOD_FRAMES } from "./Quiz/foods";
import { FOODS } from "./Quiz/foodsData";
import { FOOD_FACTS } from "./Quiz/foodFacts";
import { DogQuiz, DOG_FRAMES } from "./Quiz/dogs";
import { DOGS } from "./Quiz/dogsData";
import { LandmarkQuiz, LANDMARK_FRAMES } from "./Quiz/landmarks";
import { LANDMARKS } from "./Quiz/landmarksData";
import { CarQuiz, CAR_FRAMES } from "./Quiz/cars";
import { CARS } from "./Quiz/carsData";
import { PaintingQuiz, PAINTING_FRAMES } from "./Quiz/paintings";
import { PAINTINGS } from "./Quiz/paintingsData";
import { BirdQuiz, BIRD_FRAMES } from "./Quiz/birds";
import { BIRDS } from "./Quiz/birdsData";
import { SeaQuiz, SEA_FRAMES } from "./Quiz/sea";
import { SEA } from "./Quiz/seaData";
import { FruitsQuiz, FRUITS_FRAMES } from "./Quiz/fruits";
import { FRUITS } from "./Quiz/fruitsData";
import { GsThumbV2, GsThumbHeroV2, GsThumbSplitV2, GsThumbNumberV2 } from "./Quiz/gsthumb2";
import { GsThumbV3 } from "./Quiz/gsthumb3";
import { GsThumbV4 } from "./Quiz/gsthumb4";
import { QuizV2, quizFrames } from "./Quiz/quizv2";
import { TEST_ANIMALS } from "./Quiz/testAnimalsData";
import { TEST_ANIMALS_FACTS } from "./Quiz/testAnimalsFacts";
import { ANIMALS_E01 } from "./Quiz/animalsE01Data";
import { ANIMALS_E01_FACTS } from "./Quiz/animalsE01Facts";
import { FLAGS_E02 } from "./Quiz/flagsE02Data";
import { FLAGS_E02_FACTS } from "./Quiz/flagsE02Facts";
import { LOGOS_E03 } from "./Quiz/logosE03Data";
import { LOGOS_E03_FACTS } from "./Quiz/logosE03Facts";
import { FOODS_E04 } from "./Quiz/foodsE04Data";
import { FOODS_E04_FACTS } from "./Quiz/foodsE04Facts";
import { ANIMAL_SILHOUETTES_E05 } from "./Quiz/animalSilhouettesE05Data";
import { ANIMAL_SILHOUETTES_E05_FACTS } from "./Quiz/animalSilhouettesE05Facts";
import { COUNTRY_SHAPES_E06 } from "./Quiz/countryShapesE06Data";
import { COUNTRY_SHAPES_E06_FACTS } from "./Quiz/countryShapesE06Facts";
import { CAR_LOGOS_E07 } from "./Quiz/carLogosE07Data";
import { CAR_LOGOS_E07_FACTS } from "./Quiz/carLogosE07Facts";
import { COUNTRY_BY_FOOD_E08 } from "./Quiz/countryByFoodE08Data";
import { COUNTRY_BY_FOOD_E08_FACTS } from "./Quiz/countryByFoodE08Facts";
import { WORLD_LANDMARKS_E09 } from "./Quiz/worldLandmarksE09Data";
import { WORLD_LANDMARKS_E09_FACTS } from "./Quiz/worldLandmarksE09Facts";
import { CAPITAL_CITIES_E10 } from "./Quiz/capitalCitiesE10Data";
import { CAPITAL_CITIES_E10_FACTS } from "./Quiz/capitalCitiesE10Facts";
import { VIDEO_GAME_CHARACTERS_E11 } from "./Quiz/videoGameCharactersE11Data";
import { VIDEO_GAME_CHARACTERS_E11_FACTS } from "./Quiz/videoGameCharactersE11Facts";
import { MOVIE_CHARACTERS_E12 } from "./Quiz/movieCharactersE12Data";
import { MOVIE_CHARACTERS_E12_FACTS } from "./Quiz/movieCharactersE12Facts";
import { TOURIST_SPOTS_E13 } from "./Quiz/touristSpotsE13Data";
import { TOURIST_SPOTS_E13_FACTS } from "./Quiz/touristSpotsE13Facts";
import { MOUNTAINS_E14 } from "./Quiz/mountainsE14Data";
import { MOUNTAINS_E14_FACTS } from "./Quiz/mountainsE14Facts";
import { ISLANDS_E15 } from "./Quiz/islandsE15Data";
import { ISLANDS_E15_FACTS } from "./Quiz/islandsE15Facts";
import { VOLCANOES_E16 } from "./Quiz/volcanoesE16Data";
import { VOLCANOES_E16_FACTS } from "./Quiz/volcanoesE16Facts";
import { DESERTS_E17 } from "./Quiz/desertsE17Data";
import { DESERTS_E17_FACTS } from "./Quiz/desertsE17Facts";
import { WATERFALLS_E18 } from "./Quiz/waterfallsE18Data";
import { WATERFALLS_E18_FACTS } from "./Quiz/waterfallsE18Facts";
import { LAKES_E19 } from "./Quiz/lakesE19Data";
import { LAKES_E19_FACTS } from "./Quiz/lakesE19Facts";
import { RIVERS_E20 } from "./Quiz/riversE20Data";
import { RIVERS_E20_FACTS } from "./Quiz/riversE20Facts";
import { CITY_SKYLINE_E21 } from "./Quiz/cityskylineE21Data";
import { CITY_SKYLINE_E21_FACTS } from "./Quiz/cityskylineE21Facts";
import { BIRDS_E22 } from "./Quiz/birdsE22Data";
import { BIRDS_E22_FACTS } from "./Quiz/birdsE22Facts";
import { DOG_BREEDS_E23 } from "./Quiz/dogBreedsE23Data";
import { DOG_BREEDS_E23_FACTS } from "./Quiz/dogBreedsE23Facts";
import { REPTILES_E24 } from "./Quiz/reptilesE24Data";
import { REPTILES_E24_FACTS } from "./Quiz/reptilesE24Facts";
import { CLUB_BADGES_E25 } from "./Quiz/clubBadgesE25Data";
import { CLUB_BADGES_E25_FACTS } from "./Quiz/clubBadgesE25Facts";
import { AIRLINE_LOGOS_E26 } from "./Quiz/airlineLogosE26Data";
import { AIRLINE_LOGOS_E26_FACTS } from "./Quiz/airlineLogosE26Facts";
import { FAST_FOOD_LOGOS_E27 } from "./Quiz/fastFoodLogosE27Data";
import { FAST_FOOD_LOGOS_E27_FACTS } from "./Quiz/fastFoodLogosE27Facts";
import { MOVIE_STUDIO_LOGOS_E28 } from "./Quiz/movieStudioLogosE28Data";
import { MOVIE_STUDIO_LOGOS_E28_FACTS } from "./Quiz/movieStudioLogosE28Facts";
import { FASHION_BRAND_LOGOS_E29 } from "./Quiz/fashionBrandLogosE29Data";
import { FASHION_BRAND_LOGOS_E29_FACTS } from "./Quiz/fashionBrandLogosE29Facts";
import { GAMING_CONSOLE_LOGOS_E30 } from "./Quiz/gamingConsoleLogosE30Data";
import { GAMING_CONSOLE_LOGOS_E30_FACTS } from "./Quiz/gamingConsoleLogosE30Facts";
import { FAMOUS_CASTLES_E32 } from "./Quiz/famousCastlesE32Data";
import { FAMOUS_CASTLES_E32_FACTS } from "./Quiz/famousCastlesE32Facts";
import { TRADITIONAL_COSTUMES_E33 } from "./Quiz/traditionalCostumesE33Data";
import { TRADITIONAL_COSTUMES_E33_FACTS } from "./Quiz/traditionalCostumesE33Facts";
import { WORLD_CURRENCIES_E34 } from "./Quiz/worldCurrenciesE34Data";
import { WORLD_CURRENCIES_E34_FACTS } from "./Quiz/worldCurrenciesE34Facts";
import { ANCIENT_RUINS_E35 } from "./Quiz/ancientRuinsE35Data";
import { ANCIENT_RUINS_E35_FACTS } from "./Quiz/ancientRuinsE35Facts";
import { EMOJI_MOVIES_E36 } from "./Quiz/emojiMoviesE36Data";
import { EMOJI_MOVIES_E36_FACTS } from "./Quiz/emojiMoviesE36Facts";
import { MUSICAL_INSTRUMENTS_E37 } from "./Quiz/musicalInstrumentsE37Data";
import { MUSICAL_INSTRUMENTS_E37_FACTS } from "./Quiz/musicalInstrumentsE37Facts";
import { SPORTS_MASCOTS_E38 } from "./Quiz/sportsMascotsE38Data";
import { SPORTS_MASCOTS_E38_FACTS } from "./Quiz/sportsMascotsE38Facts";
import { ZODIAC_SIGNS_E39 } from "./Quiz/zodiacSignsE39Data";
import { ZODIAC_SIGNS_E39_FACTS } from "./Quiz/zodiacSignsE39Facts";
import { PLANETS_SPACE_E40 } from "./Quiz/planetsSpaceE40Data";
import { PLANETS_SPACE_E40_FACTS } from "./Quiz/planetsSpaceE40Facts";
import { APP_ICONS_E41 } from "./Quiz/appIconsE41Data";
import { APP_ICONS_E41_FACTS } from "./Quiz/appIconsE41Facts";
import { US_STATE_FLAGS_E42 } from "./Quiz/usStateFlagsE42Data";
import { US_STATE_FLAGS_E42_FACTS } from "./Quiz/usStateFlagsE42Facts";
import { FRUITS_E43 } from "./Quiz/fruitsE43Data";
import { FRUITS_E43_FACTS } from "./Quiz/fruitsE43Facts";
import { BUTTERFLIES_E45 } from "./Quiz/butterfliesE45Data";
import { BUTTERFLIES_E45_FACTS } from "./Quiz/butterfliesE45Facts";
import { SEA_CREATURES_E46 } from "./Quiz/seaCreaturesE46Data";
import { SEA_CREATURES_E46_FACTS } from "./Quiz/seaCreaturesE46Facts";
import { BRIDGES_E47 } from "./Quiz/bridgesE47Data";
import { BRIDGES_E47_FACTS } from "./Quiz/bridgesE47Facts";
import { TOY_GAME_LOGOS_E48 } from "./Quiz/toyGameLogosE48Data";
import { TOY_GAME_LOGOS_E48_FACTS } from "./Quiz/toyGameLogosE48Facts";
import { PAINTINGS_E49 } from "./Quiz/paintingsE49Data";
import { PAINTINGS_E49_FACTS } from "./Quiz/paintingsE49Facts";
import { GEMSTONES_E50 } from "./Quiz/gemstonesE50Data";
import { GEMSTONES_E50_FACTS } from "./Quiz/gemstonesE50Facts";
import { STATUES_E51 } from "./Quiz/statuesE51Data";
import { STATUES_E51_FACTS } from "./Quiz/statuesE51Facts";
import { ELEMENTS_E52 } from "./Quiz/elementsE52Data";
import { ELEMENTS_E52_FACTS } from "./Quiz/elementsE52Facts";
import { CLASSIC_CARS_E53 } from "./Quiz/classicCarsE53Data";
import { CLASSIC_CARS_E53_FACTS } from "./Quiz/classicCarsE53Facts";
import { TROPHIES_E54 } from "./Quiz/trophiesE54Data";
import { TROPHIES_E54_FACTS } from "./Quiz/trophiesE54Facts";
import { STADIUMS_E55 } from "./Quiz/stadiumsE55Data";
import { STADIUMS_E55_FACTS } from "./Quiz/stadiumsE55Facts";
import { CAT_BREEDS_E56 } from "./Quiz/catBreedsE56Data";
import { CAT_BREEDS_E56_FACTS } from "./Quiz/catBreedsE56Facts";
import { NATIONAL_PARKS_E57 } from "./Quiz/nationalParksE57Data";
import { NATIONAL_PARKS_E57_FACTS } from "./Quiz/nationalParksE57Facts";
import { SKYSCRAPERS_E58 } from "./Quiz/skyscrapersE58Data";
import { SKYSCRAPERS_E58_FACTS } from "./Quiz/skyscrapersE58Facts";
import { PALACES_E59 } from "./Quiz/palacesE59Data";
import { PALACES_E59_FACTS } from "./Quiz/palacesE59Facts";
import { CATHEDRALS_E60 } from "./Quiz/cathedralsE60Data";
import { CATHEDRALS_E60_FACTS } from "./Quiz/cathedralsE60Facts";
import { MOSQUES_E61 } from "./Quiz/mosquesE61Data";
import { MOSQUES_E61_FACTS } from "./Quiz/mosquesE61Facts";
import { LIGHTHOUSES_E62 } from "./Quiz/lighthousesE62Data";
import { LIGHTHOUSES_E62_FACTS } from "./Quiz/lighthousesE62Facts";
import LIGHTHOUSES_E62_SHAPES from "./Quiz/shapes/lighthouses.json";
import PHONES_E65_SHAPES from "./Quiz/shapes/phones.json";
import { CAPITALS_E63 } from "./Quiz/capitalsE63Data";
import { CAPITALS_E63_FACTS } from "./Quiz/capitalsE63Facts";
import { CAPITALS_E64 } from "./Quiz/capitalsE64Data";
import { CAPITALS_E64_FACTS } from "./Quiz/capitalsE64Facts";
import { PHONES_E65 } from "./Quiz/phonesE65Data";
import { PHONES_E65_FACTS } from "./Quiz/phonesE65Facts";
import { APPLE_E66 } from "./Quiz/appleE66Data";
import { APPLE_E66_FACTS } from "./Quiz/appleE66Facts";
import APPLE_E66_SHAPES from "./Quiz/shapes/apple.json";
import { PHONE_LOGOS_E67 } from "./Quiz/phoneLogosE67Data";
import { PHONE_LOGOS_E67_FACTS } from "./Quiz/phoneLogosE67Facts";
import { NOKIA_E68 } from "./Quiz/nokiaE68Data";
import { NOKIA_E68_FACTS } from "./Quiz/nokiaE68Facts";
import NOKIA_E68_SHAPES from "./Quiz/shapes/nokia.json";
import { SUPERCARS_E69 } from "./Quiz/supercarsE69Data";
import { SUPERCARS_E69_FACTS } from "./Quiz/supercarsE69Facts";
import SUPERCARS_E69_SHAPES from "./Quiz/shapes/supercars.json";
import { EVCARS_E70 } from "./Quiz/evCarsE70Data";
import { EVCARS_E70_FACTS } from "./Quiz/evCarsE70Facts";
import EVCARS_E70_SHAPES from "./Quiz/shapes/evcars.json";
import { PICKUPS_E71 } from "./Quiz/pickupsE71Data";
import { PICKUPS_E71_FACTS } from "./Quiz/pickupsE71Facts";
import PICKUPS_E71_SHAPES from "./Quiz/shapes/pickups.json";
import { SUVS_E72 } from "./Quiz/suvsE72Data";
import { SUVS_E72_FACTS } from "./Quiz/suvsE72Facts";
import SUVS_E72_SHAPES from "./Quiz/shapes/suvs.json";
import { JDM_CARS_E73 } from "./Quiz/jdmCarsE73Data";
import { JDM_CARS_E73_FACTS } from "./Quiz/jdmCarsE73Facts";
import JDM_CARS_E73_SHAPES from "./Quiz/shapes/jdm.json";
import { VEGETABLES_E74 } from "./Quiz/vegetablesE74Data";
import { VEGETABLES_E74_FACTS } from "./Quiz/vegetablesE74Facts";
import VEGETABLES_E74_SHAPES from "./Quiz/shapes/veg.json";
import { MOTORCYCLES_E75 } from "./Quiz/motorcyclesE75Data";
import { MOTORCYCLES_E75_FACTS } from "./Quiz/motorcyclesE75Facts";
import MOTORCYCLES_E75_SHAPES from "./Quiz/shapes/moto.json";
const E18CFG = { items: PAINTINGS, topicWord: "PAINTING", topicPlural: "PAINTINGS", dir: "paintings", ext: "jpg", fit: "contain", voPrefix: "pt-", nameField: "title", introVo: "vo-intro-painting", coldSlug: "" };
const E10CFG = { items: LOGOS4, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos", ext: "svg", fit: "contain", voPrefix: "nm-", nameField: "name", introVo: "vo-intro-logo", coldSlug: "nxp" };
const E12CFG = { items: SHAPES2, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "maps", ext: "svg", fit: "contain", voPrefix: "fl-", nameField: "name", slugKey: "iso", voKey: "iso", introVo: "vo-intro-shape", coldSlug: "" };
const E01CFG = { items: LOGOS, facts: LOGO_FACTS, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos", ext: "svg", fit: "contain", voPrefix: "nm-", nameField: "name", introVo: "vo-intro-logo", coldSlug: "jenkins" };
const E02CFG = { items: FLAGS, facts: FLAG_FACTS, topicWord: "FLAG", topicPlural: "FLAGS", dir: "flags", ext: "svg", fit: "contain", voPrefix: "fl-", nameField: "name", slugKey: "iso", voKey: "iso", introVo: "vo-intro-flag", coldSlug: "" };
const E03CFG = { items: ANIMALS, facts: ANIMAL_FACTS, topicWord: "ANIMAL", topicPlural: "ANIMALS", dir: "animals", ext: "png", fit: "cover", voPrefix: "an-", nameField: "name", introVo: "vo-intro-animal", coldSlug: "" };
const E05CFG = { items: LOGOS2, facts: LOGO_FACTS, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos", ext: "svg", fit: "contain", voPrefix: "nm-", nameField: "name", introVo: "vo-intro-logo", coldSlug: "kubernetes" };
const E08CFG = { items: LOGOS3, facts: LOGO_FACTS, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos", ext: "svg", fit: "contain", voPrefix: "nm-", nameField: "name", introVo: "vo-intro-logo", coldSlug: "archlinux" };
const E14CFG = { items: FOODS, facts: FOOD_FACTS, topicWord: "FOOD", topicPlural: "FOODS", dir: "foods", ext: "png", fit: "cover", voPrefix: "fd-", nameField: "name", introVo: "vo-intro-food", coldSlug: "" };
const TESTCFG = { items: TEST_ANIMALS, facts: TEST_ANIMALS_FACTS, topicWord: "ANIMAL", topicPlural: "ANIMALS", dir: "animals", ext: "jpg", fit: "cover", voPrefix: "ta-", nameField: "name", introVo: "vo-intro-animal", coldSlug: "" };
const E01_INFOCFG = { items: ANIMALS_E01, facts: ANIMALS_E01_FACTS, topicWord: "ANIMAL", topicPlural: "ANIMALS", dir: "animals", ext: "jpg", fit: "cover", voPrefix: "an-", nameField: "name", introVo: "vo-intro-animal", coldSlug: "saola" };
const E02_INFOCFG = { items: FLAGS_E02, facts: FLAGS_E02_FACTS, topicWord: "FLAG", topicPlural: "FLAGS", dir: "flags", ext: "svg", fit: "contain", voPrefix: "fl-", nameField: "name", slugKey: "iso", voKey: "iso", introVo: "vo-intro-flag", coldSlug: "md" };
const E03_INFOCFG = { items: LOGOS_E03, facts: LOGOS_E03_FACTS, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos", ext: "svg", fit: "contain", voPrefix: "lg-", nameField: "name", introVo: "vo-intro-logo", coldSlug: "sentry" };
const E04_INFOCFG = { items: FOODS_E04, facts: FOODS_E04_FACTS, topicWord: "FOOD", topicPlural: "FOODS", dir: "foods", ext: "jpg", fit: "cover", voPrefix: "fd-", nameField: "name", introVo: "vo-intro-food", coldSlug: "fried-tarantula" };
const E05_INFOCFG = { items: ANIMAL_SILHOUETTES_E05, facts: ANIMAL_SILHOUETTES_E05_FACTS, topicWord: "ANIMAL", topicPlural: "ANIMALS", dir: "silhouettes", ext: "svg", fit: "contain", voPrefix: "sh-", nameField: "name", introVo: "vo-intro-silhouette", coldSlug: "worm" };
const E06_INFOCFG = { items: COUNTRY_SHAPES_E06, facts: COUNTRY_SHAPES_E06_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "maps", ext: "svg", fit: "contain", voPrefix: "cs-", nameField: "name", slugKey: "iso", voKey: "iso", introVo: "vo-intro-shape", coldSlug: "" };
const E07_INFOCFG = { items: CAR_LOGOS_E07, facts: CAR_LOGOS_E07_FACTS, topicWord: "CAR LOGO", topicPlural: "CAR LOGOS", dir: "carlogos", ext: "svg", fit: "contain", voPrefix: "cb-", nameField: "name", introVo: "vo-intro-carlogo", coldSlug: "" };
const E08_INFOCFG = { items: COUNTRY_BY_FOOD_E08, facts: COUNTRY_BY_FOOD_E08_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "countryfood", ext: "jpg", fit: "cover", voPrefix: "cf-", nameField: "country", introVo: "vo-intro-countryfood", coldSlug: "" };
const E09_INFOCFG = { items: WORLD_LANDMARKS_E09, facts: WORLD_LANDMARKS_E09_FACTS, topicWord: "LANDMARK", topicPlural: "LANDMARKS", dir: "landmarks", ext: "jpg", fit: "cover", voPrefix: "wl-", nameField: "name", introVo: "vo-intro-landmark", coldSlug: "" };
const E10_INFOCFG = { items: CAPITAL_CITIES_E10, facts: CAPITAL_CITIES_E10_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "capitals", ext: "jpg", fit: "cover", voPrefix: "cc-", nameField: "country", introVo: "vo-intro-capital", coldSlug: "" };
const E11_INFOCFG = { items: VIDEO_GAME_CHARACTERS_E11, facts: VIDEO_GAME_CHARACTERS_E11_FACTS, topicWord: "CHARACTER", topicPlural: "CHARACTERS", dir: "gamechars", ext: "jpg", fit: "cover", voPrefix: "vg-", nameField: "name", introVo: "vo-intro-gamechar", coldSlug: "" };
const E12_INFOCFG = { items: MOVIE_CHARACTERS_E12, facts: MOVIE_CHARACTERS_E12_FACTS, topicWord: "CHARACTER", topicPlural: "CHARACTERS", dir: "moviechars", ext: "jpg", fit: "contain", voPrefix: "mv-", nameField: "name", introVo: "vo-intro-moviechar", coldSlug: "" };
const E13_INFOCFG = { items: TOURIST_SPOTS_E13, facts: TOURIST_SPOTS_E13_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "touristspots", ext: "jpg", fit: "cover", voPrefix: "ts-", nameField: "country", introVo: "vo-intro-touristspot", coldSlug: "" };
const E14_INFOCFG = { items: MOUNTAINS_E14, facts: MOUNTAINS_E14_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "mountains", ext: "jpg", fit: "cover", voPrefix: "mt-", nameField: "country", introVo: "vo-intro-mountain", coldSlug: "" };
const E15_INFOCFG = { items: ISLANDS_E15, facts: ISLANDS_E15_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "islands", ext: "jpg", fit: "cover", voPrefix: "is-", nameField: "country", introVo: "vo-intro-island", coldSlug: "" };
const E16_INFOCFG = { items: VOLCANOES_E16, facts: VOLCANOES_E16_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "volcanoes", ext: "jpg", fit: "cover", voPrefix: "vc-", nameField: "country", introVo: "vo-intro-volcano", coldSlug: "" };
const E17_INFOCFG = { items: DESERTS_E17, facts: DESERTS_E17_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "deserts", ext: "jpg", fit: "cover", voPrefix: "ds-", nameField: "country", introVo: "vo-intro-desert", coldSlug: "" };
const E18_INFOCFG = { items: WATERFALLS_E18, facts: WATERFALLS_E18_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "waterfalls", ext: "jpg", fit: "cover", voPrefix: "wf-", nameField: "country", introVo: "vo-intro-waterfall", coldSlug: "" };
const E19_INFOCFG = { items: LAKES_E19, facts: LAKES_E19_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "lakes", ext: "jpg", fit: "cover", voPrefix: "lk-", nameField: "country", introVo: "vo-intro-lake", coldSlug: "" };
const E20_INFOCFG = { items: RIVERS_E20, facts: RIVERS_E20_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "rivers", ext: "jpg", fit: "cover", voPrefix: "rv-", nameField: "country", introVo: "vo-intro-river", coldSlug: "" };
const E21_INFOCFG = { items: CITY_SKYLINE_E21, facts: CITY_SKYLINE_E21_FACTS, topicWord: "CITY", topicPlural: "CITIES", dir: "skylines", ext: "jpg", fit: "cover", voPrefix: "sky-", nameField: "city", introVo: "vo-intro-skyline", coldSlug: "" };
const E22_INFOCFG = { items: BIRDS_E22, facts: BIRDS_E22_FACTS, topicWord: "BIRD", topicPlural: "BIRDS", dir: "birds", ext: "jpg", fit: "cover", voPrefix: "bd-", nameField: "name", introVo: "vo-intro-bird", coldSlug: "" };
const E23_INFOCFG = { items: DOG_BREEDS_E23, facts: DOG_BREEDS_E23_FACTS, topicWord: "BREED", topicPlural: "BREEDS", dir: "dogs", ext: "jpg", fit: "cover", voPrefix: "db-", nameField: "name", introVo: "vo-intro-dogbreed", coldSlug: "" };
const E24_INFOCFG = { items: REPTILES_E24, facts: REPTILES_E24_FACTS, topicWord: "REPTILE", topicPlural: "REPTILES", dir: "reptiles", ext: "jpg", fit: "cover", voPrefix: "rp-", nameField: "name", introVo: "vo-intro-reptile", coldSlug: "" };
const E25_INFOCFG = { items: CLUB_BADGES_E25, facts: CLUB_BADGES_E25_FACTS, topicWord: "CLUB", topicPlural: "CLUBS", dir: "clubs", ext: "png", fit: "contain", voPrefix: "fb-", nameField: "name", introVo: "vo-intro-clubbadge", coldSlug: "" };
const E26_INFOCFG = { items: AIRLINE_LOGOS_E26, facts: AIRLINE_LOGOS_E26_FACTS, topicWord: "AIRLINE", topicPlural: "AIRLINES", dir: "airlines", ext: "png", fit: "contain", voPrefix: "al-", nameField: "name", introVo: "vo-intro-airline", coldSlug: "" };
const E27_INFOCFG = { items: FAST_FOOD_LOGOS_E27, facts: FAST_FOOD_LOGOS_E27_FACTS, topicWord: "CHAIN", topicPlural: "CHAINS", dir: "fastfood", ext: "png", fit: "contain", voPrefix: "ff-", nameField: "name", introVo: "vo-intro-fastfood", coldSlug: "" };
const E28_INFOCFG = { items: MOVIE_STUDIO_LOGOS_E28, facts: MOVIE_STUDIO_LOGOS_E28_FACTS, topicWord: "STUDIO", topicPlural: "STUDIOS", dir: "studios", ext: "png", fit: "contain", voPrefix: "ms-", nameField: "name", introVo: "vo-intro-moviestudio", coldSlug: "" };
const E29_INFOCFG = { items: FASHION_BRAND_LOGOS_E29, facts: FASHION_BRAND_LOGOS_E29_FACTS, topicWord: "BRAND", topicPlural: "BRANDS", dir: "fashion", ext: "png", fit: "contain", voPrefix: "fs-", nameField: "name", introVo: "vo-intro-fashion", coldSlug: "" };
const E30_INFOCFG = { items: GAMING_CONSOLE_LOGOS_E30, facts: GAMING_CONSOLE_LOGOS_E30_FACTS, topicWord: "CONSOLE", topicPlural: "CONSOLES", dir: "consoles", ext: "png", fit: "contain", voPrefix: "gc-", nameField: "name", introVo: "vo-intro-console", coldSlug: "" };
const E32_INFOCFG = { items: FAMOUS_CASTLES_E32, facts: FAMOUS_CASTLES_E32_FACTS, topicWord: "CASTLE", topicPlural: "CASTLES", dir: "castles", ext: "jpg", fit: "cover", voPrefix: "cl-", nameField: "name", introVo: "vo-intro-castle", coldSlug: "" };
const E33_INFOCFG = { items: TRADITIONAL_COSTUMES_E33, facts: TRADITIONAL_COSTUMES_E33_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "costumes", ext: "jpg", fit: "cover", voPrefix: "tc-", nameField: "country", introVo: "vo-intro-costume", coldSlug: "" };
const E34_INFOCFG = { items: WORLD_CURRENCIES_E34, facts: WORLD_CURRENCIES_E34_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "currencies", ext: "jpg", fit: "cover", voPrefix: "cn-", nameField: "country", introVo: "vo-intro-currency", coldSlug: "" };
const E35_INFOCFG = { items: ANCIENT_RUINS_E35, facts: ANCIENT_RUINS_E35_FACTS, topicWord: "RUIN", topicPlural: "RUINS", dir: "ruins", ext: "jpg", fit: "cover", voPrefix: "rn-", nameField: "name", introVo: "vo-intro-ruins", coldSlug: "" };
const E36_INFOCFG = { items: EMOJI_MOVIES_E36, facts: EMOJI_MOVIES_E36_FACTS, topicWord: "MOVIE", topicPlural: "MOVIES", dir: "emoji", ext: "png", fit: "contain", voPrefix: "em-", nameField: "name", introVo: "vo-intro-emojimovies", coldSlug: "" };
const E37_INFOCFG = { items: MUSICAL_INSTRUMENTS_E37, facts: MUSICAL_INSTRUMENTS_E37_FACTS, topicWord: "INSTRUMENT", topicPlural: "INSTRUMENTS", dir: "instruments", ext: "jpg", fit: "cover", voPrefix: "in-", nameField: "name", introVo: "vo-intro-instruments", coldSlug: "" };
const E38_INFOCFG = { items: SPORTS_MASCOTS_E38, facts: SPORTS_MASCOTS_E38_FACTS, topicWord: "MASCOT", topicPlural: "MASCOTS", dir: "mascots", ext: "jpg", fit: "cover", voPrefix: "sm-", nameField: "name", introVo: "vo-intro-mascots", coldSlug: "" };
const E39_INFOCFG = { items: ZODIAC_SIGNS_E39, facts: ZODIAC_SIGNS_E39_FACTS, topicWord: "ZODIAC SIGN", topicPlural: "ZODIAC SIGNS", dir: "zodiac", ext: "jpg", fit: "contain", voPrefix: "zd-", nameField: "name", introVo: "vo-intro-zodiac", coldSlug: "calli" };
const E40_INFOCFG = { items: PLANETS_SPACE_E40, facts: PLANETS_SPACE_E40_FACTS, topicWord: "SPACE OBJECT", topicPlural: "SPACE OBJECTS", dir: "space", ext: "jpg", fit: "cover", voPrefix: "pl-", nameField: "name", introVo: "vo-intro-space", coldSlug: "amalthea" };
const E41_INFOCFG = { items: APP_ICONS_E41, facts: APP_ICONS_E41_FACTS, topicWord: "APP ICON", topicPlural: "APP ICONS", dir: "app-icons", ext: "png", fit: "contain", voPrefix: "ai-", nameField: "name", introVo: "vo-intro-appicon", coldSlug: "kakaotalk" };
const E42_INFOCFG = { items: US_STATE_FLAGS_E42, facts: US_STATE_FLAGS_E42_FACTS, topicWord: "STATE FLAG", topicPlural: "STATE FLAGS", dir: "us-flags", ext: "png", fit: "contain", voPrefix: "sf-", nameField: "name", introVo: "vo-intro-usflag", coldSlug: "northern-mariana-islands" };
const E43_INFOCFG = { items: FRUITS_E43, facts: FRUITS_E43_FACTS, topicWord: "FRUIT", topicPlural: "FRUITS", dir: "fruits", ext: "jpg", fit: "cover", voPrefix: "fr-", nameField: "name", introVo: "vo-intro-freshfruit", coldSlug: "black-sapote" };
const E45_INFOCFG = { items: BUTTERFLIES_E45, facts: BUTTERFLIES_E45_FACTS, topicWord: "BUTTERFLY", topicPlural: "BUTTERFLIES", dir: "butterflies", ext: "jpg", fit: "cover", voPrefix: "bf-", nameField: "name", introVo: "vo-intro-realbutterfly", coldSlug: "xerces-blue" };
const E46_INFOCFG = { items: SEA_CREATURES_E46, facts: SEA_CREATURES_E46_FACTS, topicWord: "SEA CREATURE", topicPlural: "SEA CREATURES", dir: "sea-creatures", ext: "jpg", fit: "cover", voPrefix: "sc-", nameField: "name", introVo: "vo-intro-seacreature", coldSlug: "glass-squid" };
const E47_INFOCFG = { items: BRIDGES_E47, facts: BRIDGES_E47_FACTS, topicWord: "BRIDGE", topicPlural: "BRIDGES", dir: "bridges", ext: "jpg", fit: "cover", voPrefix: "br-", nameField: "name", introVo: "vo-intro-bridge", coldSlug: "chesapeake-bay-bridge-tunnel" };
const E48_INFOCFG = { items: TOY_GAME_LOGOS_E48, facts: TOY_GAME_LOGOS_E48_FACTS, topicWord: "TOY/GAME LOGO", topicPlural: "TOY/GAME LOGOS", dir: "toy-game-logos", ext: "png", fit: "contain", voPrefix: "tg-", nameField: "name", introVo: "vo-intro-toygame", coldSlug: "corgi-toys" };
const E49_INFOCFG = { items: PAINTINGS_E49, facts: PAINTINGS_E49_FACTS, topicWord: "PAINTING", topicPlural: "PAINTINGS", dir: "paintings", ext: "jpg", fit: "contain", voPrefix: "pa-", nameField: "name", introVo: "vo-intro-paintingfamous", coldSlug: "woman-holding-a-balance" };
const E50_INFOCFG = { items: GEMSTONES_E50, facts: GEMSTONES_E50_FACTS, topicWord: "GEMSTONE", topicPlural: "GEMSTONES", dir: "gemstones", ext: "jpg", fit: "contain", voPrefix: "gm-", nameField: "name", introVo: "vo-intro-gemstone", coldSlug: "ekanite" };
const E51_INFOCFG = { items: STATUES_E51, facts: STATUES_E51_FACTS, topicWord: "STATUE", topicPlural: "STATUES", dir: "statues", ext: "jpg", fit: "contain", voPrefix: "st-", nameField: "name", introVo: "vo-intro-statue", coldSlug: "colossus-of-barletta" };
const E52_INFOCFG = { items: ELEMENTS_E52, facts: ELEMENTS_E52_FACTS, topicWord: "ELEMENT", topicPlural: "ELEMENTS", dir: "elements", ext: "jpg", fit: "contain", voPrefix: "ce-", nameField: "name", introVo: "vo-intro-element", coldSlug: "livermorium" };
const E53_INFOCFG = { items: CLASSIC_CARS_E53, facts: CLASSIC_CARS_E53_FACTS, topicWord: "CLASSIC CAR", topicPlural: "CLASSIC CARS", dir: "classic-cars", ext: "jpg", fit: "cover", voPrefix: "cv-", nameField: "name", introVo: "vo-intro-classiccar", coldSlug: "panhard-dyna-z" };
const E54_INFOCFG = { items: TROPHIES_E54, facts: TROPHIES_E54_FACTS, topicWord: "SPORTS TROPHY", topicPlural: "SPORTS TROPHIES", dir: "trophies", ext: "jpg", fit: "contain", voPrefix: "tr-", nameField: "name", introVo: "vo-intro-trophy", coldSlug: "sam-maguire-cup" };
const E55_INFOCFG = { items: STADIUMS_E55, facts: STADIUMS_E55_FACTS, topicWord: "STADIUM", topicPlural: "STADIUMS", dir: "stadiums", ext: "jpg", fit: "cover", voPrefix: "sd-", nameField: "name", introVo: "vo-intro-stadium", coldSlug: "estadio-defensores-del-chaco" };
const E56_INFOCFG = { items: CAT_BREEDS_E56, facts: CAT_BREEDS_E56_FACTS, topicWord: "CAT BREED", topicPlural: "CAT BREEDS", dir: "catbreeds", ext: "jpg", fit: "cover", voPrefix: "ct-", nameField: "name", introVo: "vo-intro-catbreed", coldSlug: "german-rex" };
const E57_INFOCFG = { items: NATIONAL_PARKS_E57, facts: NATIONAL_PARKS_E57_FACTS, topicWord: "NATIONAL PARK", topicPlural: "NATIONAL PARKS", dir: "nationalparks", ext: "jpg", fit: "cover", voPrefix: "np-", nameField: "name", introVo: "vo-intro-nationalpark", coldSlug: "korup" };
const E58_INFOCFG = { items: SKYSCRAPERS_E58, facts: SKYSCRAPERS_E58_FACTS, topicWord: "SKYSCRAPER", topicPlural: "SKYSCRAPERS", dir: "skyscrapers", ext: "jpg", fit: "cover", voPrefix: "sg-", nameField: "name", introVo: "vo-intro-skyscraper", coldSlug: "poly-international-plaza" };
const E59_INFOCFG = { items: PALACES_E59, facts: PALACES_E59_FACTS, topicWord: "PALACE", topicPlural: "PALACES", dir: "palaces", ext: "jpg", fit: "cover", voPrefix: "pz-", nameField: "name", introVo: "vo-intro-palace", coldSlug: "jubilee-palace" };
const E60_INFOCFG = { items: CATHEDRALS_E60, facts: CATHEDRALS_E60_FACTS, topicWord: "CATHEDRAL", topicPlural: "CATHEDRALS", dir: "cathedrals", ext: "jpg", fit: "cover", voPrefix: "cd-", nameField: "name", introVo: "vo-intro-cathedral", coldSlug: "coptic-cathedral-cairo" };
const E61_INFOCFG = { items: MOSQUES_E61, facts: MOSQUES_E61_FACTS, topicWord: "MOSQUE", topicPlural: "MOSQUES", dir: "mosques", ext: "jpg", fit: "cover", voPrefix: "mq-", nameField: "name", introVo: "vo-intro-mosque", coldSlug: "jinnah-memorial-mosque" };
const E62_INFOCFG = { items: LIGHTHOUSES_E62, facts: LIGHTHOUSES_E62_FACTS, topicWord: "LIGHTHOUSE", topicPlural: "LIGHTHOUSES", dir: "lighthouses", ext: "jpg", fit: "cover", voPrefix: "lh-", nameField: "name", introVo: "vo-intro-lighthouse", coldSlug: "farol-de-santa-marta", shapes: LIGHTHOUSES_E62_SHAPES };
const E63_INFOCFG = { items: CAPITALS_E63, facts: CAPITALS_E63_FACTS, topicWord: "COUNTRY", topicPlural: "COUNTRIES", dir: "maps", ext: "svg", fit: "contain", voPrefix: "wc-", nameField: "name", slugKey: "iso", voKey: "iso", clueField: "capital", clueLabel: "CAPITAL", introVo: "vo-intro-capital2", coldSlug: "nr" };
const E64_INFOCFG = { items: CAPITALS_E64, facts: CAPITALS_E64_FACTS, topicWord: "CAPITAL", topicPlural: "CAPITALS", dir: "maps", ext: "svg", fit: "contain", voPrefix: "gp-", nameField: "capital", slugKey: "iso", voKey: "iso", clueField: "name", clueLabel: "COUNTRY", introVo: "vo-intro-capital3", coldSlug: "vu" };
const E65_INFOCFG = { items: PHONES_E65, facts: PHONES_E65_FACTS, topicWord: "PHONE", topicPlural: "PHONES", dir: "phones", ext: "jpg", fit: "cover", voPrefix: "ph-", nameField: "name", introVo: "vo-intro-phone", coldSlug: "essential-phone-ph-1", shapes: PHONES_E65_SHAPES };
const E66_INFOCFG = { items: APPLE_E66, facts: APPLE_E66_FACTS, topicWord: "DEVICE", topicPlural: "DEVICES", dir: "apple", ext: "jpg", fit: "cover", voPrefix: "ap-", nameField: "name", introVo: "vo-intro-apple", coldSlug: "apple-pippin", shapes: APPLE_E66_SHAPES };
const E67_INFOCFG = { items: PHONE_LOGOS_E67, facts: PHONE_LOGOS_E67_FACTS, topicWord: "LOGO", topicPlural: "LOGOS", dir: "logos67", ext: "png", fit: "contain", voPrefix: "pb-", nameField: "name", introVo: "vo-intro-phonelogo", coldSlug: "jolla" };
const E68_INFOCFG = { items: NOKIA_E68, facts: NOKIA_E68_FACTS, topicWord: "NOKIA PHONE", topicPlural: "NOKIA PHONES", dir: "nokia68", ext: "jpg", fit: "cover", voPrefix: "nk-", nameField: "name", introVo: "vo-intro-nokia", coldSlug: "nokia-2110i", shapes: NOKIA_E68_SHAPES };
const E69_INFOCFG = { items: SUPERCARS_E69, facts: SUPERCARS_E69_FACTS, topicWord: "SUPERCAR", topicPlural: "SUPERCARS", dir: "supercars69", ext: "jpg", fit: "cover", voPrefix: "sp-", nameField: "name", introVo: "vo-intro-supercar", coldSlug: "vector-w8", shapes: SUPERCARS_E69_SHAPES };
const E70_INFOCFG = { items: EVCARS_E70, facts: EVCARS_E70_FACTS, topicWord: "ELECTRIC CAR", topicPlural: "ELECTRIC CARS", dir: "evcars70", ext: "jpg", fit: "cover", voPrefix: "ev-", nameField: "name", introVo: "vo-intro-evcar", coldSlug: "aptera", shapes: EVCARS_E70_SHAPES };
const E71_INFOCFG = { items: PICKUPS_E71, facts: PICKUPS_E71_FACTS, topicWord: "PICKUP TRUCK", topicPlural: "PICKUP TRUCKS", dir: "pickups71", ext: "jpg", fit: "cover", voPrefix: "pk-", nameField: "name", introVo: "vo-intro-pickup", coldSlug: "piaggio-porter", shapes: PICKUPS_E71_SHAPES };
const E72_INFOCFG = { items: SUVS_E72, facts: SUVS_E72_FACTS, topicWord: "SUV", topicPlural: "SUVS", dir: "suvs72", ext: "jpg", fit: "cover", voPrefix: "sv-", nameField: "name", introVo: "vo-intro-suv", coldSlug: "suzuki-jimny", shapes: SUVS_E72_SHAPES };
const E73_INFOCFG = { items: JDM_CARS_E73, facts: JDM_CARS_E73_FACTS, topicWord: "JDM CAR", topicPlural: "JDM CARS", dir: "jdm73", ext: "jpg", fit: "cover", voPrefix: "jd-", nameField: "name", introVo: "vo-intro-jdm", coldSlug: "nissan-s-cargo", shapes: JDM_CARS_E73_SHAPES };
const E74_INFOCFG = { items: VEGETABLES_E74, facts: VEGETABLES_E74_FACTS, topicWord: "VEGETABLE", topicPlural: "VEGETABLES", dir: "veg74", ext: "jpg", fit: "cover", voPrefix: "vt-", nameField: "name", introVo: "vo-intro-vegetable", coldSlug: "amaranth-greens", shapes: VEGETABLES_E74_SHAPES };
const E75_INFOCFG = { items: MOTORCYCLES_E75, facts: MOTORCYCLES_E75_FACTS, topicWord: "MOTORCYCLE", topicPlural: "MOTORCYCLES", dir: "moto75", ext: "jpg", fit: "cover", voPrefix: "mc-", nameField: "name", introVo: "vo-intro-motorcycle", coldSlug: "harley-davidson-fat-boy", shapes: MOTORCYCLES_E75_SHAPES };
import { Word3D } from "./Quiz/Word3D";
import { FruitsV2Quiz, FRUITSV2_FRAMES } from "./Quiz/fruitsv2";
import { FlowersV2Quiz, FLOWERSV2_FRAMES } from "./Quiz/flowersv2";
import { FLOWERS } from "./Quiz/flowersData";
import { ShortV2Quiz, SHORTV2_FRAMES } from "./Quiz/shortv2";
import { ButterfliesV2Quiz, BUTTERFLIESV2_FRAMES } from "./Quiz/butterfliesv2";
import { BUTTERFLIES } from "./Quiz/butterfliesData";
import { SnakesV2Quiz, SNAKESV2_FRAMES } from "./Quiz/snakesv2";
import { SNAKES } from "./Quiz/snakesData";
import { ShortQuiz, SHORT_FRAMES } from "./Quiz/short";
import { LOGOS } from "./Quiz/logosData";
import { LOGO_FACTS } from "./Quiz/logoFacts";
import { FLAGS } from "./Quiz/flagsData";
import { FLAG_FACTS } from "./Quiz/flagFacts";
import { CAPITALS } from "./Quiz/capitalsData";
import { LOGOS2 } from "./Quiz/logos2Data";
import { FLAGS2 } from "./Quiz/flags2Data";
import { CAPITALS2 } from "./Quiz/capitals2Data";
import { ThemePreview } from "./Quiz/themePreview";
import { FlagQuizGS, FLAG_FRAMES, FlagQuizGSSample, FLAG_SAMPLE_FRAMES } from "./Quiz/flags";
import { GsThumb } from "./Quiz/gsthumb";
import { CapitalQuizGS, CAPITAL_FRAMES } from "./Quiz/capitals";
import { CountryQuizGS, COUNTRY_FRAMES } from "./Quiz/countries";
import { ProfileLogo, Banner, LogoLockupImg, Watermark } from "./Brand/guesssync";
import { Thumb } from "./Quiz/thumbnail";
import { COUNTRIES, buildTimeline } from "./Quiz/data";
import { video } from "./Mnbety/theme";

const quizSampleCountries = COUNTRIES.slice(0, 3);

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MnbetyIntro"
        component={MnbetyIntro}
        durationInFrames={TOTAL_FRAMES}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
      <Composition
        id="MnbetyHost"
        component={MnbetyHost}
        durationInFrames={HOST_FRAMES}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
      <Composition
        id="MnbetyCareer"
        component={MnbetyCareer}
        durationInFrames={CAREER_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MnbetyReel"
        component={MnbetyReel}
        durationInFrames={REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MnbetyCourseIntroEnglish"
        component={MnbetyCourseIntroEnglish}
        durationInFrames={COURSE_INTRO_ENGLISH_FRAMES}
        fps={25}
        width={1920}
        height={1080}
      />
      <Composition
        id="FlagQuizSample"
        component={FlagQuiz}
        durationInFrames={buildTimeline(quizSampleCountries).total}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ countries: quizSampleCountries }}
      />
      <Composition id="LogoPreview" component={LogoPreview} durationInFrames={90} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFlags" component={Thumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags" }} />
      <Composition id="ThumbPlayers" component={Thumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "players" }} />
      <Composition id="PlayerQuizSample" component={PlayerQuizSample} durationInFrames={PLAYER_SAMPLE_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="LogoQuizSample" component={LogoQuizSample} durationInFrames={LOGO_SAMPLE_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="LogoQuiz" component={LogoQuiz} durationInFrames={LOGO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="FlagQuizGSSample" component={FlagQuizGSSample} durationInFrames={FLAG_SAMPLE_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="FlagQuizGS" component={FlagQuizGS} durationInFrames={FLAG_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbLogo" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", items: ["google", "apple", "nike"] }} />
      <Composition id="ThumbFlag" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags", items: ["us", "jp", "br"] }} />
      <Composition id="ThumbCapital" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals", items: ["fr", "jp", "eg"] }} />
      <Composition id="ThumbCountry" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "countries", items: ["br", "au", "jp"] }} />
      <Composition id="ThumbLogo2" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", items: ["mclaren", "lamborghini", "bose"] }} />
      <Composition id="LogoQuiz2" component={LogoQuiz2} durationInFrames={LOGO2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFlag2" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags", items: ["ps", "jm", "tw"] }} />
      <Composition id="FlagQuiz2GS" component={FlagQuiz2GS} durationInFrames={FLAG2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbCapital2" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals", items: ["ge", "am", "az"] }} />
      <Composition id="CapitalQuiz2GS" component={CapitalQuiz2GS} durationInFrames={CAPITAL2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbLogo3" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", items: ["fortnite", "figma", "splunk"] }} />
      <Composition id="LogoQuiz3" component={LogoQuiz3} durationInFrames={LOGO3_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbShape" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "shapes", items: ["it", "jp", "au"] }} />
      <Composition id="ShapeQuizGS" component={ShapeQuizGS} durationInFrames={SHAPE_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbLogo4" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", items: ["safari", "huggingface", "appwrite"] }} />
      <Composition id="LogoQuiz4" component={LogoQuiz4} durationInFrames={LOGO4_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbCountry2" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "countries", items: ["ge", "sn", "tw"] }} />
      <Composition id="CountryQuiz2GS" component={CountryQuiz2GS} durationInFrames={COUNTRY2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbShape2" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "shapes", items: ["cl", "no", "gb"] }} />
      <Composition id="ShapeQuiz2GS" component={ShapeQuiz2GS} durationInFrames={SHAPE2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbAnimal" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "animals", items: ["lion", "octopus", "quokka"] }} />
      <Composition id="AnimalQuiz" component={AnimalQuiz} durationInFrames={ANIMAL_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFood" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "foods", items: ["pizza", "sushi", "surstromming"] }} />
      <Composition id="FoodQuiz" component={FoodQuiz} durationInFrames={FOOD_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbDog" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "dogs", items: ["goldenretriever", "pug", "azawakh"] }} />
      <Composition id="DogQuiz" component={DogQuiz} durationInFrames={DOG_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbLandmark" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "landmarks", items: ["fr", "br", "in-taj"] }} />
      <Composition id="LandmarkQuiz" component={LandmarkQuiz} durationInFrames={LANDMARK_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbCar" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "cars", items: ["ford-mustang", "lamborghini-aventador", "vw-beetle"] }} />
      <Composition id="CarQuiz" component={CarQuiz} durationInFrames={CAR_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbPainting" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "paintings", items: ["mona-lisa", "the-scream", "girl-with-a-pearl-earring"] }} />
      <Composition id="PaintingQuiz" component={PaintingQuiz} durationInFrames={PAINTING_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbBird" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "birds", items: ["bald-eagle", "toco-toucan", "shoebill"] }} />
      <Composition id="BirdQuiz" component={BirdQuiz} durationInFrames={BIRD_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbSea" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "sea", items: ["clownfish", "great-white-shark", "leafy-seadragon"] }} />
      <Composition id="SeaQuiz" component={SeaQuiz} durationInFrames={SEA_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFruits" component={GsThumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fruits", items: ["strawberry", "dragon-fruit", "avocado"] }} />
      <Composition id="FruitsQuiz" component={FruitsQuiz} durationInFrames={FRUITS_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFruitsV2" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ folder: "fruits", grid: ["strawberry", "corn", "?", "carrot", "?", "broccoli", "?", "tomato", "dragon-fruit"], line1: "CAN YOU NAME ALL", word: "FRUIT OR VEG?", number: "100", year: "2026", badge: "Only 1% get 100%" }} />
      <Composition id="FruitsV2Quiz" component={FruitsV2Quiz} durationInFrames={FRUITSV2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="FlowersV2Quiz" component={FlowersV2Quiz} durationInFrames={FLOWERSV2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbFlowersV2" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flowers", word: "FLOWER?", grid: ["rose", "sunflower", "?", "tulip", "?", "hibiscus", "?", "orchid", "lotus"] }} />
      <Composition id="ShortV2Test" component={ShortV2Quiz} durationInFrames={SHORTV2_FRAMES} fps={30} width={1080} height={1920} defaultProps={{ items: ANIMALS, mode: "animals", title: "Guess the Animal", part: 0 }} />
      <Composition id="ButterfliesV2Quiz" component={ButterfliesV2Quiz} durationInFrames={BUTTERFLIESV2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbButterfliesV2" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "butterflies", word: "BUTTERFLY?", grid: ["monarch", "blue-morpho", "?", "atlas-moth", "?", "luna-moth", "?", "peacock-butterfly", "zebra-longwing"] }} />
      <Composition id="SnakesV2Quiz" component={SnakesV2Quiz} durationInFrames={SNAKESV2_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ThumbSnakesV2" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "snakes", word: "SNAKE?", wordImg: "brand/word3d-snake.png", grid: ["king-cobra", "green-tree-python", "?", "gaboon-viper", "?", "corn-snake", "?", "eyelash-viper", "eastern-coral-snake"] }} />
      <Composition id="ThumbSnakesV3" component={GsThumbV3} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "snakes", word: "SNAKE?", headline: "NAME ALL 100?", grid: ["king-cobra", "eyelash-viper", "?", "eastern-coral-snake"] }} />
      <Composition id="Word3D" component={Word3D} durationInFrames={1} fps={30} width={1000} height={380} defaultProps={{ word: "LOGO?", fontUrl: "fonts/helvetiker_bold.typeface.json" }} />
      <Composition id="E18Quiz" component={QuizV2} durationInFrames={quizFrames(E18CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E18CFG }} />
      <Composition id="E01Quiz" component={QuizV2} durationInFrames={quizFrames(E01CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E01CFG }} />
      <Composition id="E02Quiz" component={QuizV2} durationInFrames={quizFrames(E02CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E02CFG }} />
      <Composition id="E03Quiz" component={QuizV2} durationInFrames={quizFrames(E03CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E03CFG }} />
      <Composition id="E05Quiz" component={QuizV2} durationInFrames={quizFrames(E05CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E05CFG }} />
      <Composition id="E08Quiz" component={QuizV2} durationInFrames={quizFrames(E08CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E08CFG }} />
      <Composition id="E14Quiz" component={QuizV2} durationInFrames={quizFrames(E14CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E14CFG }} />
      <Composition id="E10Quiz" component={QuizV2} durationInFrames={quizFrames(E10CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E10CFG }} />
      <Composition id="E12Quiz" component={QuizV2} durationInFrames={quizFrames(E12CFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E12CFG }} />
      <Composition id="TestAnimalsQuiz" component={QuizV2} durationInFrames={quizFrames(TESTCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: TESTCFG }} />
      <Composition id="E01AnimalsQuiz" component={QuizV2} durationInFrames={quizFrames(E01_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E01_INFOCFG }} />
      <Composition id="ThumbE01Animals" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "animals-e01-thumb", folder: "animals", grid: ["dog", "tiger", "giant-panda", "kangaroo", "octopus", "sloth", "komodo-dragon", "?", "fossa"], line1: "CAN YOU NAME ALL", word: "ANIMAL?", number: "100", year: "2026", badge: "Only 1% get 100%" }} />
      <Composition id="E02FlagsQuiz" component={QuizV2} durationInFrames={quizFrames(E02_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E02_INFOCFG }} />
      <Composition id="ThumbE02Flags" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags", grid: ["us", "jp", "gb", "br", "de", "in", "?", "fr", "cn"], line1: "CAN YOU NAME ALL", word: "FLAG?", number: "100", year: "2026", badge: "Only 1% get 100%" }} />
      <Composition id="E03LogosQuiz" component={QuizV2} durationInFrames={quizFrames(E03_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E03_INFOCFG }} />
      <Composition id="ThumbE03Logos" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", grid: ["google", "apple", "nike", "mcdonalds", "cocacola", "youtube", "?", "instagram", "netflix"], line1: "CAN YOU NAME ALL", word: "LOGO?", number: "100", year: "2026", badge: "Only 1% get 100%" }} />
      <Composition id="E04FoodQuiz" component={QuizV2} durationInFrames={quizFrames(E04_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E04_INFOCFG }} />
      <Composition id="ThumbE04Food" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "foods-e04-thumb", folder: "foods", grid: ["pizza", "hamburger", "sushi", "ramen", "tacos", "churros", "dumplings", "baklava", "poutine", "haggis", "natto", "balut", "fugu-sashimi", "?", "fried-tarantula"], line1: "CAN YOU NAME ALL", word: "FOOD?", number: "100", badge: "Only 1% get 100%" }} />
      <Composition id="E05SilhouetteQuiz" component={QuizV2} durationInFrames={quizFrames(E05_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E05_INFOCFG }} />
      <Composition id="ThumbE05Silhouettes" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "silhouettes-e05-thumb", grid: ["elephant", "tiger", "octopus", "wolf", "eagle", "hippopotamus", "otter", "rhinoceros", "ant", "?", "mammoth", "t-rex", "dodo", "scorpion", "worm"], line1: "CAN YOU NAME ALL", word: "ANIMAL?", number: "98", badge: "Only 1% get 100%" }} />
      <Composition id="E06ShapeQuiz" component={QuizV2} durationInFrames={quizFrames(E06_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E06_INFOCFG }} />
      <Composition id="ThumbE06Shapes" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "maps-e06-thumb", grid: ["it", "us", "au", "sa", "ar", "is", "gr", "so", "mn", "?", "rw", "al", "gm", "bg", "cm"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "100", badge: "Only 1% get 100%" }} />
      <Composition id="E07CarLogoQuiz" component={QuizV2} durationInFrames={quizFrames(E07_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E07_INFOCFG }} />
      <Composition id="ThumbE07CarLogos" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "carlogos-e07-thumb", grid: ["toyota", "ferrari", "bmw", "mercedes-benz", "porsche", "jeep", "lamborghini", "audi", "?", "tesla", "jaguar", "mini", "bentley", "koenigsegg", "xpeng"], line1: "CAN YOU NAME ALL", word: "CAR LOGO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E08CountryFoodQuiz" component={QuizV2} durationInFrames={quizFrames(E08_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E08_INFOCFG }} />
      <Composition id="ThumbE08CountryFood" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "countryfood-e08-thumb", grid: ["sushi", "pizza-margherita", "tacos", "croissant", "hamburger", "butter-chicken", "peking-duck", "pad-thai", "?", "kimchi", "paella", "pho", "moussaka", "beshbarmak", "gutap"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E09WorldLandmarksQuiz" component={QuizV2} durationInFrames={quizFrames(E09_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E09_INFOCFG }} />
      <Composition id="ThumbE09WorldLandmarks" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "landmarks-e09-thumb", grid: ["eiffel-tower", "statue-of-liberty", "great-wall-of-china", "taj-mahal", "great-pyramid-of-giza", "colosseum", "big-ben", "sydney-opera-house", "?", "christ-the-redeemer", "machu-picchu", "burj-khalifa", "petra", "mount-fuji", "stonehenge"], line1: "CAN YOU NAME ALL", word: "LANDMARK?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E10CapitalCitiesQuiz" component={QuizV2} durationInFrames={quizFrames(E10_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E10_INFOCFG }} />
      <Composition id="ThumbE10CapitalCities" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e10-thumb", grid: ["paris", "london", "tokyo", "washington-dc", "rome", "berlin", "moscow", "beijing", "?", "cairo", "seoul", "bangkok", "new-delhi", "mexico-city", "buenos-aires"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E11VideoGameCharactersQuiz" component={QuizV2} durationInFrames={quizFrames(E11_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E11_INFOCFG }} />
      <Composition id="ThumbE11VideoGameCharacters" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gamechars-e11-thumb", grid: ["mario", "sonic-the-hedgehog", "pikachu", "link", "kratos", "lara-croft", "master-chief", "yoshi", "?", "kirby", "crash-bandicoot", "geralt-of-rivia", "dante", "sora", "bayonetta"], line1: "CAN YOU NAME ALL", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE11VideoGameCharactersHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gamechars-e11-thumb", heroSlug: "mario", line1: "GUESS THE", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE11VideoGameCharactersSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gamechars-e11-thumb", easySlug: "mario", hardSlug: "squall-leonhart", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E12MovieCharactersQuiz" component={QuizV2} durationInFrames={quizFrames(E12_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E12_INFOCFG }} />
      <Composition id="ThumbE12MovieCharacters" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moviechars-e12-thumb", grid: ["mickey-mouse", "elsa-frozen", "shrek", "minions", "woody-toy-story", "simba", "ariel-little-mermaid", "dory", "?", "stitch", "snow-white", "gru", "genie-aladdin", "olaf", "mike-wazowski"], line1: "CAN YOU NAME ALL", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE12MovieCharactersHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moviechars-e12-thumb", heroSlug: "elsa-frozen", line1: "GUESS THE", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE12MovieCharactersSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moviechars-e12-thumb", easySlug: "shrek", hardSlug: "oliver", word: "CHARACTER?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E13TouristSpotsQuiz" component={QuizV2} durationInFrames={quizFrames(E13_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E13_INFOCFG }} />
      <Composition id="ThumbE13TouristSpots" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "touristspots-e13-thumb", grid: ["maldives-overwater-villas", "santorini-oia", "bora-bora-lagoon", "venice-canals", "grand-canyon", "great-barrier-reef", "copacabana-beach-rio", "swiss-alps-matterhorn", "?", "cappadocia-balloons", "iguazu-falls-argentina", "phi-phi-islands-thailand", "palm-jumeirah-dubai", "blue-lagoon-iceland", "cancun-riviera-maya"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE13TouristSpotsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "touristspots-e13-thumb", heroSlug: "santorini-oia", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE13TouristSpotsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "touristspots-e13-thumb", easySlug: "maldives-overwater-villas", hardSlug: "lake-retba-senegal", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E14MountainsQuiz" component={QuizV2} durationInFrames={quizFrames(E14_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E14_INFOCFG }} />
      <Composition id="ThumbE14Mountains" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mountains-e14-thumb", grid: ["mount-everest", "kilimanjaro", "mount-vesuvius", "table-mountain", "sugarloaf-mountain", "mont-blanc", "denali", "mount-olympus", "?", "aoraki-mount-cook", "mount-elbrus", "cotopaxi", "fitz-roy", "mount-kinabalu", "mount-bromo"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE14MountainsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mountains-e14-thumb", heroSlug: "mount-everest", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE14MountainsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mountains-e14-thumb", easySlug: "mount-everest", hardSlug: "emi-koussi", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E15IslandsQuiz" component={QuizV2} durationInFrames={quizFrames(E15_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E15_INFOCFG }} />
      <Composition id="ThumbE15Islands" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "islands-e15-thumb", grid: ["sicily", "oahu-hawaii", "greenland", "iceland", "madagascar", "sri-lanka", "easter-island", "mont-saint-michel", "?", "ibiza", "galapagos", "jamaica", "cuba", "singapore", "phuket"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE15IslandsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "islands-e15-thumb", heroSlug: "easter-island", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE15IslandsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "islands-e15-thumb", easySlug: "easter-island", hardSlug: "bikini-atoll", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E16VolcanoesQuiz" component={QuizV2} durationInFrames={quizFrames(E16_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E16_INFOCFG }} />
      <Composition id="ThumbE16Volcanoes" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "volcanoes-e16-thumb", grid: ["mount-fuji", "santorini-volcano", "mount-st-helens", "krakatoa", "eyjafjallajokull", "mount-pinatubo", "whakaari-white-island", "stromboli", "?", "mount-teide", "villarrica-volcano", "nevado-del-ruiz", "arenal-volcano", "klyuchevskaya-sopka", "hunga-tonga"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE16VolcanoesHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "volcanoes-e16-thumb", heroSlug: "mount-fuji", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE16VolcanoesSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "volcanoes-e16-thumb", easySlug: "mount-fuji", hardSlug: "barren-island", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E17DesertsQuiz" component={QuizV2} durationInFrames={quizFrames(E17_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E17_INFOCFG }} />
      <Composition id="ThumbE17Deserts" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "deserts-e17-thumb", grid: ["death-valley-usa", "namib-desert-namibia", "atacama-desert-chile", "gobi-desert-mongolia", "salar-de-uyuni-bolivia", "arabian-desert-saudi-arabia", "thar-desert-india", "kalahari-desert-botswana", "?", "taklamakan-desert-china", "karakum-desert-turkmenistan", "chihuahuan-desert-mexico", "patagonian-desert-argentina", "richat-structure-mauritania", "great-victoria-desert-australia"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE17DesertsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "deserts-e17-thumb", heroSlug: "salar-de-uyuni-bolivia", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE17DesertsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "deserts-e17-thumb", easySlug: "salar-de-uyuni-bolivia", hardSlug: "gilf-kebir-egypt", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE17DesertsNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "deserts-e17-thumb", cascade: ["namib-desert-namibia", "kalahari-desert-botswana", "white-sands-usa", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E18WaterfallsQuiz" component={QuizV2} durationInFrames={quizFrames(E18_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E18_INFOCFG }} />
      <Composition id="ThumbE18Waterfalls" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "waterfalls-e18-thumb", grid: ["niagara-falls", "victoria-falls", "angel-falls", "gullfoss", "yosemite-falls", "rhine-falls", "plitvice-falls", "jog-falls", "?", "huangguoshu-falls", "kaieteur-falls", "sutherland-falls", "marmore-falls", "kegon-falls", "voringsfossen"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE18WaterfallsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "waterfalls-e18-thumb", heroSlug: "angel-falls", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE18WaterfallsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "waterfalls-e18-thumb", easySlug: "niagara-falls", hardSlug: "bigar-waterfall", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE18WaterfallsNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "waterfalls-e18-thumb", cascade: ["sutherland-falls", "marmore-falls", "kegon-falls", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E19LakesQuiz" component={QuizV2} durationInFrames={quizFrames(E19_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E19_INFOCFG }} />
      <Composition id="ThumbE19Lakes" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lakes-e19-thumb", grid: ["lake-superior", "lake-victoria", "lake-baikal", "lake-titicaca", "loch-ness", "lake-como", "lake-tahoe", "caspian-sea", "lake-geneva", "?", "lake-bled", "lake-malawi", "lake-toba", "lake-balaton", "lake-atitlan"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE19LakesHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lakes-e19-thumb", heroSlug: "loch-ness", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE19LakesSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lakes-e19-thumb", easySlug: "lake-superior", hardSlug: "lake-karakul", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE19LakesNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lakes-e19-thumb", cascade: ["lake-bled", "lake-como", "lake-tahoe", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E20RiversQuiz" component={QuizV2} durationInFrames={quizFrames(E20_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E20_INFOCFG }} />
      <Composition id="ThumbE20Rivers" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "rivers-e20-thumb", grid: ["nile-river", "amazon-river", "mississippi-river", "yangtze-river", "danube-river", "rhine-river", "thames-river", "seine-river", "ganges-river", "?", "volga-river", "congo-river", "niger-river", "mekong-river", "euphrates-river"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE20RiversHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "rivers-e20-thumb", heroSlug: "nile-river", line1: "GUESS THE", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE20RiversSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "rivers-e20-thumb", easySlug: "nile-river", hardSlug: "trent-river", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE20RiversNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "rivers-e20-thumb", cascade: ["seine-river", "thames-river", "rhine-river", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E21SkylineQuiz" component={QuizV2} durationInFrames={quizFrames(E21_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E21_INFOCFG }} />
      <Composition id="ThumbE21Skyline" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skylines-e21-thumb", grid: ["new-york-city", "dubai", "hong-kong", "shanghai", "chicago", "london", "paris", "tokyo", "singapore", "?", "sydney", "toronto", "los-angeles", "las-vegas", "san-francisco"], line1: "CAN YOU NAME ALL", word: "CITY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE21SkylineHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skylines-e21-thumb", heroSlug: "new-york-city", line1: "GUESS THE", word: "CITY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE21SkylineSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skylines-e21-thumb", easySlug: "dubai", hardSlug: "ulaanbaatar", word: "CITY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE21SkylineNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skylines-e21-thumb", cascade: ["dubai", "tokyo", "paris", "?"], line1: "CAN YOU NAME ALL", word: "CITY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E22BirdQuiz" component={QuizV2} durationInFrames={quizFrames(E22_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E22_INFOCFG }} />
      <Composition id="ThumbE22Bird" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "birds-e22-thumb", grid: ["bald-eagle", "peacock", "flamingo", "emperor-penguin", "ostrich", "barn-owl", "toco-toucan", "hummingbird", "pelican", "?", "cardinal", "snowy-owl", "mute-swan", "kingfisher", "woodpecker"], line1: "CAN YOU NAME ALL", word: "BIRD?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE22BirdHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "birds-e22-thumb", heroSlug: "bald-eagle", line1: "GUESS THE", word: "BIRD?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE22BirdSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "birds-e22-thumb", easySlug: "bald-eagle", hardSlug: "cock-tailed-tyrant", word: "BIRD?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE22BirdNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "birds-e22-thumb", cascade: ["peacock", "flamingo", "toco-toucan", "?"], line1: "CAN YOU NAME ALL", word: "BIRD?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E23DogQuiz" component={QuizV2} durationInFrames={quizFrames(E23_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E23_INFOCFG }} />
      <Composition id="ThumbE23Dog" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "dogs-e23-thumb", grid: ["labrador-retriever", "golden-retriever", "german-shepherd", "poodle", "french-bulldog", "chihuahua", "dachshund", "beagle", "rottweiler", "siberian-husky", "pug", "boxer", "great-dane", "?", "doberman-pinscher"], line1: "CAN YOU NAME ALL", word: "BREED?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE23DogHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "dogs-e23-thumb", heroSlug: "golden-retriever", line1: "GUESS THE DOG", word: "BREED?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE23DogSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "dogs-e23-thumb", easySlug: "labrador-retriever", hardSlug: "puli", word: "BREED?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE23DogNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "dogs-e23-thumb", cascade: ["golden-retriever", "dachshund", "pembroke-welsh-corgi", "?"], line1: "CAN YOU NAME ALL", word: "BREED?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E24ReptileQuiz" component={QuizV2} durationInFrames={quizFrames(E24_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E24_INFOCFG }} />
      <Composition id="ThumbE24Reptile" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "reptiles-e24-thumb", grid: ["king-cobra", "green-anaconda", "komodo-dragon", "nile-crocodile", "american-alligator", "veiled-chameleon", "green-iguana", "burmese-python", "leopard-gecko", "boa-constrictor", "bearded-dragon", "monitor-lizard", "corn-snake", "?", "box-turtle"], line1: "CAN YOU NAME ALL", word: "REPTILE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE24ReptileHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "reptiles-e24-thumb", heroSlug: "komodo-dragon", line1: "GUESS THE", word: "REPTILE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE24ReptileSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "reptiles-e24-thumb", easySlug: "king-cobra", hardSlug: "gaboon-viper", word: "REPTILE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE24ReptileNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "reptiles-e24-thumb", cascade: ["king-cobra", "green-anaconda", "komodo-dragon", "?"], line1: "CAN YOU NAME ALL", word: "REPTILE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E25ClubQuiz" component={QuizV2} durationInFrames={quizFrames(E25_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E25_INFOCFG }} />
      <Composition id="ThumbE25Club" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "clubs-e25-thumb", grid: ["real-madrid", "fc-barcelona", "manchester-united", "liverpool", "manchester-city", "chelsea", "arsenal", "bayern-munich", "juventus", "paris-saint-germain", "ac-milan", "inter-milan", "tottenham-hotspur", "?", "boca-juniors"], line1: "CAN YOU NAME ALL", word: "CLUB?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE25ClubHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "clubs-e25-thumb", heroSlug: "real-madrid", line1: "GUESS THE", word: "CLUB?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE25ClubSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "clubs-e25-thumb", easySlug: "real-madrid", hardSlug: "athletic-bilbao", word: "CLUB?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE25ClubNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "clubs-e25-thumb", cascade: ["real-madrid", "fc-barcelona", "manchester-united", "?"], line1: "CAN YOU NAME ALL", word: "CLUB?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E26AirlineQuiz" component={QuizV2} durationInFrames={quizFrames(E26_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E26_INFOCFG }} />
      <Composition id="ThumbE26Airline" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "airlines-e26-thumb", grid: ["american-airlines", "delta-air-lines", "united-airlines", "emirates", "qatar-airways", "lufthansa", "british-airways", "air-france", "singapore-airlines", "southwest-airlines", "ryanair", "easyjet", "qantas", "?", "air-canada"], line1: "CAN YOU NAME ALL", word: "AIRLINE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE26AirlineHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "airlines-e26-thumb", heroSlug: "emirates", line1: "GUESS THE", word: "AIRLINE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE26AirlineSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "airlines-e26-thumb", easySlug: "american-airlines", hardSlug: "ethiopian-airlines", word: "AIRLINE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE26AirlineNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "airlines-e26-thumb", cascade: ["american-airlines", "delta-air-lines", "emirates", "?"], line1: "CAN YOU NAME ALL", word: "AIRLINE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E27ChainQuiz" component={QuizV2} durationInFrames={quizFrames(E27_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E27_INFOCFG }} />
      <Composition id="ThumbE27Chain" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fastfood-e27-thumb", grid: ["mcdonalds", "kfc", "burger-king", "subway", "pizza-hut", "dominos-pizza", "starbucks", "taco-bell", "dunkin", "wendys", "papa-johns", "chick-fil-a", "baskin-robbins", "?", "popeyes"], line1: "CAN YOU NAME ALL", word: "CHAIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE27ChainHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fastfood-e27-thumb", heroSlug: "mcdonalds", line1: "GUESS THE", word: "CHAIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE27ChainSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fastfood-e27-thumb", easySlug: "mcdonalds", hardSlug: "white-castle", word: "CHAIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE27ChainNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fastfood-e27-thumb", cascade: ["mcdonalds", "kfc", "burger-king", "?"], line1: "CAN YOU NAME ALL", word: "CHAIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E28StudioQuiz" component={QuizV2} durationInFrames={quizFrames(E28_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E28_INFOCFG }} />
      <Composition id="ThumbE28Studio" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "studios-e28-thumb", grid: ["walt-disney-pictures", "warner-bros-pictures", "universal-pictures", "pixar", "paramount-pictures", "20th-century-studios", "sony-pictures", "marvel-studios", "dreamworks-animation", "netflix", "columbia-pictures", "metro-goldwyn-mayer", "lucasfilm", "?", "hbo"], line1: "CAN YOU NAME ALL", word: "STUDIO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE28StudioHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "studios-e28-thumb", heroSlug: "walt-disney-pictures", line1: "GUESS THE", word: "STUDIO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE28StudioSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "studios-e28-thumb", easySlug: "walt-disney-pictures", hardSlug: "monogram-pictures", word: "STUDIO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE28StudioNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "studios-e28-thumb", cascade: ["walt-disney-pictures", "warner-bros-pictures", "universal-pictures", "?"], line1: "CAN YOU NAME ALL", word: "STUDIO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E29BrandQuiz" component={QuizV2} durationInFrames={quizFrames(E29_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E29_INFOCFG }} />
      <Composition id="ThumbE29Brand" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fashion-e29-thumb", grid: ["nike", "adidas", "gucci", "louis-vuitton", "chanel", "zara", "hm", "levis", "puma", "calvin-klein", "ralph-lauren", "converse", "versace", "?", "vans"], line1: "CAN YOU NAME ALL", word: "BRAND?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE29BrandHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fashion-e29-thumb", heroSlug: "nike", line1: "GUESS THE", word: "BRAND?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE29BrandSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fashion-e29-thumb", easySlug: "nike", hardSlug: "vetements", word: "BRAND?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE29BrandNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fashion-e29-thumb", cascade: ["nike", "adidas", "gucci", "?"], line1: "CAN YOU NAME ALL", word: "BRAND?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E30ConsoleQuiz" component={QuizV2} durationInFrames={quizFrames(E30_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E30_INFOCFG }} />
      <Composition id="ThumbE30Console" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "consoles-e30-thumb", grid: ["playstation", "xbox", "nintendo-switch", "wii", "game-boy", "nintendo-64", "sega-genesis", "?", "atari-2600"], line1: "CAN YOU NAME ALL", word: "CONSOLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE30ConsoleHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "consoles-e30-thumb", heroSlug: "playstation", line1: "GUESS THE", word: "CONSOLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE30ConsoleSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "consoles-e30-thumb", easySlug: "playstation", hardSlug: "gp2x", word: "CONSOLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE30ConsoleNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "consoles-e30-thumb", cascade: ["playstation", "xbox", "nintendo-switch", "?"], line1: "CAN YOU NAME ALL", word: "CONSOLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E32CastleQuiz" component={QuizV2} durationInFrames={quizFrames(E32_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E32_INFOCFG }} />
      <Composition id="ThumbE32Castle" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "castles-e32-thumb", grid: ["neuschwanstein-castle", "windsor-castle", "edinburgh-castle", "chateau-de-chambord", "himeji-castle", "prague-castle", "alhambra", "?", "bran-castle"], line1: "CAN YOU NAME ALL", word: "CASTLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE32CastleHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "castles-e32-thumb", heroSlug: "neuschwanstein-castle", line1: "GUESS THE", word: "CASTLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE32CastleSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "castles-e32-thumb", easySlug: "neuschwanstein-castle", hardSlug: "shuri-castle", word: "CASTLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE32CastleNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "castles-e32-thumb", cascade: ["neuschwanstein-castle", "windsor-castle", "edinburgh-castle", "?"], line1: "CAN YOU NAME ALL", word: "CASTLE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E33CostumeQuiz" component={QuizV2} durationInFrames={quizFrames(E33_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E33_INFOCFG }} />
      <Composition id="ThumbE33Costume" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "costumes-e33-thumb", grid: ["japan-kimono", "india-sari", "scotland-kilt", "mexico-china-poblana", "south-korea-hanbok", "germany-lederhosen", "netherlands-volendam", "?", "spain-flamenco"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE33CostumeHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "costumes-e33-thumb", heroSlug: "japan-kimono", line1: "GUESS THE", word: "COUNTRY?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE33CostumeSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "costumes-e33-thumb", easySlug: "japan-kimono", hardSlug: "georgia-chokha", word: "COUNTRY?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE33CostumeNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "costumes-e33-thumb", cascade: ["japan-kimono", "india-sari", "scotland-kilt", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="E34CurrencyQuiz" component={QuizV2} durationInFrames={quizFrames(E34_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E34_INFOCFG }} />
      <Composition id="ThumbE34Currency" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "currencies-e34-thumb", grid: ["usa-dollar", "eurozone-euro", "japan-yen", "china-yuan", "india-rupee", "australia-dollar", "switzerland-franc", "?", "brazil-real"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "34", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE34CurrencyHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "currencies-e34-thumb", heroSlug: "usa-dollar", line1: "GUESS THE", word: "COUNTRY?", number: "34", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE34CurrencySplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "currencies-e34-thumb", easySlug: "usa-dollar", hardSlug: "moldova-leu", word: "COUNTRY?", number: "34", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE34CurrencyNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "currencies-e34-thumb", cascade: ["usa-dollar", "eurozone-euro", "japan-yen", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRY?", number: "34", badge: "Only 1% get 100%" }} />
      <Composition id="E35RuinQuiz" component={QuizV2} durationInFrames={quizFrames(E35_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E35_INFOCFG }} />
      <Composition id="ThumbE35Ruin" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "ruins-e35-thumb", grid: ["pompeii", "persepolis", "ephesus", "karnak-temple", "luxor-temple", "abu-simbel", "teotihuacan", "?", "tikal"], line1: "CAN YOU NAME ALL", word: "RUIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE35RuinHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "ruins-e35-thumb", heroSlug: "pompeii", line1: "GUESS THE", word: "RUIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE35RuinSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "ruins-e35-thumb", easySlug: "pompeii", hardSlug: "ai-khanoum", word: "RUIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE35RuinNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "ruins-e35-thumb", cascade: ["pompeii", "persepolis", "ephesus", "?"], line1: "CAN YOU NAME ALL", word: "RUIN?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E36EmojiMovieQuiz" component={QuizV2} durationInFrames={quizFrames(E36_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E36_INFOCFG }} />
      <Composition id="ThumbE36EmojiMovie" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "emoji-e36-thumb", grid: ["titanic", "the-lion-king", "frozen", "jaws", "jurassic-park", "star-wars", "home-alone", "?", "the-matrix"], line1: "CAN YOU NAME ALL", word: "MOVIE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE36EmojiMovieHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "emoji-e36-thumb", heroSlug: "titanic", line1: "GUESS THE", word: "MOVIE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE36EmojiMovieSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "emoji-e36-thumb", easySlug: "titanic", hardSlug: "meshes-of-the-afternoon", word: "MOVIE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE36EmojiMovieNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "emoji-e36-thumb", cascade: ["titanic", "the-lion-king", "frozen", "?"], line1: "CAN YOU NAME ALL", word: "MOVIE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E37InstrumentQuiz" component={QuizV2} durationInFrames={quizFrames(E37_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E37_INFOCFG }} />
      <Composition id="ThumbE37Instrument" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "instruments-e37-thumb", grid: ["guitar", "piano", "violin", "drum-kit", "flute", "trumpet", "saxophone", "?", "cello"], line1: "CAN YOU NAME ALL", word: "INSTRUMENT?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE37InstrumentHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "instruments-e37-thumb", heroSlug: "guitar", line1: "GUESS THE", word: "INSTRUMENT?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE37InstrumentSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "instruments-e37-thumb", easySlug: "guitar", hardSlug: "crumhorn", word: "INSTRUMENT?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE37InstrumentNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "instruments-e37-thumb", cascade: ["guitar", "piano", "violin", "?"], line1: "CAN YOU NAME ALL", word: "INSTRUMENT?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="E38MascotQuiz" component={QuizV2} durationInFrames={quizFrames(E38_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E38_INFOCFG }} />
      <Composition id="ThumbE38Mascot" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mascots-e38-thumb", grid: ["phillie-phanatic", "gritty", "benny-the-bull", "sluggerrr", "fred-the-red", "cocky", "purdue-pete", "?", "cyril-the-swan"], line1: "CAN YOU NAME ALL", word: "MASCOT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE38MascotHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mascots-e38-thumb", heroSlug: "gritty", line1: "GUESS THE", word: "MASCOT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE38MascotSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mascots-e38-thumb", easySlug: "phillie-phanatic", hardSlug: "rowdy-utsa", word: "MASCOT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE38MascotNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mascots-e38-thumb", cascade: ["phillie-phanatic", "gritty", "sluggerrr", "?"], line1: "CAN YOU NAME ALL", word: "MASCOT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E39ZodiacQuiz" component={QuizV2} durationInFrames={quizFrames(E39_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E39_INFOCFG }} />
      <Composition id="ThumbE39Zodiac" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "zodiac-e39-thumb", grid: ["aries", "leo", "dragon", "taurus", "?", "horus", "gemini", "cancer", "tiger"], line1: "CAN YOU NAME ALL", word: "ZODIAC SIGN?", number: "65", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE39ZodiacHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "zodiac-e39-thumb", heroSlug: "dragon", line1: "GUESS THE", word: "ZODIAC SIGN?", number: "65", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE39ZodiacSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "zodiac-e39-thumb", easySlug: "aries", hardSlug: "calli", word: "ZODIAC SIGN?", number: "65", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE39ZodiacNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "zodiac-e39-thumb", cascade: ["aries", "leo", "dragon", "?"], line1: "CAN YOU NAME ALL", word: "ZODIAC SIGN?", number: "65", badge: "Only 1% get 100%" }} />
      <Composition id="E40SpaceQuiz" component={QuizV2} durationInFrames={quizFrames(E40_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E40_INFOCFG }} />
      <Composition id="ThumbE40Space" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "space-e40-thumb", grid: ["earth", "saturn", "mars", "jupiter", "?", "moon", "sun", "jwst", "milky-way"], line1: "CAN YOU NAME ALL", word: "SPACE OBJECT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE40SpaceHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "space-e40-thumb", heroSlug: "saturn", line1: "GUESS THE", word: "SPACE OBJECT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE40SpaceSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "space-e40-thumb", easySlug: "earth", hardSlug: "amalthea", word: "SPACE OBJECT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE40SpaceNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "space-e40-thumb", cascade: ["earth", "saturn", "mars", "?"], line1: "CAN YOU NAME ALL", word: "SPACE OBJECT?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E41AppIconQuiz" component={QuizV2} durationInFrames={quizFrames(E41_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E41_INFOCFG }} />
      <Composition id="ThumbE41AppIcon" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "appicons-e41-thumb", grid: ["whatsapp", "instagram", "youtube", "google", "?", "tiktok", "netflix", "spotify", "x-twitter"], line1: "CAN YOU NAME ALL", word: "APP ICON?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE41AppIconHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "appicons-e41-thumb", heroSlug: "whatsapp", line1: "GUESS THE", word: "APP ICON?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE41AppIconSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "appicons-e41-thumb", easySlug: "whatsapp", hardSlug: "kakaotalk", word: "APP ICON?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE41AppIconNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "appicons-e41-thumb", cascade: ["whatsapp", "instagram", "youtube", "?"], line1: "CAN YOU NAME ALL", word: "APP ICON?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E42UsFlagQuiz" component={QuizV2} durationInFrames={quizFrames(E42_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E42_INFOCFG }} />
      <Composition id="ThumbE42UsFlag" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags-e42-thumb", grid: ["texas", "california", "hawaii", "arizona", "?", "ohio", "maryland", "colorado", "alaska"], line1: "CAN YOU NAME ALL", word: "STATE FLAG?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE42UsFlagHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags-e42-thumb", heroSlug: "texas", line1: "GUESS THE", word: "STATE FLAG?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE42UsFlagSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags-e42-thumb", easySlug: "texas", hardSlug: "northern-mariana-islands", word: "STATE FLAG?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE42UsFlagNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "flags-e42-thumb", cascade: ["texas", "california", "hawaii", "?"], line1: "CAN YOU NAME ALL", word: "STATE FLAG?", number: "56", badge: "Only 1% get 100%" }} />
      <Composition id="E43FruitsQuiz" component={QuizV2} durationInFrames={quizFrames(E43_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E43_INFOCFG }} />
      <Composition id="ThumbE43Fruits" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fruits-e43-thumb", grid: ["apple", "banana", "strawberry", "orange", "?", "watermelon", "pineapple", "mango", "grape"], line1: "CAN YOU NAME ALL", word: "FRUIT?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE43FruitsHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fruits-e43-thumb", heroSlug: "strawberry", line1: "GUESS THE", word: "FRUIT?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE43FruitsSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fruits-e43-thumb", easySlug: "apple", hardSlug: "black-sapote", word: "FRUIT?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE43FruitsNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "fruits-e43-thumb", cascade: ["apple", "banana", "strawberry", "?"], line1: "CAN YOU NAME ALL", word: "FRUIT?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E45ButterflyQuiz" component={QuizV2} durationInFrames={quizFrames(E45_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E45_INFOCFG }} />
      <Composition id="ThumbE45Butterfly" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "butterflies-e45-thumb", grid: ["monarch-butterfly", "blue-morpho", "painted-lady", "swallowtail-butterfly", "?", "peacock-butterfly", "red-admiral", "cabbage-white", "common-buckeye"], line1: "CAN YOU NAME ALL", word: "BUTTERFLY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE45ButterflyHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "butterflies-e45-thumb", heroSlug: "monarch-butterfly", line1: "GUESS THE", word: "BUTTERFLY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE45ButterflySplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "butterflies-e45-thumb", easySlug: "monarch-butterfly", hardSlug: "xerces-blue", word: "BUTTERFLY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE45ButterflyNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "butterflies-e45-thumb", cascade: ["monarch-butterfly", "blue-morpho", "painted-lady", "?"], line1: "CAN YOU NAME ALL", word: "BUTTERFLY?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E46SeaCreatureQuiz" component={QuizV2} durationInFrames={quizFrames(E46_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E46_INFOCFG }} />
      <Composition id="ThumbE46SeaCreature" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "sea-creatures-e46-thumb", grid: ["great-white-shark", "bottlenose-dolphin", "clownfish", "orca", "?", "seahorse", "starfish", "common-octopus", "blue-whale"], line1: "CAN YOU NAME ALL", word: "SEA CREATURE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE46SeaCreatureHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "sea-creatures-e46-thumb", heroSlug: "great-white-shark", line1: "GUESS THE", word: "SEA CREATURE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE46SeaCreatureSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "sea-creatures-e46-thumb", easySlug: "great-white-shark", hardSlug: "glass-squid", word: "SEA CREATURE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE46SeaCreatureNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "sea-creatures-e46-thumb", cascade: ["great-white-shark", "bottlenose-dolphin", "clownfish", "?"], line1: "CAN YOU NAME ALL", word: "SEA CREATURE?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E47BridgeQuiz" component={QuizV2} durationInFrames={quizFrames(E47_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E47_INFOCFG }} />
      <Composition id="ThumbE47Bridge" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "bridges-e47-thumb", grid: ["golden-gate-bridge", "tower-bridge", "brooklyn-bridge", "sydney-harbour-bridge", "?", "rialto-bridge", "ponte-vecchio", "charles-bridge", "millau-viaduct"], line1: "CAN YOU NAME ALL", word: "BRIDGE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE47BridgeHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "bridges-e47-thumb", heroSlug: "golden-gate-bridge", line1: "GUESS THE", word: "BRIDGE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE47BridgeSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "bridges-e47-thumb", easySlug: "golden-gate-bridge", hardSlug: "chesapeake-bay-bridge-tunnel", word: "BRIDGE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE47BridgeNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "bridges-e47-thumb", cascade: ["golden-gate-bridge", "tower-bridge", "brooklyn-bridge", "?"], line1: "CAN YOU NAME ALL", word: "BRIDGE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E48ToyGameLogoQuiz" component={QuizV2} durationInFrames={quizFrames(E48_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E48_INFOCFG }} />
      <Composition id="ThumbE48ToyGameLogo" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "toygames-e48-thumb", grid: ["lego", "barbie", "monopoly", "hot-wheels", "?", "uno", "rubiks-cube", "crayola", "jenga"], line1: "CAN YOU NAME ALL", word: "TOY LOGO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE48ToyGameLogoHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "toygames-e48-thumb", heroSlug: "lego", line1: "GUESS THE", word: "TOY LOGO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE48ToyGameLogoSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "toygames-e48-thumb", easySlug: "lego", hardSlug: "corgi-toys", word: "TOY LOGO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE48ToyGameLogoNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "toygames-e48-thumb", cascade: ["lego", "barbie", "monopoly", "?"], line1: "CAN YOU NAME ALL", word: "TOY LOGO?", number: "71", badge: "Only 1% get 100%" }} />
      <Composition id="E49PaintingQuiz" component={QuizV2} durationInFrames={quizFrames(E49_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E49_INFOCFG }} />
      <Composition id="ThumbE49Painting" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "paintings-e49-thumb", grid: ["mona-lisa", "the-starry-night", "the-last-supper", "the-scream", "?", "girl-with-a-pearl-earring", "the-birth-of-venus", "american-gothic", "sunflowers"], line1: "CAN YOU NAME ALL", word: "PAINTING?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE49PaintingHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "paintings-e49-thumb", heroSlug: "mona-lisa", line1: "GUESS THE", word: "PAINTING?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE49PaintingSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "paintings-e49-thumb", easySlug: "mona-lisa", hardSlug: "woman-holding-a-balance", word: "PAINTING?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE49PaintingNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "paintings-e49-thumb", cascade: ["mona-lisa", "the-starry-night", "the-scream", "?"], line1: "CAN YOU NAME ALL", word: "PAINTING?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E50GemstoneQuiz" component={QuizV2} durationInFrames={quizFrames(E50_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E50_INFOCFG }} />
      <Composition id="ThumbE50Gemstone" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gemstones-e50-thumb", grid: ["diamond", "ruby", "emerald", "sapphire", "?", "amethyst", "opal", "pearl", "gold"], line1: "CAN YOU NAME ALL", word: "GEMSTONE?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE50GemstoneHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gemstones-e50-thumb", heroSlug: "diamond", line1: "GUESS THE", word: "GEMSTONE?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE50GemstoneSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gemstones-e50-thumb", easySlug: "diamond", hardSlug: "ekanite", word: "GEMSTONE?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE50GemstoneNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "gemstones-e50-thumb", cascade: ["diamond", "ruby", "emerald", "?"], line1: "CAN YOU NAME ALL", word: "GEMSTONE?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="E51StatueQuiz" component={QuizV2} durationInFrames={quizFrames(E51_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E51_INFOCFG }} />
      <Composition id="ThumbE51Statue" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "statues-e51-thumb", grid: ["statue-of-liberty", "christ-the-redeemer", "mount-rushmore", "little-mermaid-copenhagen", "?", "the-thinker-rodin", "david-michelangelo", "manneken-pis", "motherland-calls"], line1: "CAN YOU NAME ALL", word: "STATUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE51StatueHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "statues-e51-thumb", heroSlug: "statue-of-liberty", line1: "GUESS THE", word: "STATUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE51StatueSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "statues-e51-thumb", easySlug: "statue-of-liberty", hardSlug: "colossus-of-barletta", word: "STATUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE51StatueNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "statues-e51-thumb", cascade: ["statue-of-liberty", "christ-the-redeemer", "mount-rushmore", "?"], line1: "CAN YOU NAME ALL", word: "STATUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E52ElementQuiz" component={QuizV2} durationInFrames={quizFrames(E52_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E52_INFOCFG }} />
      <Composition id="ThumbE52Element" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "elements-e52-thumb", grid: ["gold", "silver", "copper", "iron", "?", "carbon", "oxygen", "hydrogen", "helium"], line1: "CAN YOU NAME ALL", word: "ELEMENT?", number: "76", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE52ElementHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "elements-e52-thumb", heroSlug: "gold", line1: "GUESS THE", word: "ELEMENT?", number: "76", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE52ElementSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "elements-e52-thumb", easySlug: "gold", hardSlug: "livermorium", word: "ELEMENT?", number: "76", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE52ElementNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "elements-e52-thumb", cascade: ["gold", "silver", "copper", "?"], line1: "CAN YOU NAME ALL", word: "ELEMENT?", number: "76", badge: "Only 1% get 100%" }} />
      <Composition id="E53ClassicCarQuiz" component={QuizV2} durationInFrames={quizFrames(E53_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E53_INFOCFG }} />
      <Composition id="ThumbE53ClassicCar" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "classic-cars-e53-thumb", grid: ["volkswagen-beetle", "mini-cooper", "ford-mustang", "delorean-dmc-12", "?", "fiat-500-classic", "citroen-2cv", "land-rover-defender", "rolls-royce-silver-shadow"], line1: "CAN YOU NAME ALL", word: "CLASSIC CAR?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE53ClassicCarHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "classic-cars-e53-thumb", heroSlug: "volkswagen-beetle", line1: "GUESS THE", word: "CLASSIC CAR?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE53ClassicCarSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "classic-cars-e53-thumb", easySlug: "volkswagen-beetle", hardSlug: "panhard-dyna-z", word: "CLASSIC CAR?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE53ClassicCarNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "classic-cars-e53-thumb", cascade: ["volkswagen-beetle", "mini-cooper", "ford-mustang", "?"], line1: "CAN YOU NAME ALL", word: "CLASSIC CAR?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="E54TrophyQuiz" component={QuizV2} durationInFrames={quizFrames(E54_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E54_INFOCFG }} />
      <Composition id="ThumbE54Trophy" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "trophies-e54-thumb", grid: ["fifa-world-cup-trophy", "stanley-cup", "wimbledon-trophy", "uefa-champions-league-trophy", "?", "vince-lombardi-trophy", "ballon-dor-trophy", "claret-jug", "larry-obrien-trophy"], line1: "CAN YOU NAME ALL", word: "SPORTS TROPHY?", number: "52", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE54TrophyHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "trophies-e54-thumb", heroSlug: "fifa-world-cup-trophy", line1: "GUESS THE", word: "SPORTS TROPHY?", number: "52", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE54TrophySplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "trophies-e54-thumb", easySlug: "fifa-world-cup-trophy", hardSlug: "sam-maguire-cup", word: "SPORTS TROPHY?", number: "52", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE54TrophyNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "trophies-e54-thumb", cascade: ["fifa-world-cup-trophy", "stanley-cup", "wimbledon-trophy", "?"], line1: "CAN YOU NAME ALL", word: "SPORTS TROPHY?", number: "52", badge: "Only 1% get 100%" }} />
      <Composition id="E55StadiumQuiz" component={QuizV2} durationInFrames={quizFrames(E55_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E55_INFOCFG }} />
      <Composition id="ThumbE55Stadium" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "stadiums-e55-thumb", grid: ["wembley-stadium", "camp-nou", "maracana", "san-siro", "?", "old-trafford", "allianz-arena", "santiago-bernabeu", "yankee-stadium"], line1: "CAN YOU NAME ALL", word: "STADIUM?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE55StadiumHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "stadiums-e55-thumb", heroSlug: "wembley-stadium", line1: "GUESS THE", word: "STADIUM?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE55StadiumSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "stadiums-e55-thumb", easySlug: "wembley-stadium", hardSlug: "estadio-defensores-del-chaco", word: "STADIUM?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE55StadiumNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "stadiums-e55-thumb", cascade: ["wembley-stadium", "camp-nou", "maracana", "?"], line1: "CAN YOU NAME ALL", word: "STADIUM?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E56CatBreedQuiz" component={QuizV2} durationInFrames={quizFrames(E56_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E56_INFOCFG }} />
      <Composition id="ThumbE56CatBreed" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "catbreeds-e56-thumb", grid: ["persian", "siamese", "maine-coon", "sphynx", "?", "scottish-fold", "ragdoll", "bengal", "russian-blue"], line1: "CAN YOU NAME ALL", word: "CAT BREED?", number: "66", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE56CatBreedHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "catbreeds-e56-thumb", heroSlug: "sphynx", line1: "GUESS THE", word: "CAT BREED?", number: "66", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE56CatBreedSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "catbreeds-e56-thumb", easySlug: "persian", hardSlug: "german-rex", word: "CAT BREED?", number: "66", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE56CatBreedNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "catbreeds-e56-thumb", cascade: ["persian", "siamese", "maine-coon", "?"], line1: "CAN YOU NAME ALL", word: "CAT BREED?", number: "66", badge: "Only 1% get 100%" }} />
      <Composition id="E57NationalParkQuiz" component={QuizV2} durationInFrames={quizFrames(E57_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E57_INFOCFG }} />
      <Composition id="ThumbE57NationalPark" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nationalparks-e57-thumb", grid: ["yellowstone", "grand-canyon", "yosemite", "?", "serengeti", "banff", "zion", "kruger", "komodo"], line1: "CAN YOU NAME ALL", word: "NATIONAL PARKS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE57NationalParkHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nationalparks-e57-thumb", heroSlug: "grand-canyon", line1: "GUESS THE", word: "NATIONAL PARK?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE57NationalParkSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nationalparks-e57-thumb", easySlug: "yellowstone", hardSlug: "korup", word: "NATIONAL PARK?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE57NationalParkNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nationalparks-e57-thumb", cascade: ["yellowstone", "grand-canyon", "yosemite", "?"], line1: "CAN YOU NAME ALL", word: "NATIONAL PARKS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E58SkyscraperQuiz" component={QuizV2} durationInFrames={quizFrames(E58_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E58_INFOCFG }} />
      <Composition id="ThumbE58Skyscraper" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skyscrapers-e58-thumb", grid: ["burj-khalifa", "empire-state-building", "shanghai-tower", "?", "petronas-towers", "taipei-101", "the-shard", "willis-tower", "chrysler-building"], line1: "CAN YOU NAME ALL", word: "SKYSCRAPERS?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE58SkyscraperHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skyscrapers-e58-thumb", heroSlug: "burj-khalifa", line1: "GUESS THE", word: "SKYSCRAPER?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE58SkyscraperSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skyscrapers-e58-thumb", easySlug: "burj-khalifa", hardSlug: "poly-international-plaza", word: "SKYSCRAPER?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE58SkyscraperNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "skyscrapers-e58-thumb", cascade: ["burj-khalifa", "empire-state-building", "shanghai-tower", "?"], line1: "CAN YOU NAME ALL", word: "SKYSCRAPERS?", number: "68", badge: "Only 1% get 100%" }} />
      <Composition id="E59PalaceQuiz" component={QuizV2} durationInFrames={quizFrames(E59_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E59_INFOCFG }} />
      <Composition id="ThumbE59Palace" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "palaces-e59-thumb", grid: ["buckingham-palace", "palace-of-versailles", "forbidden-city", "?", "potala-palace", "topkapi-palace", "alhambra", "schonbrunn-palace", "peterhof-palace"], line1: "CAN YOU NAME ALL", word: "PALACES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE59PalaceHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "palaces-e59-thumb", heroSlug: "buckingham-palace", line1: "GUESS THE", word: "PALACE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE59PalaceSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "palaces-e59-thumb", easySlug: "buckingham-palace", hardSlug: "jubilee-palace", word: "PALACE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE59PalaceNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "palaces-e59-thumb", cascade: ["buckingham-palace", "palace-of-versailles", "forbidden-city", "?"], line1: "CAN YOU NAME ALL", word: "PALACES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E60CathedralQuiz" component={QuizV2} durationInFrames={quizFrames(E60_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E60_INFOCFG }} />
      <Composition id="ThumbE60Cathedral" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "cathedrals-e60-thumb", grid: ["notre-dame-paris", "st-peters-basilica", "sagrada-familia", "?", "st-basils-cathedral", "hagia-sophia", "st-pauls-cathedral", "cologne-cathedral", "milan-cathedral"], line1: "CAN YOU NAME ALL", word: "CATHEDRALS?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE60CathedralHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "cathedrals-e60-thumb", heroSlug: "notre-dame-paris", line1: "GUESS THE", word: "CATHEDRAL?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE60CathedralSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "cathedrals-e60-thumb", easySlug: "notre-dame-paris", hardSlug: "coptic-cathedral-cairo", word: "CATHEDRAL?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE60CathedralNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "cathedrals-e60-thumb", cascade: ["notre-dame-paris", "st-peters-basilica", "sagrada-familia", "?"], line1: "CAN YOU NAME ALL", word: "CATHEDRALS?", number: "74", badge: "Only 1% get 100%" }} />
      <Composition id="E61MosqueQuiz" component={QuizV2} durationInFrames={quizFrames(E61_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E61_INFOCFG }} />
      <Composition id="ThumbE61Mosque" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mosques-e61-thumb", grid: ["sheikh-zayed-grand-mosque", "blue-mosque", "masjid-al-haram", "?", "al-masjid-an-nabawi", "faisal-mosque", "hassan-ii-mosque", "suleymaniye-mosque", "badshahi-mosque"], line1: "CAN YOU NAME ALL", word: "MOSQUES?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE61MosqueHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mosques-e61-thumb", heroSlug: "sheikh-zayed-grand-mosque", line1: "GUESS THE", word: "MOSQUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE61MosqueSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mosques-e61-thumb", easySlug: "sheikh-zayed-grand-mosque", hardSlug: "jinnah-memorial-mosque", word: "MOSQUE?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE61MosqueNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "mosques-e61-thumb", cascade: ["sheikh-zayed-grand-mosque", "blue-mosque", "masjid-al-haram", "?"], line1: "CAN YOU NAME ALL", word: "MOSQUES?", number: "72", badge: "Only 1% get 100%" }} />
      <Composition id="E62LighthouseQuiz" component={QuizV2} durationInFrames={quizFrames(E62_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E62_INFOCFG }} />
      <Composition id="ThumbE62Lighthouse" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lighthouses-e62-thumb", grid: ["cape-hatteras-lighthouse", "portland-head-light", "peggys-point-lighthouse", "?", "eddystone-lighthouse", "fastnet-lighthouse", "neist-point-lighthouse", "split-rock-lighthouse", "la-jument-lighthouse"], line1: "CAN YOU NAME ALL", word: "LIGHTHOUSES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE62LighthouseHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lighthouses-e62-thumb", heroSlug: "cape-hatteras-lighthouse", line1: "GUESS THE", word: "LIGHTHOUSE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE62LighthouseSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lighthouses-e62-thumb", easySlug: "cape-hatteras-lighthouse", hardSlug: "farol-de-santa-marta", word: "LIGHTHOUSE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE62LighthouseNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "lighthouses-e62-thumb", cascade: ["cape-hatteras-lighthouse", "portland-head-light", "peggys-point-lighthouse", "?"], line1: "CAN YOU NAME ALL", word: "LIGHTHOUSES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E63CapitalQuiz" component={QuizV2} durationInFrames={quizFrames(E63_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E63_INFOCFG }} />
      <Composition id="ThumbE63Capital" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e63-thumb", grid: ["us", "fr", "gb", "?", "jp", "cn", "de", "in", "br"], line1: "CAN YOU NAME ALL", word: "COUNTRIES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE63CapitalHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e63-thumb", heroSlug: "us", line1: "GUESS THE", word: "COUNTRY?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE63CapitalSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e63-thumb", easySlug: "us", hardSlug: "nr", word: "COUNTRY?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE63CapitalNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e63-thumb", cascade: ["us", "fr", "gb", "?"], line1: "CAN YOU NAME ALL", word: "COUNTRIES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E64CapitalQuiz" component={QuizV2} durationInFrames={quizFrames(E64_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E64_INFOCFG }} />
      <Composition id="ThumbE64Capital" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e64-thumb", grid: ["sg", "kp", "tw", "?", "ir", "iq", "co", "ve", "gh"], line1: "CAN YOU NAME ALL", word: "CAPITALS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE64CapitalHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e64-thumb", heroSlug: "sg", line1: "GUESS THE", word: "CAPITAL?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE64CapitalSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e64-thumb", easySlug: "sg", hardSlug: "vu", word: "CAPITAL?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE64CapitalNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "capitals-e64-thumb", cascade: ["sg", "kp", "tw", "?"], line1: "CAN YOU NAME ALL", word: "CAPITALS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E65PhoneQuiz" component={QuizV2} durationInFrames={quizFrames(E65_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E65_INFOCFG }} />
      <Composition id="ThumbE65Phone" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phones-e65-thumb", grid: ["apple-iphone-2007", "nokia-3310", "motorola-razr-v3", "?", "htc-dream-t-mobile-g1", "apple-iphone-4", "blackberry-bold-9000", "motorola-startac", "nokia-8110"], line1: "CAN YOU NAME ALL", word: "PHONES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE65PhoneHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phones-e65-thumb", heroSlug: "nokia-3310", line1: "GUESS THE", word: "PHONE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE65PhoneSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phones-e65-thumb", easySlug: "apple-iphone-2007", hardSlug: "samsung-sgh-t100", word: "PHONE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE65PhoneNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phones-e65-thumb", cascade: ["apple-iphone-2007", "nokia-3310", "motorola-razr-v3", "?"], line1: "CAN YOU NAME ALL", word: "PHONES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E66AppleQuiz" component={QuizV2} durationInFrames={quizFrames(E66_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E66_INFOCFG }} />
      <Composition id="ThumbE66Apple" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "apple-e66-thumb", grid: ["airpods-1st-generation", "macintosh-color-classic", "apple-watch-1st-generation", "?", "imac-g3", "macbook-air-2008", "ipod-1st-generation", "macintosh-128k", "power-mac-g4-cube"], line1: "CAN YOU NAME ALL", word: "DEVICES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE66AppleHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "apple-e66-thumb", heroSlug: "airpods-1st-generation", line1: "GUESS THE", word: "DEVICE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE66AppleSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "apple-e66-thumb", easySlug: "airpods-1st-generation", hardSlug: "apple-pippin", word: "DEVICE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE66AppleNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "apple-e66-thumb", cascade: ["airpods-1st-generation", "macintosh-128k", "apple-watch-1st-generation", "?"], line1: "CAN YOU NAME ALL", word: "DEVICES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E67PhoneLogoQuiz" component={QuizV2} durationInFrames={quizFrames(E67_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E67_INFOCFG }} />
      <Composition id="ThumbE67PhoneLogo" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phonelogos-e67-thumb", grid: ["blackberry", "htc", "philips", "?", "ericsson", "toshiba", "casio", "palm", "caterpillar"], line1: "CAN YOU NAME ALL", word: "LOGOS?", number: "40", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE67PhoneLogoHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phonelogos-e67-thumb", heroSlug: "blackberry", line1: "GUESS THE", word: "LOGO?", number: "40", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE67PhoneLogoSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phonelogos-e67-thumb", easySlug: "blackberry", hardSlug: "jolla", word: "LOGO?", number: "40", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE67PhoneLogoNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "phonelogos-e67-thumb", cascade: ["blackberry", "htc", "philips", "?"], line1: "CAN YOU NAME ALL", word: "LOGOS?", number: "40", badge: "Only 1% get 100%" }} />
      <Composition id="E68NokiaQuiz" component={QuizV2} durationInFrames={quizFrames(E68_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E68_INFOCFG }} />
      <Composition id="ThumbE68Nokia" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nokia-e68-thumb", grid: ["nokia-lumia-920", "nokia-8210", "nokia-6310", "?", "nokia-8850", "nokia-3510", "nokia-8800", "nokia-e63", "nokia-6100"], line1: "CAN YOU NAME ALL", word: "NOKIA PHONES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE68NokiaHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nokia-e68-thumb", heroSlug: "nokia-8210", line1: "GUESS THE", word: "NOKIA?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE68NokiaSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nokia-e68-thumb", easySlug: "nokia-8210", hardSlug: "nokia-9110-communicator", word: "NOKIA?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE68NokiaNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "nokia-e68-thumb", cascade: ["nokia-lumia-920", "nokia-8210", "nokia-6310", "?"], line1: "CAN YOU NAME ALL", word: "NOKIA PHONES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E69SupercarQuiz" component={QuizV2} durationInFrames={quizFrames(E69_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E69_INFOCFG }} />
      <Composition id="ThumbE69Supercar" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "supercars-e69-thumb", grid: ["bugatti-veyron", "lamborghini-aventador", "ferrari-laferrari", "?", "mclaren-p1", "nissan-gt-r", "porsche-918-spyder", "ford-gt", "ferrari-f40"], line1: "CAN YOU NAME ALL", word: "SUPERCARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE69SupercarHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "supercars-e69-thumb", heroSlug: "bugatti-chiron", line1: "GUESS THE", word: "SUPERCAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE69SupercarSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "supercars-e69-thumb", easySlug: "bugatti-chiron", hardSlug: "vector-w8", word: "SUPERCAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE69SupercarNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "supercars-e69-thumb", cascade: ["bugatti-veyron", "lamborghini-aventador", "ferrari-laferrari", "?"], line1: "CAN YOU NAME ALL", word: "SUPERCARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E70EvCarQuiz" component={QuizV2} durationInFrames={quizFrames(E70_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E70_INFOCFG }} />
      <Composition id="ThumbE70EvCar" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "evcars-e70-thumb", grid: ["tesla-model-3", "tesla-model-s", "tesla-cybertruck", "?", "nissan-leaf", "porsche-taycan", "rivian-r1t", "ford-mustang-mach-e", "tesla-model-x"], line1: "CAN YOU NAME ALL", word: "ELECTRIC CARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE70EvCarHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "evcars-e70-thumb", heroSlug: "tesla-cybertruck", line1: "GUESS THE", word: "ELECTRIC CAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE70EvCarSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "evcars-e70-thumb", easySlug: "tesla-cybertruck", hardSlug: "aptera", word: "ELECTRIC CAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE70EvCarNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "evcars-e70-thumb", cascade: ["tesla-model-3", "tesla-model-s", "tesla-cybertruck", "?"], line1: "CAN YOU NAME ALL", word: "ELECTRIC CARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E71PickupQuiz" component={QuizV2} durationInFrames={quizFrames(E71_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E71_INFOCFG }} />
      <Composition id="ThumbE71Pickup" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "pickups-e71-thumb", grid: ["ford-f-150", "chevrolet-silverado", "ram-1500", "?", "toyota-tacoma", "toyota-hilux", "nissan-titan", "jeep-gladiator", "ford-ranger"], line1: "CAN YOU NAME ALL", word: "PICKUP TRUCKS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE71PickupHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "pickups-e71-thumb", heroSlug: "ford-f-150", line1: "GUESS THE", word: "PICKUP?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE71PickupSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "pickups-e71-thumb", easySlug: "ford-f-150", hardSlug: "piaggio-porter", word: "PICKUP?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE71PickupNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "pickups-e71-thumb", cascade: ["ford-f-150", "chevrolet-silverado", "ram-1500", "?"], line1: "CAN YOU NAME ALL", word: "PICKUP TRUCKS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E72SuvQuiz" component={QuizV2} durationInFrames={quizFrames(E72_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E72_INFOCFG }} />
      <Composition id="ThumbE72Suv" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "suvs-e72-thumb", grid: ["toyota-rav4", "honda-cr-v", "ford-explorer", "?", "chevrolet-tahoe", "jeep-grand-cherokee", "toyota-4runner", "nissan-rogue", "honda-pilot"], line1: "CAN YOU NAME ALL", word: "SUVS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE72SuvHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "suvs-e72-thumb", heroSlug: "toyota-rav4", line1: "GUESS THE", word: "SUV?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE72SuvSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "suvs-e72-thumb", easySlug: "toyota-rav4", hardSlug: "suzuki-jimny", word: "SUV?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE72SuvNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "suvs-e72-thumb", cascade: ["toyota-rav4", "honda-cr-v", "ford-explorer", "?"], line1: "CAN YOU NAME ALL", word: "SUVS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E73JdmQuiz" component={QuizV2} durationInFrames={quizFrames(E73_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E73_INFOCFG }} />
      <Composition id="ThumbE73Jdm" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "jdm-e73-thumb", grid: ["mazda-rx7-fd", "nissan-350z", "nissan-silvia-s15", "?", "toyota-gr-supra", "nissan-skyline-gtr-r32", "honda-s2000", "toyota-mr2", "mazda-rx8"], line1: "CAN YOU NAME ALL", word: "JDM CARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE73JdmHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "jdm-e73-thumb", heroSlug: "toyota-gr-supra", line1: "GUESS THE", word: "JDM CAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE73JdmSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "jdm-e73-thumb", easySlug: "mazda-rx7-fd", hardSlug: "datsun-fairlady-sr311", word: "JDM CAR?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE73JdmNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "jdm-e73-thumb", cascade: ["mazda-rx7-fd", "nissan-350z", "toyota-gr-supra", "?"], line1: "CAN YOU NAME ALL", word: "JDM CARS?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E74VegetableQuiz" component={QuizV2} durationInFrames={quizFrames(E74_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E74_INFOCFG }} />
      <Composition id="ThumbE74Veg" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "veg-e74-thumb", grid: ["potato", "tomato", "carrot", "?", "broccoli", "onion", "cucumber", "corn", "cabbage"], line1: "CAN YOU NAME ALL", word: "VEGETABLES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE74VegHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "veg-e74-thumb", heroSlug: "potato", line1: "GUESS THE", word: "VEGETABLE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE74VegSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "veg-e74-thumb", easySlug: "potato", hardSlug: "turmeric", word: "VEGETABLE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE74VegNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "veg-e74-thumb", cascade: ["potato", "tomato", "carrot", "?"], line1: "CAN YOU NAME ALL", word: "VEGETABLES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="E75MotorcycleQuiz" component={QuizV2} durationInFrames={quizFrames(E75_INFOCFG)} fps={30} width={1920} height={1080} defaultProps={{ config: E75_INFOCFG }} />
      <Composition id="ThumbE75Moto" component={GsThumbV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moto-e75-thumb", grid: ["harley-davidson-fat-boy", "vespa", "ducati-panigale", "?", "kawasaki-ninja", "triumph-bonneville", "suzuki-hayabusa", "honda-gold-wing", "ducati-monster"], line1: "CAN YOU NAME ALL", word: "MOTORCYCLES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE75MotoHero" component={GsThumbHeroV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moto-e75-thumb", heroSlug: "kawasaki-ninja", line1: "GUESS THE", word: "MOTORCYCLE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE75MotoSplit" component={GsThumbSplitV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moto-e75-thumb", easySlug: "kawasaki-ninja", hardSlug: "voxan-wattman", word: "MOTORCYCLE?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbE75MotoNumber" component={GsThumbNumberV2} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "moto-e75-thumb", cascade: ["kawasaki-ninja", "harley-davidson-fat-boy", "ducati-panigale", "?"], line1: "CAN YOU NAME ALL", word: "MOTORCYCLES?", number: "70", badge: "Only 1% get 100%" }} />
      <Composition id="ThumbLogosV4" component={GsThumbV4} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "logos", word: "LOGO?", wordImg: "brand/word3d-logo.png", grid: ["apple", "nike", "?", "mcdonalds", "?", "cocacola", "?", "netflix", "spotify"] }} />
      <Composition id="ThumbSnakesV4" component={GsThumbV4} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ mode: "snakes", word: "SNAKE?", wordImg: "brand/word3d-snake.png", grid: ["king-cobra", "green-tree-python", "?", "gaboon-viper", "?", "corn-snake", "?", "eyelash-viper", "eastern-coral-snake"] }} />
      {/* ── الشورتس العمودية (1080×1920) — 5 شورتات لكل حلقة (part 0..4، بلا تكرار) ── */}
      {[
        { ep: "E01", items: LOGOS, mode: "logos", title: "Guess the Logo", v2: true },
        { ep: "E02", items: FLAGS, mode: "flags", title: "Guess the Flag", v2: true },
        { ep: "E03", items: ANIMALS, mode: "animals", title: "Guess the Animal", v2: true },
        { ep: "E04", items: CAPITALS, mode: "countries", title: "Guess the Country" },
        { ep: "E05", items: LOGOS2, mode: "logos", title: "Guess the Logo 2", v2: true },
        { ep: "E06", items: FLAGS2, mode: "flags", title: "Guess the Flag 2" },
        { ep: "E07", items: CAPITALS2, mode: "capitals", title: "Guess the Capital 2" },
        { ep: "E08", items: LOGOS3, mode: "logos", title: "Guess the Logo 3", v2: true },
        { ep: "E09", items: SHAPES1, mode: "shapes", title: "Guess the Country" },
        { ep: "E10", items: LOGOS4, mode: "logos", title: "Guess the Logo 4", v2: true },
        { ep: "E11", items: CAPITALS2, mode: "countries", title: "Guess the Country 2" },
        { ep: "E12", items: SHAPES2, mode: "shapes", title: "Guess the Country", v2: true },
        { ep: "E13", items: ANIMALS, mode: "animals", title: "Guess the Animal" },
        { ep: "E14", items: FOODS, mode: "foods", title: "Guess the Food", v2: true },
        { ep: "E15", items: DOGS, mode: "dogs", title: "Guess the Dog Breed" },
        { ep: "E16", items: LANDMARKS, mode: "landmarks", title: "Guess the Country" },
        { ep: "E17", items: CARS, mode: "cars", title: "Guess the Car" },
        { ep: "E18", items: PAINTINGS, mode: "paintings", title: "Guess the Painting", v2: true },
        { ep: "E19", items: BIRDS, mode: "birds", title: "Guess the Bird" },
        { ep: "E20", items: SEA, mode: "sea", title: "Guess the Sea Creature" },
        { ep: "E21", items: FRUITS, mode: "fruits", title: "Guess the Fruit or Veg" },
        { ep: "E22", items: BUTTERFLIES, mode: "butterflies", title: "Guess the Butterfly", v2: true },
        { ep: "E23Snakes", items: SNAKES, mode: "snakes", title: "Guess the Snake", v2: true },
        { ep: "E01Animals", items: ANIMALS_E01, mode: "animals-e01", title: "Guess the Animal", v2: true },
        { ep: "E02Flags", items: FLAGS_E02, mode: "flags", title: "Guess the Flag", v2: true },
        { ep: "E03Logos", items: LOGOS_E03, mode: "logos-e03", title: "Guess the Logo", v2: true },
        { ep: "E04Food", items: FOODS_E04, mode: "foods-e04", title: "Guess the Food", v2: true },
        { ep: "E52", items: ELEMENTS_E52, mode: "elements-e52", title: "Guess the Chemical Element", v2: true },
        { ep: "E53", items: CLASSIC_CARS_E53, mode: "classic-cars-e53", title: "Guess the Classic Car", v2: true },
        { ep: "E54", items: TROPHIES_E54, mode: "trophies-e54", title: "Guess the Sports Trophy", v2: true },
        { ep: "E55", items: STADIUMS_E55, mode: "stadiums-e55", title: "Guess the Stadium", v2: true },
        { ep: "E56", items: CAT_BREEDS_E56, mode: "catbreeds-e56", title: "Guess the Cat Breed", v2: true },
        { ep: "E57", items: NATIONAL_PARKS_E57, mode: "nationalparks-e57", title: "Guess the National Park", v2: true },
        { ep: "E58", items: SKYSCRAPERS_E58, mode: "skyscrapers-e58", title: "Guess the Skyscraper", v2: true },
        { ep: "E59", items: PALACES_E59, mode: "palaces-e59", title: "Guess the Palace", v2: true },
        { ep: "E60", items: CATHEDRALS_E60, mode: "cathedrals-e60", title: "Guess the Cathedral", v2: true },
        { ep: "E61", items: MOSQUES_E61, mode: "mosques-e61", title: "Guess the Mosque", v2: true },
        { ep: "E62", items: LIGHTHOUSES_E62, mode: "lighthouses-e62", title: "Guess the Lighthouse", v2: true },
        { ep: "E63", items: CAPITALS_E63, mode: "capitals-e63", title: "Guess the Country", v2: true },
        { ep: "E64", items: CAPITALS_E64, mode: "capitals-e64", title: "Guess the Capital", v2: true },
        { ep: "E65", items: PHONES_E65, mode: "phones-e65", title: "Guess the Phone", v2: true },
        { ep: "E66", items: APPLE_E66, mode: "apple-e66", title: "Guess the Apple Device", v2: true },
        { ep: "E67", items: PHONE_LOGOS_E67, mode: "phonelogos-e67", title: "Guess the Phone Brand Logo", v2: true },
        { ep: "E68", items: NOKIA_E68, mode: "nokia-e68", title: "Guess the Nokia Phone", v2: true },
        { ep: "E69", items: SUPERCARS_E69, mode: "supercars-e69", title: "Guess the Supercar", v2: true },
        { ep: "E70", items: EVCARS_E70, mode: "evcars-e70", title: "Guess the Electric Car", v2: true },
        { ep: "E71", items: PICKUPS_E71, mode: "pickups-e71", title: "Guess the Pickup Truck", v2: true },
        { ep: "E72", items: SUVS_E72, mode: "suvs-e72", title: "Guess the SUV", v2: true },
        { ep: "E73", items: JDM_CARS_E73, mode: "jdm-e73", title: "Guess the JDM Car", v2: true },
        { ep: "E74", items: VEGETABLES_E74, mode: "veg-e74", title: "Guess the Vegetable", v2: true },
        { ep: "E75", items: MOTORCYCLES_E75, mode: "moto-e75", title: "Guess the Motorcycle", v2: true },
      ].flatMap((e) =>
        [0, 1, 2, 3, 4].map((part) => (
          <Composition key={`${e.ep}-${part}`} id={`Short-${e.ep}-${part + 1}`} component={e.v2 ? ShortV2Quiz : ShortQuiz} durationInFrames={e.v2 ? SHORTV2_FRAMES : SHORT_FRAMES} fps={30} width={1080} height={1920} defaultProps={{ items: e.items, mode: e.mode, title: e.title, part }} />
        ))
      )}
      <Composition id="CapitalQuizGS" component={CapitalQuizGS} durationInFrames={CAPITAL_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="CountryQuizGS" component={CountryQuizGS} durationInFrames={COUNTRY_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ProfileLogo" component={ProfileLogo} durationInFrames={1} fps={30} width={800} height={800} />
      <Composition id="Banner" component={Banner} durationInFrames={1} fps={30} width={2048} height={1152} />
      <Composition id="LogoLockup" component={LogoLockupImg} durationInFrames={1} fps={30} width={1500} height={480} />
      <Composition id="Watermark" component={Watermark} durationInFrames={1} fps={30} width={150} height={150} />
      {["signature", "midnight", "aurora", "studio", "gameshow"].map((th) => (
        <Composition key={th} id={`Theme-${th}`} component={ThemePreview} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{ theme: th }} />
      ))}
      <Composition id="PlayerQuiz" component={PlayerQuiz} durationInFrames={PLAYER_FRAMES} fps={30} width={1920} height={1080} />
      {["rays", "bokeh", "synth", "aurora"].map((bg) => (
        <Composition
          key={bg}
          id={`BgOpt-${bg}`}
          component={BgPreview}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ bg }}
        />
      ))}
      <Composition
        id="FlagQuiz"
        component={FlagQuiz}
        durationInFrames={buildTimeline(COUNTRIES).total}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ countries: COUNTRIES }}
      />
    </>
  );
};
