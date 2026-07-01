import { projectModel } from "@entities/Project";
import { Button, Input, Label, Textarea } from "@shared/ui";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { type FC, useRef } from "react";
import { adminPageModel } from "../../model";

export const TextProjectForm: FC = () => {
  const { fields, submit } = useForm(adminPageModel.forms.textProjectForm);
  const [isSubmitting] = useUnit([projectModel.stores.$isFormSubmitting]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Изображения</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => fields.imageFiles.onChange(Array.from(e.target.files ?? []))}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {fields.imageFiles.value.length > 0
            ? `Выбрано файлов: ${fields.imageFiles.value.length}`
            : "Выбрать изображения"}
        </Button>
        {fields.imageFiles.value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fields.imageFiles.value.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="h-20 w-20 rounded-md object-cover"
                />
                {index === 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                    Обложка
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {fields.imageFiles.firstError && (
          <p className="text-destructive text-sm">{fields.imageFiles.firstError.errorText}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          value={fields.title.value}
          onChange={(e) => fields.title.onChange(e.target.value)}
        />
        {fields.title.firstError && (
          <p className="text-destructive text-sm">{fields.title.firstError.errorText}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={fields.description.value}
          onChange={(e) => fields.description.onChange(e.target.value)}
        />
        {fields.description.firstError && (
          <p className="text-destructive text-sm">{fields.description.firstError.errorText}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="materials">Материалы</Label>
        <Input
          id="materials"
          value={fields.materials.value}
          onChange={(e) => fields.materials.onChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="behance">Ссылка на Behance</Label>
        <Input
          id="behance"
          value={fields.behanceUrl.value}
          onChange={(e) => fields.behanceUrl.onChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dribbble">Ссылка на Dribbble</Label>
        <Input
          id="dribbble"
          value={fields.dribbbleUrl.value}
          onChange={(e) => fields.dribbbleUrl.onChange(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
