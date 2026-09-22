export type SymbolSearchID =
    | "stocks"
    | "funds"
    | "futures"
    | "forex"
    | "index"
    | "bond"
    | "economic"
    | "options";

export const symbolSearchTypes = [
    { id: "stocks", dataType: "stock" },
    { id: "funds", dataType: "fund" },
    { id: "futures", dataType: "futures" },
    { id: "forex", dataType: "forex" },
    { id: "index", dataType: "index" },
    { id: "bond", dataType: "bond" },
    { id: "economic", dataType: "economic" },
    { id: "options", dataType: "option" },
] as const;
