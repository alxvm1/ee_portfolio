import { useCallback, useEffect, useState } from "react";
import {
  deleteProject,
  fetchAllProjects,
  updateProjectSortOrder,
  updateProjectStatus,
} from "../api/projectsApi";
import type { TAnyProject, TProjectCategory } from "../model/types";

export const useAdminProjectsList = (category: TProjectCategory) => {
  const [data, setData] = useState<TAnyProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchAllProjects(category).then((result) => {
      if (!isMounted) return;
      setData(result.data);
      setError(result.error);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [category]);

  useEffect(() => load(), [load]);

  const moveProject = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.length) return;

    const current = data[index];
    const target = data[targetIndex];

    const [{ error: error1 }, { error: error2 }] = await Promise.all([
      updateProjectSortOrder(category, current.id, target.sort_order),
      updateProjectSortOrder(category, target.id, current.sort_order),
    ]);

    if (error1 || error2) {
      setError(error1 ?? error2);
      return;
    }

    load();
  };

  const deleteProjectItem = async (id: string) => {
    const result = await deleteProject(category, id);

    if (result.error) {
      setError(result.error);
      return;
    }

    load();
  };

  const togglePublish = async (id: string, currentValue: boolean) => {
    const result = await updateProjectStatus(category, id, !currentValue);

    if (result.error) {
      setError(result.error);
      return;
    }

    load();
  };

  return {
    data,
    isLoading,
    error,
    moveProject,
    deleteProjectItem,
    togglePublish,
    refetch: load,
  };
};
