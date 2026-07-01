import "./actions";

import { pdfForm, textProjectForm } from "./forms";
import {
  $activeCategory,
  $isCreating,
  adminPageMounted,
  categoryTabClicked,
  createFormClosed,
  createFormOpened,
} from "./ui";

export const adminPageModel = {
  forms: {
    pdfForm,
    textProjectForm,
  },
  events: {
    adminPageMounted,
    categoryTabClicked,
    createFormOpened,
    createFormClosed,
  },
  stores: {
    $activeCategory,
    $isCreating,
  },
};
