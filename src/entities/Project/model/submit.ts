import { createEffect, createEvent, createStore, sample } from "effector";
import { createProject } from "../api/projectsApi";
import { uploadProjectAsset, uploadProjectAssets } from "../api/storageApi";
import type { TProjectCategory } from "../types";

export type TPdfProjectSubmitPayload = {
  title: string;
  thumbnailFile: File;
  mobilePdfFile: File;
  desktopPdfFile: File;
};

export type TTextProjectSubmitPayload = {
  category: Extract<TProjectCategory, "graphicDesign" | "illustrations">;
  title: string;
  description: string;
  materials: string;
  behanceUrl: string;
  dribbbleUrl: string;
  imageFiles: File[];
};

const submitPdfProjectFx = createEffect<TPdfProjectSubmitPayload, void, string>(
  async ({ title, thumbnailFile, mobilePdfFile, desktopPdfFile }) => {
    const [thumbResult, mobileResult, desktopResult] = await Promise.all([
      uploadProjectAsset(thumbnailFile, "uiDesign"),
      uploadProjectAsset(mobilePdfFile, "uiDesign"),
      uploadProjectAsset(desktopPdfFile, "uiDesign"),
    ]);
    const failed = [thumbResult, mobileResult, desktopResult].find((r) => r.error || !r.url);
    if (failed) throw failed.error ?? "Не удалось загрузить файлы";
    const { error } = await createProject("uiDesign", {
      title,
      thumbnail_url: thumbResult.url,
      mobile_pdf_url: mobileResult.url,
      desktop_pdf_url: desktopResult.url,
    });
    if (error) throw error;
  },
);

const submitTextProjectFx = createEffect<TTextProjectSubmitPayload, void, string>(
  async ({ category, title, description, materials, behanceUrl, dribbbleUrl, imageFiles }) => {
    const { urls, error: uploadError } = await uploadProjectAssets(imageFiles, category);
    if (uploadError || urls.length === 0) throw uploadError ?? "Не удалось загрузить изображения";
    const [thumbnailUrl, ...restUrls] = urls;
    const { error } = await createProject(category, {
      title,
      description,
      materials: materials || null,
      behance_url: behanceUrl || null,
      dribbble_url: dribbbleUrl || null,
      thumbnail_url: thumbnailUrl,
      images: [thumbnailUrl, ...restUrls],
    });
    if (error) throw error;
  },
);

export const pdfProjectSubmitted = createEvent<TPdfProjectSubmitPayload>();
export const textProjectSubmitted = createEvent<TTextProjectSubmitPayload>();

export const pdfProjectCreated = createEvent<void>();
export const textProjectCreated = createEvent<{ category: TProjectCategory }>();
export const pdfProjectCreateFailed = createEvent<string>();
export const textProjectCreateFailed = createEvent<string>();

export const $isFormSubmitting = createStore(false)
  .on([submitPdfProjectFx, submitTextProjectFx], () => true)
  .on([submitPdfProjectFx.finally, submitTextProjectFx.finally], () => false);

sample({ clock: pdfProjectSubmitted, target: submitPdfProjectFx });
sample({ clock: textProjectSubmitted, target: submitTextProjectFx });

sample({ clock: submitPdfProjectFx.done, fn: (): void => undefined, target: pdfProjectCreated });
sample({
  clock: submitTextProjectFx.done,
  fn: ({ params }) => ({ category: params.category as TProjectCategory }),
  target: textProjectCreated,
});
sample({ clock: submitPdfProjectFx.failData, target: pdfProjectCreateFailed });
sample({ clock: submitTextProjectFx.failData, target: textProjectCreateFailed });
