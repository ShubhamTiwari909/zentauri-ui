import { homeContent } from "./data";
import { HomeData } from "./types";

export function useHome() {
  const getHomeContent = (): HomeData => {
    return homeContent;
  };

  return {
    content: getHomeContent(),
  };
}
