import { cn } from "@shared/lib/utils";
import { type FC, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type TPdfViewerProps = {
  fileUrl: string;
  className?: string;
};

export const PdfViewer: FC<TPdfViewerProps> = ({ fileUrl, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => setContainerWidth(node.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto flex w-full flex-col items-center gap-4",
        className,
      )}
    >
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="text-muted-foreground">Загрузка PDF...</p>}
        error={<p className="text-destructive">Не удалось загрузить PDF.</p>}
      >
        {Array.from({ length: numPages ?? 0 }, (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            width={containerWidth}
            className="overflow-hidden rounded-xl shadow-[0_0_12px_4px_rgba(0,0,0,0.12)] [&:not(:last-child)]:mb-4"
          />
        ))}
      </Document>
    </div>
  );
};
