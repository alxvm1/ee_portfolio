import { projectModel } from "@entities/Project";
import type { TProjectCategory } from "@entities/Project";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { createEvent, createStore, sample } from "effector";

// --- events ---

export const homePageMounted = createEvent<{ initialCategory?: TProjectCategory }>();
export const categorySelected = createEvent<TProjectCategory>();

// --- stores ---

export const $activeCategory = createStore<TProjectCategory>(
  TABS_CONFIG[0].value,
);

// --- wiring ---

// initial load
sample({
  clock: homePageMounted,
  fn: ({ initialCategory }) => ({
    category: initialCategory ?? TABS_CONFIG[0].value,
  }),
  target: projectModel.events.publicProjectsRequested,
});

sample({
  clock: homePageMounted,
  fn: ({ initialCategory }) => initialCategory ?? TABS_CONFIG[0].value,
  target: $activeCategory,
});

// tab change
sample({ clock: categorySelected, target: $activeCategory });

sample({
  clock: categorySelected,
  fn: (category) => ({ category }),
  target: projectModel.events.publicProjectsRequested,
});

// --- public model ---

export const homePageModel = {
  events: {
    homePageMounted,
    categorySelected,
  },
  stores: {
    $activeCategory,
  },
};
