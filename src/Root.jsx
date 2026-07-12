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
        { ep: "E23", items: SNAKES, mode: "snakes", title: "Guess the Snake", v2: true },
        { ep: "E01Animals", items: ANIMALS_E01, mode: "animals-e01", title: "Guess the Animal", v2: true },
        { ep: "E02Flags", items: FLAGS_E02, mode: "flags", title: "Guess the Flag", v2: true },
        { ep: "E03Logos", items: LOGOS_E03, mode: "logos-e03", title: "Guess the Logo", v2: true },
        { ep: "E04Food", items: FOODS_E04, mode: "foods-e04", title: "Guess the Food", v2: true },
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
