import { supabase } from "@shared/lib/supabase";

const BUCKET = "project-assets";

export const uploadProjectAsset = async (
  file: File,
  folder: string,
): Promise<{ url: string | null; error: string | null }> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const path = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);

  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return { url: data.publicUrl, error: null };
};

export const uploadProjectAssets = async (
  files: File[],
  folder: string,
): Promise<{ urls: string[]; error: string | null }> => {
  const results = await Promise.all(
    files.map((file) => uploadProjectAsset(file, folder)),
  );

  const failedResult = results.find((result) => result.error);
  if (failedResult) {
    return { urls: [], error: failedResult.error };
  }

  return { urls: results.map((result) => result.url as string), error: null };
};
