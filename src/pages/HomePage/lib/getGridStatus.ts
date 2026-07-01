import type { TGridStatus } from "../types";

export const getGridStatus = (
  error: string | null,
  projectsCount: number,
  isLoading: boolean,
): TGridStatus => {
  if (error) return "error";
  if (projectsCount > 0) return "hasProjects";
  if (isLoading) return "hasProjects";
  return "empty";
};
