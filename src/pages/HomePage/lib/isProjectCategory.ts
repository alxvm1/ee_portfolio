import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import type { TProjectCategory } from "@entities/Project";

export const isProjectCategory = (
  value: string | null,
): value is TProjectCategory => TABS_CONFIG.some((tab) => tab.value === value);
