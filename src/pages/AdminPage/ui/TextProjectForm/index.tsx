import { projectModel } from "@entities/Project";
import { Button, Input, Label, Textarea } from "@shared/ui";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { type FC, useRef } from "react";
import { adminPageModel } from "../../model";
import "./style.css";

export const TextProjectForm: FC = () => {
  const { fields, submit } = useForm(adminPageModel.forms.textProjectForm);
  const [isSubmitting] = useUnit([projectModel.stores.$isFormSubmitting]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="text-form"
    >
      <div className="text-form__field">
        <Label>Изображения</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            fields.imageFiles.onChange(Array.from(e.target.files ?? []))
          }
          className="text-form__file-input"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="font-gothic"
        >
          {fields.imageFiles.value.length > 0
            ? `Выбрано файлов: ${fields.imageFiles.value.length}`
            : "Выбрать изображения"}
        </Button>
        {fields.imageFiles.value.length > 0 && (
          <div className="text-form__previews">
            {fields.imageFiles.value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="text-form__preview-item"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="text-form__preview-img"
                />
                {index === 0 && (
                  <span className="text-form__cover-badge">Обложка</span>
                )}
              </div>
            ))}
          </div>
        )}
        {fields.imageFiles.firstError && (
          <p className="text-form__error">
            {fields.imageFiles.firstError.errorText}
          </p>
        )}
      </div>

      <div className="text-form__field">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          value={fields.title.value}
          onChange={(e) => fields.title.onChange(e.target.value)}
          placeholder="Название проекта"
        />
        {fields.title.firstError && (
          <p className="text-form__error">
            {fields.title.firstError.errorText}
          </p>
        )}
      </div>

      <div className="text-form__field">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={fields.description.value}
          onChange={(e) => fields.description.onChange(e.target.value)}
          placeholder="Описание проекта"
        />
        {fields.description.firstError && (
          <p className="text-form__error">
            {fields.description.firstError.errorText}
          </p>
        )}
      </div>

      <div className="text-form__field">
        <Label htmlFor="materials">Материалы</Label>
        <Input
          id="materials"
          value={fields.materials.value}
          onChange={(e) => fields.materials.onChange(e.target.value)}
          placeholder="Материалы проекта"
        />
      </div>

      <div className="text-form__field">
        <Label htmlFor="behance">Ссылка на Behance</Label>
        <Input
          id="behance"
          value={fields.behanceUrl.value}
          onChange={(e) => fields.behanceUrl.onChange(e.target.value)}
          placeholder="https://www.behance.net/..."
        />
      </div>

      <div className="text-form__field">
        <Label htmlFor="dribbble">Ссылка на Dribbble</Label>
        <Input
          id="dribbble"
          value={fields.dribbbleUrl.value}
          onChange={(e) => fields.dribbbleUrl.onChange(e.target.value)}
          placeholder="https://dribbble.com/..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="text-form__submit-button"
      >
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
