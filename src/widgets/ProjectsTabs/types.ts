import type { TProjectCategory } from "@entities/Project";

export type TProjectsTabsProps = {
  active: TProjectCategory;
  onChange: (value: TProjectCategory) => void;
};
