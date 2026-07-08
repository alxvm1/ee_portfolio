import "./actions";

import {
  $isAdminProjectsLoading,
  $isProjectsLoading,
  $projects,
  $projectsError,
  adminProjectsRequested,
  publicProjectsRequested,
} from "./list";
import {
  $isProjectDetailLoading,
  $projectDetail,
  $projectDetailError,
  projectDetailRequested,
} from "./detail";
import {
  $isMutating,
  projectDeleteClicked,
  projectMoveClicked,
  projectPublishToggled,
} from "./mutations";
import {
  $isFormSubmitting,
  projectCreateFailed,
  projectCreated,
  projectSubmitted,
} from "./submit";

export type { TProjectSubmitPayload } from "./submit";

export const projectModel = {
  events: {
    publicProjectsRequested,
    adminProjectsRequested,
    projectDetailRequested,
    projectDeleteClicked,
    projectPublishToggled,
    projectMoveClicked,
    projectSubmitted,
    projectCreated,
    projectCreateFailed,
  },
  stores: {
    $projects,
    $projectDetail,
    $projectsError,
    $projectDetailError,
    $isProjectsLoading,
    $isAdminProjectsLoading,
    $isProjectDetailLoading,
    $isMutating,
    $isFormSubmitting,
  },
};
