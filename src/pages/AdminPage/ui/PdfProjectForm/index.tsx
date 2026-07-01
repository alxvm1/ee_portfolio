import { projectModel } from "@entities/Project";
import { Button, Input, Label } from "@shared/ui";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { type FC, useRef } from "react";
import { adminPageModel } from "../../model";
import "./style.css";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="pdf-form"
    >
      <div className="pdf-form__field">
        <Label htmlFor="pdf-title">Название</Label>
        <Input
          id="pdf-title"
          value={fields.title.value}
          onChange={(e) => fields.title.onChange(e.target.value)}
          placeholder="Название проекта"
        />
        {fields.title.firstError && (
          <p className="pdf-form__error">{fields.title.firstError.errorText}</p>
        )}
      </div>

      <div className="pdf-form__field">
        <Label>Обложка</Label>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            fields.thumbnailFile.onChange(e.target.files?.[0] ?? null)
          }
          className="pdf-form__file-input"
        />
        <Button
          type="button"
          variant="outline"
          className="font-gothic"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          {fields.thumbnailFile.value
            ? fields.thumbnailFile.value.name
            : "Выбрать изображение"}
        </Button>
        {fields.thumbnailFile.value && (
          <img
            src={URL.createObjectURL(fields.thumbnailFile.value)}
            alt=""
            className="pdf-form__preview"
          />
        )}
      </div>

      <div className="pdf-form__field">
        <Label>PDF для мобильной версии</Label>
        <input
          ref={mobilePdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            fields.mobilePdfFile.onChange(e.target.files?.[0] ?? null)
          }
          className="pdf-form__file-input"
        />
        <Button
          type="button"
          variant="outline"
          className="font-gothic"
          onClick={() => mobilePdfInputRef.current?.click()}
        >
          {fields.mobilePdfFile.value
            ? fields.mobilePdfFile.value.name
            : "Выбрать PDF (mobile)"}
        </Button>
      </div>

      <div className="pdf-form__field">
        <Label>PDF для десктопной версии</Label>
        <input
          ref={desktopPdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            fields.desktopPdfFile.onChange(e.target.files?.[0] ?? null)
          }
          className="pdf-form__file-input"
        />
        <Button
          type="button"
          variant="outline"
          className="font-gothic"
          onClick={() => desktopPdfInputRef.current?.click()}
        >
          {fields.desktopPdfFile.value
            ? fields.desktopPdfFile.value.name
            : "Выбрать PDF (desktop)"}
        </Button>
      </div>

      {error && <p className="pdf-form__error">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="pdf-form__submit-button"
      >
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
