import { projectModel } from "@entities/Project";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { sample } from "effector";
import { categorySelected, homePageMounted } from "./ui";

sample({
  clock: homePageMounted,
  fn: ({ initialCategory }) => ({ category: initialCategory ?? TABS_CONFIG[0].value }),
  target: projectModel.events.publicProjectsRequested,
});

sample({
  clock: categorySelected,
  fn: (category) => ({ category }),
  target: projectModel.events.publicProjectsRequested,
});
