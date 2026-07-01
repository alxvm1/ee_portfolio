import { createEffect, createEvent, createStore, sample } from "effector";
import { fetchProjectById } from "../api/projectsApi";
import type { TAnyProject, TProjectCategory } from "../types";

const fetchProjectDetailFx = createEffect<
  { category: TProjectCategory; id: string },
  TAnyProject,
  string
>(async ({ category, id }) => {
  const { data, error } = await fetchProjectById(category, id);
  if (error) throw error;
  return data!;
});

export const projectDetailRequested = createEvent<{ category: TProjectCategory; id: string }>();

export const $projectDetail = createStore<TAnyProject | null>(null);
export const $projectDetailError = createStore<string | null>(null);
export const $isProjectDetailLoading = fetchProjectDetailFx.pending;

sample({ clock: projectDetailRequested, target: fetchProjectDetailFx });
sample({ clock: fetchProjectDetailFx.doneData, target: $projectDetail });
sample({ clock: fetchProjectDetailFx.failData, target: $projectDetailError });
