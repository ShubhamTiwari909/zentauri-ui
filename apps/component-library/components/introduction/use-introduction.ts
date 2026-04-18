import { componentsData } from "./data";
import { hooksData } from "./hooks-data";

export function useIntroduction() {
  return {
    components: componentsData,
    hooks: hooksData,
  };
}
