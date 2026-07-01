import type { TProjectCategory } from "@entities/Project";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { createEvent, createStore, sample } from "effector";

export const homePageMounted = createEvent<{ initialCategory?: TProjectCategory }>();
export const categorySelected = createEvent<TProjectCategory>();

export const $activeCategory = createStore<TProjectCategory>(TABS_CONFIG[0].value);

// сброс к начальной категории при каждом маунте (или к переданной из URL)
sample({
  clock: homePageMounted,
  fn: ({ initialCategory }) => initialCategory ?? TABS_CONFIG[0].value,
  target: $activeCategory,
});

sample({ clock: categorySelected, target: $activeCategory });
