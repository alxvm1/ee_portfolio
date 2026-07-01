import { useProjectDetail, type TProjectCategory } from "@entities/Project";
import { useEffect, useState, type FC } from "react";
import "./style.css";
import { Carousel, PdfViewer } from "@/shared/ui";

const UiDesignDetail: FC<{ mobilePdfUrl: string; desktopPdfUrl: string }> = ({
  mobilePdfUrl,
  desktopPdfUrl,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <PdfViewer fileUrl={isMobile ? mobilePdfUrl : desktopPdfUrl} />;
};

type TProjectDetailContentProps = {
  category: TProjectCategory;
  id: string;
  onBack: () => void;
  "data-square-left-corner"?: boolean;
};

export const ProjectDetailContent: FC<TProjectDetailContentProps> = ({
  category,
  id,
  onBack,
  ...props
}) => {
  const { data: project, isLoading, error } = useProjectDetail(category, id);

  return (
    <div
      className="project-detail-content"
      data-square-left-corner={props["data-square-left-corner"]}
    >
      {isLoading && <p className="text-muted-foreground">Загрузка...</p>}
      {!isLoading && error && (
        <p className="text-destructive">Не удалось загрузить проект: {error}</p>
      )}
      {!isLoading &&
        !error &&
        project &&
        (category === "uiDesign" && "mobile_pdf_url" in project ? (
          <UiDesignDetail
            mobilePdfUrl={project.mobile_pdf_url}
            desktopPdfUrl={project.desktop_pdf_url}
          />
        ) : (
          <div className="project-detail-content__body">
            {"title" in project && (
              <div className="project-detail-content__text">
                <div className="flex flex-col gap-5">
                  <h2 className="project-detail-content__title">
                    {project.title}
                  </h2>
                  <p className="project-detail-content__description">
                    {project.description}
                  </p>
                </div>

                {project.materials && (
                  <div>
                    <p className="project-detail-content__materials-title">
                      Материалы:
                    </p>
                    <p className="project-detail-content__materials-description">
                      {project.materials}
                    </p>
                  </div>
                )}

                <div className="project-detail-content__links">
                  {project.behance_url && (
                    <a
                      href={project.behance_url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-detail-content__link"
                    >
                      Behance
                    </a>
                  )}
                  {project.dribbble_url && (
                    <a
                      href={project.dribbble_url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-detail-content__link"
                    >
                      Dribbble
                    </a>
                  )}
                </div>
              </div>
            )}
            {"images" in project && project.images.length > 0 && (
              <Carousel
                images={project.images}
                className="project-detail-content__images"
              />
            )}
          </div>
        ))}
    </div>
  );
};
