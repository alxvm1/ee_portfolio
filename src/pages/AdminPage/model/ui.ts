import type { TProjectCategory } from "@entities/Project";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { createEvent, createStore, sample } from "effector";

export const categoryTabClicked = createEvent<TProjectCategory>();
export const createFormOpened = createEvent();
export const createFormClosed = createEvent();
export const adminPageMounted = createEvent();

export const $activeCategory = createStore<TProjectCategory>(TABS_CONFIG[0].value);
export const $isCreating = createStore(false);

sample({ clock: categoryTabClicked, target: $activeCategory });
sample({ clock: createFormOpened, fn: () => true, target: $isCreating });
sample({ clock: createFormClosed, fn: () => false, target: $isCreating });
