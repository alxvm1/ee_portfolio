import { supabase } from "@shared/lib/supabase";
import {
  CATEGORY_TABLE,
  type TAnyProject,
  type TProjectCategory,
} from "../model/types";

export const fetchPublishedProjects = async (
  category: TProjectCategory,
): Promise<{ data: TAnyProject[]; error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data as TAnyProject[]) ?? [], error: null };
};

export const fetchProjectById = async (
  category: TProjectCategory,
  id: string,
): Promise<{ data: TAnyProject | null; error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as TAnyProject, error: null };
};

export const fetchAllProjects = async (
  category: TProjectCategory,
): Promise<{ data: TAnyProject[]; error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data as TAnyProject[]) ?? [], error: null };
};

export const updateProjectSortOrder = async (
  category: TProjectCategory,
  id: string,
  sortOrder: number,
): Promise<{ error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { error } = await supabase
    .from(table)
    .update({ sort_order: sortOrder })
    .eq("id", id);

  return { error: error ? error.message : null };
};

export const createProject = async (
  category: TProjectCategory,
  payload: Record<string, unknown>,
): Promise<{ error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from(table).insert(payload as any);

  return { error: error ? error.message : null };
};

export const deleteProject = async (
  category: TProjectCategory,
  id: string,
): Promise<{ error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { error } = await supabase.from(table).delete().eq("id", id);

  return { error: error ? error.message : null };
};

export const updateProjectStatus = async (
  category: TProjectCategory,
  id: string,
  isPublished: boolean,
): Promise<{ error: string | null }> => {
  const table = CATEGORY_TABLE[category];

  const { error } = await supabase
    .from(table)
    .update({ is_published: isPublished })
    .eq("id", id);

  return { error: error ? error.message : null };
};
