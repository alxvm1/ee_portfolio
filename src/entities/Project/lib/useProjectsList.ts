import { useEffect, useState } from "react";
import { fetchPublishedProjects } from "../api/projectsApi";
import type { TAnyProject, TProjectCategory } from "../model/types";

export const useProjectsList = (category: TProjectCategory) => {
  const [data, setData] = useState<TAnyProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchPublishedProjects(category).then((result) => {
      if (!isMounted) return;
      setData(result.data);
      setError(result.error);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { data, isLoading, error };
};
