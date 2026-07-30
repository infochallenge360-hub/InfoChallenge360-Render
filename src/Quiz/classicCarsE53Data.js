// E53 "Guess the Classic Car" — answer = the car MODEL's name, image = a real photo of the car itself
// (side or 3/4 angle preferred, showing the distinctive silhouette). This is NOT the E07 "Car Logos"
// episode — brand badges/logos are deliberately excluded; every item here is a specific named car
// MODEL, spanning roughly a century (1908 Ford Model T through modern JDM/EV-era cars), mixing iconic
// mass-market models with famous sports/exotic cars.
//
// Item count: 74 (19/19/18/18) — inside the 65-78 target band, deliberately not 71 (per
// feedback_vary_item_count_per_episode) and different from E51's 72.
//
// Calibrated by absolute global recognizability of the MODEL'S SILHOUETTE/DESIGN as photographed
// (quiz-difficulty-calibration), not by brand fame or sales figures. This matters: the Toyota Corolla
// and Honda Civic are the best-selling cars in history, but their generic sedan/hatchback shapes are
// not instantly identifiable by a random global viewer the way an unmistakable silhouette (Beetle,
// Mini, Mustang, DeLorean) is — so they sit in "medium" despite outselling everything in "easy".
// Conversely the Ferrari 250 GTO is world-famous as the most expensive car ever auctioned, but its
// 1962 GT body shape is less universally recognizable on sight than a Countach or Testarossa wedge, so
// it lands in "medium" too. Easy (~70-95%): Beetle, Mini, Mustang, DeLorean, Fiat 500, VW Bus, 2CV —
// silhouettes burned into global pop culture (movies, toys, ads). Impossible (<10%, aimed <3%):
// genuinely obscure Eastern Bloc/microcar/kei-car models (Trabant, Wartburg, Tatra 77, Škoda 1000 MB,
// Daihatsu Midget, Panhard Dyna Z) that only car enthusiasts or collectors would recognize.
//
// Sourcing: Wikipedia pageimages API (piprop=thumbnail&pithumbsize=1200, real User-Agent, sequential
// requests) as primary source — car-model articles are extremely well-photographed on Wikipedia/
// Commons (heavy car-enthusiast contribution), mostly CC-BY-SA with some PD. Wikimedia Commons
// generator=search used as fallback whenever an article's lead image was a logo/engine/interior shot
// instead of the car's exterior. See out/e53-classic-cars-fetch-report.json for the exact
// source/license/attribution recorded per item.
//
// Generation care: where a nameplate has been reused across very different-looking generations (Ford
// Mustang, Corvette, Corolla, Camaro, Charger, Fiat 500, Fiat Panda, Range Rover, Supra, Skyline GT-R),
// the specific classic/iconic generation intended is noted in the wiki title/fetch target so the photo
// matches the generation implied by the name, not a mismatched modern reissue.
//
// coldSlug (last item, most obscure): "panhard-dyna-z" — a real 1950s French aerodynamic sedan that
// virtually nobody outside French car history circles has ever heard of or seen.
export const CLASSIC_CARS_E53 = [
  // EASY (19) — ~70-95% globally recognizable silhouette
  { slug: "volkswagen-beetle", name: "Volkswagen Beetle", level: "easy" },
  { slug: "mini-cooper", name: "Mini Cooper (Classic Mini)", level: "easy" },
  { slug: "ford-mustang", name: "Ford Mustang", level: "easy" },
  { slug: "delorean-dmc-12", name: "DeLorean DMC-12", level: "easy" },
  { slug: "volkswagen-bus", name: "Volkswagen Type 2 (Microbus)", level: "easy" },
  { slug: "fiat-500-classic", name: "Fiat 500 (Classic)", level: "easy" },
  { slug: "porsche-911", name: "Porsche 911", level: "easy" },
  { slug: "chevrolet-corvette", name: "Chevrolet Corvette", level: "easy" },
  { slug: "jeep-wrangler", name: "Jeep Wrangler", level: "easy" },
  { slug: "citroen-2cv", name: "Citroën 2CV", level: "easy" },
  { slug: "land-rover-defender", name: "Land Rover Defender", level: "easy" },
  { slug: "rolls-royce-silver-shadow", name: "Rolls-Royce Silver Shadow", level: "easy" },
  { slug: "lamborghini-countach", name: "Lamborghini Countach", level: "easy" },
  { slug: "ferrari-testarossa", name: "Ferrari Testarossa", level: "easy" },
  { slug: "cadillac-eldorado", name: "Cadillac Eldorado", level: "easy" },
  { slug: "smart-fortwo", name: "Smart Fortwo", level: "easy" },
  { slug: "ford-model-t", name: "Ford Model T", level: "easy" },
  { slug: "volkswagen-golf", name: "Volkswagen Golf", level: "easy" },
  { slug: "austin-fx4-london-taxi", name: "Austin FX4 (London Taxi)", level: "easy" },

  // MEDIUM (19) — ~35-70%, most people have seen it
  { slug: "toyota-corolla", name: "Toyota Corolla", level: "medium" },
  { slug: "honda-civic", name: "Honda Civic", level: "medium" },
  { slug: "chevrolet-camaro", name: "Chevrolet Camaro", level: "medium" },
  { slug: "dodge-charger", name: "Dodge Charger", level: "medium" },
  { slug: "ferrari-250-gto", name: "Ferrari 250 GTO", level: "medium" },
  { slug: "nissan-skyline-gtr-r34", name: "Nissan Skyline GT-R (R34)", level: "medium" },
  { slug: "toyota-supra-a80", name: "Toyota Supra (A80)", level: "medium" },
  { slug: "mazda-mx5-miata", name: "Mazda MX-5 (Miata)", level: "medium" },
  { slug: "range-rover-classic", name: "Range Rover (Classic)", level: "medium" },
  { slug: "volvo-240", name: "Volvo 240", level: "medium" },
  { slug: "fiat-panda", name: "Fiat Panda", level: "medium" },
  { slug: "renault-4", name: "Renault 4", level: "medium" },
  { slug: "chevrolet-bel-air-1957", name: "Chevrolet Bel Air (1957)", level: "medium" },
  { slug: "hummer-h2", name: "Hummer H2", level: "medium" },
  { slug: "volkswagen-karmann-ghia", name: "Volkswagen Karmann Ghia", level: "medium" },
  { slug: "toyota-land-cruiser", name: "Toyota Land Cruiser", level: "medium" },
  { slug: "mercedes-g-class", name: "Mercedes-Benz G-Class", level: "medium" },
  { slug: "ford-focus", name: "Ford Focus", level: "medium" },
  { slug: "audi-quattro", name: "Audi Quattro", level: "medium" },

  // HARD (18) — ~10-35%, enthusiasts/collectors recognize it
  { slug: "lancia-delta-integrale", name: "Lancia Delta Integrale", level: "hard" },
  { slug: "datsun-240z", name: "Datsun 240Z", level: "hard" },
  { slug: "alfa-romeo-giulietta", name: "Alfa Romeo Giulietta", level: "hard" },
  { slug: "peugeot-205-gti", name: "Peugeot 205 GTI", level: "hard" },
  { slug: "renault-5-turbo", name: "Renault 5 Turbo", level: "hard" },
  { slug: "saab-900", name: "Saab 900", level: "hard" },
  { slug: "triumph-spitfire", name: "Triumph Spitfire", level: "hard" },
  { slug: "mgb", name: "MG B", level: "hard" },
  { slug: "opel-manta", name: "Opel Manta", level: "hard" },
  { slug: "toyota-ae86", name: "Toyota Corolla AE86 (Trueno)", level: "hard" },
  { slug: "honda-nsx", name: "Honda NSX", level: "hard" },
  { slug: "mitsubishi-lancer-evolution", name: "Mitsubishi Lancer Evolution", level: "hard" },
  { slug: "subaru-impreza-wrx-sti", name: "Subaru Impreza WRX STI", level: "hard" },
  { slug: "volkswagen-corrado", name: "Volkswagen Corrado", level: "hard" },
  { slug: "datsun-510", name: "Datsun 510", level: "hard" },
  { slug: "alpine-a110", name: "Renault Alpine A110", level: "hard" },
  { slug: "lotus-esprit", name: "Lotus Esprit", level: "hard" },
  { slug: "plymouth-superbird", name: "Plymouth Superbird", level: "hard" },

  // IMPOSSIBLE (18) — <10%, aimed <3%; genuinely obscure but real production car models
  { slug: "citroen-ds", name: "Citroën DS", level: "impossible" },
  { slug: "saab-92", name: "Saab 92", level: "impossible" },
  { slug: "trabant-601", name: "Trabant 601", level: "impossible" },
  { slug: "bristol-400", name: "Bristol 400", level: "impossible" },
  { slug: "skoda-1000mb", name: "Škoda 1000 MB", level: "impossible" },
  { slug: "tatra-77", name: "Tatra 77", level: "impossible" },
  { slug: "wartburg-353", name: "Wartburg 353", level: "impossible" },
  { slug: "reliant-robin", name: "Reliant Robin", level: "impossible" },
  { slug: "bmw-isetta", name: "BMW Isetta", level: "impossible" },
  { slug: "subaru-360", name: "Subaru 360", level: "impossible" },
  { slug: "honda-n360", name: "Honda N360", level: "impossible" },
  { slug: "daihatsu-midget", name: "Daihatsu Midget", level: "impossible" },
  { slug: "amphicar", name: "Amphicar 770", level: "impossible" },
  { slug: "messerschmitt-kr200", name: "Messerschmitt KR200", level: "impossible" },
  { slug: "fso-polonez", name: "FSO Polonez", level: "impossible" },
  { slug: "zastava-yugo", name: "Zastava Koral (Yugo)", level: "impossible" },
  { slug: "autobianchi-bianchina", name: "Autobianchi Bianchina", level: "impossible" },
  { slug: "panhard-dyna-z", name: "Panhard Dyna Z", level: "impossible" },
];
