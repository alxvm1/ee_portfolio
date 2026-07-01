import type { TProjectCategory } from "@/entities/Project";

export const TABS_CONFIG: { value: TProjectCategory; label: string }[] = [
  { value: "uiDesign", label: "UI/UX + Web дизайн" },
  { value: "graphicDesign", label: "Графический дизайн" },
  { value: "illustrations", label: "Иллюстрации" },
];
