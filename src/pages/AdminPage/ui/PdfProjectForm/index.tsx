import { projectModel } from "@entities/Project";
import { Button, Label } from "@shared/ui";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { type FC, useRef } from "react";
import { adminPageModel } from "../../model";

export const PdfProjectForm: FC = () => {
  const { fields, submit } = useForm(adminPageModel.forms.pdfForm);
  const [isSubmitting] = useUnit([projectModel.stores.$isFormSubmitting]);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const mobilePdfInputRef = useRef<HTMLInputElement>(null);
  const desktopPdfInputRef = useRef<HTMLInputElement>(null);

  const error =
    fields.thumbnailFile.firstError?.errorText ??
    fields.mobilePdfFile.firstError?.errorText ??
    fields.desktopPdfFile.firstError?.errorText;

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Обложка</Label>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => fields.thumbnailFile.onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          {fields.thumbnailFile.value ? fields.thumbnailFile.value.name : "Выбрать изображение"}
        </Button>
        {fields.thumbnailFile.value && (
          <img
            src={URL.createObjectURL(fields.thumbnailFile.value)}
            alt=""
            className="h-24 w-24 rounded-md object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>PDF для мобильной версии</Label>
        <input
          ref={mobilePdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => fields.mobilePdfFile.onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => mobilePdfInputRef.current?.click()}
        >
          {fields.mobilePdfFile.value ? fields.mobilePdfFile.value.name : "Выбрать PDF (mobile)"}
        </Button>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>PDF для десктопной версии</Label>
        <input
          ref={desktopPdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => fields.desktopPdfFile.onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => desktopPdfInputRef.current?.click()}
        >
          {fields.desktopPdfFile.value ? fields.desktopPdfFile.value.name : "Выбрать PDF (desktop)"}
        </Button>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
