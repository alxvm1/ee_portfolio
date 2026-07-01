import { createProject, uploadProjectAsset } from "@entities/Project";
import { Button, Label } from "@shared/ui";
import { type FC, type FormEvent, useRef, useState } from "react";

type TPdfProjectFormProps = {
  onCreated: () => void;
};

export const PdfProjectForm: FC<TPdfProjectFormProps> = ({ onCreated }) => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [mobilePdfFile, setMobilePdfFile] = useState<File | null>(null);
  const [desktopPdfFile, setDesktopPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const mobilePdfInputRef = useRef<HTMLInputElement>(null);
  const desktopPdfInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!thumbnailFile || !mobilePdfFile || !desktopPdfFile) {
      setError("Загрузите обложку и оба PDF-файла (мобильный и десктопный)");
      return;
    }

    setIsSubmitting(true);

    const [thumbnailResult, mobilePdfResult, desktopPdfResult] =
      await Promise.all([
        uploadProjectAsset(thumbnailFile, "uiDesign"),
        uploadProjectAsset(mobilePdfFile, "uiDesign"),
        uploadProjectAsset(desktopPdfFile, "uiDesign"),
      ]);

    const failedResult = [
      thumbnailResult,
      mobilePdfResult,
      desktopPdfResult,
    ].find((result) => result.error || !result.url);

    if (failedResult) {
      setIsSubmitting(false);
      setError(failedResult.error ?? "Не удалось загрузить файлы");
      return;
    }

    const result = await createProject("uiDesign", {
      thumbnail_url: thumbnailResult.url,
      mobile_pdf_url: mobilePdfResult.url,
      desktop_pdf_url: desktopPdfResult.url,
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setThumbnailFile(null);
    setMobilePdfFile(null);
    setDesktopPdfFile(null);
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Обложка</Label>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          {thumbnailFile ? thumbnailFile.name : "Выбрать изображение"}
        </Button>
        {thumbnailFile && (
          <img
            src={URL.createObjectURL(thumbnailFile)}
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
          onChange={(e) => setMobilePdfFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => mobilePdfInputRef.current?.click()}
        >
          {mobilePdfFile ? mobilePdfFile.name : "Выбрать PDF (mobile)"}
        </Button>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>PDF для десктопной версии</Label>
        <input
          ref={desktopPdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => setDesktopPdfFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => desktopPdfInputRef.current?.click()}
        >
          {desktopPdfFile ? desktopPdfFile.name : "Выбрать PDF (desktop)"}
        </Button>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняем..." : "Создать проект"}
      </Button>
    </form>
  );
};
