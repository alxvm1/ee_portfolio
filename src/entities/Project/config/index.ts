import type { TProjectCategory } from "../types";

export const CATEGORY_TABLE = {
  uiDesign: "ui_design_projects",
  graphicDesign: "graphic_design_projects",
  illustrations: "illustration_projects",
} as const satisfies Record<TProjectCategory, string>;
