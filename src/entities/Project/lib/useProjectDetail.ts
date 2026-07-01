import { useEffect, useState } from "react";
import { fetchProjectById } from "../api/projectsApi";
import type { TAnyProject, TProjectCategory } from "../model/types";

export const useProjectDetail = (
  category: TProjectCategory | null,
  id: string | undefined,
) => {
  const [data, setData] = useState<TAnyProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchProjectById(category, id).then((result) => {
      if (!isMounted) return;
      setData(result.data);
      setError(result.error);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [category, id]);

  return { data, isLoading, error };
};
