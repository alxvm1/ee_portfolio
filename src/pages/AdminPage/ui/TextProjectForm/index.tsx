import { createProject, uploadProjectAssets } from "@entities/Project";
import type { TProjectCategory } from "@entities/Project";
import { Button, Input, Label, Textarea } from "@shared/ui";
import { type FC, type FormEvent, useRef, useState } from "react";

type TTextProjectFormProps = {
  category: Extract<TProjectCategory, "graphicDesign" | "illustrations">;
  onCreated: () => void;
};

export const TextProjectForm: FC<TTextProjectFormProps> = ({
  category,
  onCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [behanceUrl, setBehanceUrl] = useState("");
  const [dribbbleUrl, setDribbbleUrl] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (imageFiles.length === 0) {
      setError("Выберите хотя бы одно изображение — первое станет обложкой");
      return;
    }

    setIsSubmitting(true);

    const uploadResult = await uploadProjectAssets(imageFiles, category);

    if (uploadResult.error || uploadResult.urls.length === 0) {
      setIsSubmitting(false);
      setError(uploadResult.error ?? "Не удалось загрузить изображения");
      return;
    }

    const [thumbnailUrl, ...restUrls] = uploadResult.urls;

    const result = await createProject(category, {
      title,
      description,
      materials: materials || null,
      behance_url: behanceUrl || null,
      dribbble_url: dribbbleUrl || null,
      thumbnail_url: thumbnailUrl,
      images: [thumbnailUrl, ...restUrls],
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setTitle("");
    setDescription("");
    setMaterials("");
    setBehanceUrl("");
    setDribbbleUrl("");
    setImageFiles([]);
    onCreated();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="images">Изображения</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {imageFiles.length > 0
            ? `Выбрано файлов: ${imageFiles.length}`
            : "Выбрать изображения"}
        </Button>
        {imageFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((file, index) => (
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
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="materials">Материалы</Label>
        <Input
          id="materials"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="behance">Ссылка на Behance</Label>
        <Input
          id="behance"
          value={behanceUrl}
          onChange={(e) => setBehanceUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dribbble">Ссылка на Dribbble</Label>
        <Input
          id="dribbble"
          value={dribbbleUrl}
          onChange={(e) => setDribbbleUrl(e.target.value)}
        />
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
