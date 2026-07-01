import { createForm } from "effector-forms";

export const pdfForm = createForm({
  fields: {
    thumbnailFile: {
      init: null as File | null,
      rules: [
        {
          name: "required",
          validator: (v: File | null) => v !== null,
          errorText:
            "Загрузите обложку и оба PDF-файла (мобильный и десктопный)",
        },
      ],
    },
    title: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (v: string) => Boolean(v),
          errorText: "Название не может быть пустым",
        },
      ],
    },
    mobilePdfFile: {
      init: null as File | null,
      rules: [
        {
          name: "required",
          validator: (v: File | null) => v !== null,
          errorText:
            "Загрузите обложку и оба PDF-файла (мобильный и десктопный)",
        },
      ],
    },
    desktopPdfFile: {
      init: null as File | null,
      rules: [
        {
          name: "required",
          validator: (v: File | null) => v !== null,
          errorText:
            "Загрузите обложку и оба PDF-файла (мобильный и десктопный)",
        },
      ],
    },
  },
  validateOn: ["submit"],
});

export const textProjectForm = createForm({
  fields: {
    title: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (v: string) => Boolean(v),
          errorText: "Введите название",
        },
      ],
    },
    description: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (v: string) => Boolean(v),
          errorText: "Введите описание",
        },
      ],
    },
    materials: { init: "" },
    behanceUrl: { init: "" },
    dribbbleUrl: { init: "" },
    imageFiles: {
      init: [] as File[],
      rules: [
        {
          name: "required",
          validator: (v: File[]) => v.length > 0,
          errorText:
            "Выберите хотя бы одно изображение — первое станет обложкой",
        },
      ],
    },
  },
  validateOn: ["submit"],
});
