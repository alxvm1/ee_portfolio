import { createEffect, createEvent, createStore, sample } from "effector";
import { deleteProject, updateProjectSortOrder, updateProjectStatus } from "../api/projectsApi";
import type { TProjectCategory } from "../types";

export const deleteProjectFx = createEffect<
  { category: TProjectCategory; id: string },
  void,
  string
>(async ({ category, id }) => {
  const { error } = await deleteProject(category, id);
  if (error) throw error;
});

export const updateProjectStatusFx = createEffect<
  { category: TProjectCategory; id: string; isPublished: boolean },
  void,
  string
>(async ({ category, id, isPublished }) => {
  const { error } = await updateProjectStatus(category, id, isPublished);
  if (error) throw error;
});

export const updateProjectSortOrderFx = createEffect<
  { category: TProjectCategory; pairs: Array<{ id: string; sortOrder: number }> },
  void,
  string
>(async ({ category, pairs }) => {
  const { error: err } = await Promise.all(
    pairs.map(({ id, sortOrder }) => updateProjectSortOrder(category, id, sortOrder)),
  ).then((results) => results.find((r) => r.error) ?? { error: null });
  if (err) throw err;
});

export const projectDeleteClicked = createEvent<{ category: TProjectCategory; id: string }>();
export const projectPublishToggled = createEvent<{
  category: TProjectCategory;
  id: string;
  isPublished: boolean;
}>();
export const projectMoveClicked = createEvent<{
  category: TProjectCategory;
  index: number;
  direction: "up" | "down";
}>();

export const $isMutating = createStore(false)
  .on([deleteProjectFx, updateProjectStatusFx, updateProjectSortOrderFx], () => true)
  .on(
    [deleteProjectFx.finally, updateProjectStatusFx.finally, updateProjectSortOrderFx.finally],
    () => false,
  );

sample({ clock: projectDeleteClicked, target: deleteProjectFx });
sample({ clock: projectPublishToggled, target: updateProjectStatusFx });
// projectMoveClicked → updateProjectSortOrderFx вынесен в actions.ts (нужен $projects из list.ts)
