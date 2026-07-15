export type Answers = {
  state: string;
  household: string;
  preexisting: string;
  timeframe: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
};

export const emptyAnswers: Answers = {
  state: "",
  household: "",
  preexisting: "",
  timeframe: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

/** Step-by-step survey options — matched to the Healthcare Savings Center flow. */
export const householdSizes = ["1 person", "2 people", "3 people", "4 or more people"];

export const timeframes = ["Immediately", "Within 30 days", "Just comparing options"];
