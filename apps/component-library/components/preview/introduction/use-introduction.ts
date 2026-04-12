import { componentsData } from "./data";
import { ComponentHighlight } from "./types";

export function useIntroduction() {
  const getComponentsList = (): ComponentHighlight[] => {
    return componentsData;
  };

  return {
    components: getComponentsList(),
  };
}
