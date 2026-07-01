import "./actions";

import { $activeCategory, categorySelected, homePageMounted } from "./ui";

export const homePageModel = {
  events: {
    homePageMounted,
    categorySelected,
  },
  stores: {
    $activeCategory,
  },
};
