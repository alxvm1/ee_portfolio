import "./actions";

import { projectForm } from "./forms";
import {
  $activeCategory,
  $isCreating,
  adminPageMounted,
  categoryTabClicked,
  createFormClosed,
  createFormOpened,
} from "./ui";

export const adminPageModel = {
  forms: { projectForm },
  events: {
    adminPageMounted,
    categoryTabClicked,
    createFormOpened,
    createFormClosed,
  },
  stores: { $activeCategory, $isCreating },
};
