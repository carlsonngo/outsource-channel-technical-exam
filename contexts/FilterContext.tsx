import { createContext } from "react";

export interface FilterContext {
  s?: string;
}

export const FilterContext = createContext<FilterContext>({});
