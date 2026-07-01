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
  pdfProjectCreateFailed,
  pdfProjectCreated,
  pdfProjectSubmitted,
  textProjectCreateFailed,
  textProjectCreated,
  textProjectSubmitted,
} from "./submit";

export type { TPdfProjectSubmitPayload, TTextProjectSubmitPayload } from "./submit";

export const projectModel = {
  events: {
    publicProjectsRequested,
    adminProjectsRequested,
    projectDetailRequested,
    projectDeleteClicked,
    projectPublishToggled,
    projectMoveClicked,
    pdfProjectSubmitted,
    textProjectSubmitted,
    pdfProjectCreated,
    textProjectCreated,
    pdfProjectCreateFailed,
    textProjectCreateFailed,
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
