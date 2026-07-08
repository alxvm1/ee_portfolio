import { sample } from "effector";
import { $projects, adminProjectsRequested } from "./list";
import {
  deleteProjectFx,
  projectMoveClicked,
  updateProjectSortOrderFx,
  updateProjectStatusFx,
} from "./mutations";
import { projectCreated } from "./submit";

sample({
  clock: [
    deleteProjectFx.done,
    updateProjectStatusFx.done,
    updateProjectSortOrderFx.done,
  ],
  fn: ({ params }) => ({ category: params.category }),
  target: adminProjectsRequested,
});

sample({
  clock: projectMoveClicked,
  source: $projects,
  fn: (projects, { category, index, direction }) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const current = projects[index];
    const target = projects[targetIndex];
    return {
      category,
      pairs: [
        { id: current.id, sortOrder: target.sort_order },
        { id: target.id, sortOrder: current.sort_order },
      ],
    };
  },
  target: updateProjectSortOrderFx,
});

sample({
  clock: projectCreated,
  fn: ({ category }) => ({ category }),
  target: adminProjectsRequested,
});
