export type StateInfo = {
  slug: string;
  name: string;
  abbr: string;
  cities: string[];
};

export const states: StateInfo[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", cities: ["Birmingham", "Montgomery", "Mobile"] },
  { slug: "alaska", name: "Alaska", abbr: "AK", cities: ["Anchorage", "Fairbanks", "Juneau"] },
  { slug: "arizona", name: "Arizona", abbr: "AZ", cities: ["Phoenix", "Tucson", "Mesa"] },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", cities: ["Little Rock", "Fayetteville", "Fort Smith"] },
  { slug: "california", name: "California", abbr: "CA", cities: ["Los Angeles", "San Diego", "San Jose"] },
  { slug: "colorado", name: "Colorado", abbr: "CO", cities: ["Denver", "Colorado Springs", "Aurora"] },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", cities: ["Bridgeport", "New Haven", "Hartford"] },
  { slug: "delaware", name: "Delaware", abbr: "DE", cities: ["Wilmington", "Dover", "Newark"] },
  { slug: "florida", name: "Florida", abbr: "FL", cities: ["Jacksonville", "Miami", "Tampa"] },
  { slug: "georgia", name: "Georgia", abbr: "GA", cities: ["Atlanta", "Augusta", "Savannah"] },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", cities: ["Honolulu", "Hilo", "Kailua"] },
  { slug: "idaho", name: "Idaho", abbr: "ID", cities: ["Boise", "Meridian", "Nampa"] },
  { slug: "illinois", name: "Illinois", abbr: "IL", cities: ["Chicago", "Aurora", "Naperville"] },
  { slug: "indiana", name: "Indiana", abbr: "IN", cities: ["Indianapolis", "Fort Wayne", "Evansville"] },
  { slug: "iowa", name: "Iowa", abbr: "IA", cities: ["Des Moines", "Cedar Rapids", "Davenport"] },
  { slug: "kansas", name: "Kansas", abbr: "KS", cities: ["Wichita", "Overland Park", "Kansas City"] },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", cities: ["Louisville", "Lexington", "Bowling Green"] },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", cities: ["New Orleans", "Baton Rouge", "Shreveport"] },
  { slug: "maine", name: "Maine", abbr: "ME", cities: ["Portland", "Lewiston", "Bangor"] },
  { slug: "maryland", name: "Maryland", abbr: "MD", cities: ["Baltimore", "Columbia", "Germantown"] },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", cities: ["Boston", "Worcester", "Springfield"] },
  { slug: "michigan", name: "Michigan", abbr: "MI", cities: ["Detroit", "Grand Rapids", "Warren"] },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", cities: ["Minneapolis", "Saint Paul", "Rochester"] },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", cities: ["Jackson", "Gulfport", "Southaven"] },
  { slug: "missouri", name: "Missouri", abbr: "MO", cities: ["Kansas City", "Saint Louis", "Springfield"] },
  { slug: "montana", name: "Montana", abbr: "MT", cities: ["Billings", "Missoula", "Bozeman"] },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", cities: ["Omaha", "Lincoln", "Bellevue"] },
  { slug: "nevada", name: "Nevada", abbr: "NV", cities: ["Las Vegas", "Henderson", "Reno"] },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", cities: ["Manchester", "Nashua", "Concord"] },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", cities: ["Newark", "Jersey City", "Paterson"] },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", cities: ["Albuquerque", "Las Cruces", "Santa Fe"] },
  { slug: "new-york", name: "New York", abbr: "NY", cities: ["New York City", "Buffalo", "Rochester"] },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", cities: ["Charlotte", "Raleigh", "Greensboro"] },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", cities: ["Fargo", "Bismarck", "Grand Forks"] },
  { slug: "ohio", name: "Ohio", abbr: "OH", cities: ["Columbus", "Cleveland", "Cincinnati"] },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", cities: ["Oklahoma City", "Tulsa", "Norman"] },
  { slug: "oregon", name: "Oregon", abbr: "OR", cities: ["Portland", "Salem", "Eugene"] },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", cities: ["Philadelphia", "Pittsburgh", "Allentown"] },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", cities: ["Providence", "Cranston", "Warwick"] },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", cities: ["Charleston", "Columbia", "Greenville"] },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", cities: ["Sioux Falls", "Rapid City", "Aberdeen"] },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", cities: ["Nashville", "Memphis", "Knoxville"] },
  { slug: "texas", name: "Texas", abbr: "TX", cities: ["Houston", "San Antonio", "Dallas"] },
  { slug: "utah", name: "Utah", abbr: "UT", cities: ["Salt Lake City", "West Valley City", "Provo"] },
  { slug: "vermont", name: "Vermont", abbr: "VT", cities: ["Burlington", "Essex", "Rutland"] },
  { slug: "virginia", name: "Virginia", abbr: "VA", cities: ["Virginia Beach", "Richmond", "Norfolk"] },
  { slug: "washington", name: "Washington", abbr: "WA", cities: ["Seattle", "Spokane", "Tacoma"] },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", cities: ["Charleston", "Huntington", "Morgantown"] },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", cities: ["Milwaukee", "Madison", "Green Bay"] },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", cities: ["Cheyenne", "Casper", "Laramie"] },
];

export const featuredStates = [
  "florida",
  "texas",
  "georgia",
  "north-carolina",
  "arizona",
  "tennessee",
  "ohio",
  "pennsylvania",
].map((slug) => states.find((s) => s.slug === slug)!);

export function getState(slug: string) {
  return states.find((s) => s.slug === slug);
}

/** US states + DC for the survey state dropdown. */
export const stateOptions = states.map((s) => ({ value: s.abbr, label: s.name }));
