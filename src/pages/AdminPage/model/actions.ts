import type { TProjectCategory } from "@entities/Project";
import { projectModel } from "@entities/Project";
import { sample } from "effector";
import { pdfForm, textProjectForm } from "./forms";
import { $activeCategory, adminPageMounted, categoryTabClicked, createFormClosed } from "./ui";

// начальная загрузка при маунте страницы
sample({
  clock: adminPageMounted,
  source: $activeCategory,
  fn: (category) => ({ category }),
  target: projectModel.events.adminProjectsRequested,
});

// переключение вкладки: сбросить форму, закрыть панель, запросить список
sample({
  clock: categoryTabClicked,
  fn: (category) => ({ category }),
  target: [projectModel.events.adminProjectsRequested, createFormClosed],
});
sample({ clock: categoryTabClicked, target: textProjectForm.reset });

// pdfForm: submit → entity event, success → reset + закрыть, fail → ошибка в поле
sample({
  clock: pdfForm.formValidated,
  fn: ({ title, thumbnailFile, mobilePdfFile, desktopPdfFile }) => ({
    title,
    thumbnailFile: thumbnailFile as File,
    mobilePdfFile: mobilePdfFile as File,
    desktopPdfFile: desktopPdfFile as File,
  }),
  target: projectModel.events.pdfProjectSubmitted,
});
sample({
  clock: projectModel.events.pdfProjectCreated,
  target: [pdfForm.reset, createFormClosed],
});
sample({
  clock: projectModel.events.pdfProjectCreateFailed,
  fn: (errorText) => ({ rule: "server", errorText }),
  target: pdfForm.fields.thumbnailFile.addError,
});

// textProjectForm: submit + category → entity event, success → reset + закрыть, fail → ошибка в поле
sample({
  clock: textProjectForm.formValidated,
  source: $activeCategory,
  fn: (category, values) => ({
    category: category as Extract<TProjectCategory, "graphicDesign" | "illustrations">,
    title: values.title,
    description: values.description,
    materials: values.materials,
    behanceUrl: values.behanceUrl,
    dribbbleUrl: values.dribbbleUrl,
    imageFiles: values.imageFiles,
  }),
  target: projectModel.events.textProjectSubmitted,
});
sample({
  clock: projectModel.events.textProjectCreated,
  target: [textProjectForm.reset, createFormClosed],
});
sample({
  clock: projectModel.events.textProjectCreateFailed,
  fn: (errorText) => ({ rule: "server", errorText }),
  target: textProjectForm.fields.imageFiles.addError,
});
