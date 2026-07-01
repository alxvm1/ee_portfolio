import { createEffect, createEvent, createStore, sample } from "effector";
import { fetchAllProjects, fetchPublishedProjects } from "../api/projectsApi";
import type { TAnyProject, TProjectCategory } from "../types";

const fetchPublishedProjectsFx = createEffect<
  { category: TProjectCategory },
  TAnyProject[],
  string
>(async ({ category }) => {
  const { data, error } = await fetchPublishedProjects(category);
  if (error) throw error;
  return data;
});

export const fetchAllProjectsFx = createEffect<
  { category: TProjectCategory },
  TAnyProject[],
  string
>(async ({ category }) => {
  const { data, error } = await fetchAllProjects(category);
  if (error) throw error;
  return data;
});

export const publicProjectsRequested = createEvent<{ category: TProjectCategory }>();
export const adminProjectsRequested = createEvent<{ category: TProjectCategory }>();

export const $projects = createStore<TAnyProject[]>([]);
export const $projectsError = createStore<string | null>(null);
export const $isProjectsLoading = fetchPublishedProjectsFx.pending;
export const $isAdminProjectsLoading = fetchAllProjectsFx.pending;

sample({ clock: publicProjectsRequested, target: fetchPublishedProjectsFx });
sample({ clock: fetchPublishedProjectsFx.doneData, target: $projects });
sample({ clock: fetchPublishedProjectsFx.failData, target: $projectsError });

sample({ clock: adminProjectsRequested, target: fetchAllProjectsFx });
sample({ clock: fetchAllProjectsFx.doneData, target: $projects });
sample({ clock: fetchAllProjectsFx.failData, target: $projectsError });
