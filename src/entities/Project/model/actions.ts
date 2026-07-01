import { sample } from "effector";
import { $projects, adminProjectsRequested } from "./list";
import {
  deleteProjectFx,
  projectMoveClicked,
  updateProjectSortOrderFx,
  updateProjectStatusFx,
} from "./mutations";
import { pdfProjectCreated, textProjectCreated } from "./submit";
import type { TProjectCategory } from "../types";

// после любой мутации — рефетч списка
sample({
  clock: [deleteProjectFx.done, updateProjectStatusFx.done, updateProjectSortOrderFx.done],
  fn: ({ params }) => ({ category: params.category }),
  target: adminProjectsRequested,
});

// перемещение — вычислить пары и запустить эффект (нужен $projects из list.ts)
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

// после создания проекта — рефетч списка
sample({
  clock: pdfProjectCreated,
  fn: () => ({ category: "uiDesign" as TProjectCategory }),
  target: adminProjectsRequested,
});

sample({
  clock: textProjectCreated,
  fn: ({ category }) => ({ category }),
  target: adminProjectsRequested,
});
