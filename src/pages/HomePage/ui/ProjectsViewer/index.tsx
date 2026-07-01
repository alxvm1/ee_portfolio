import { useProjectsList, type TProjectCategory } from "@entities/Project";
import { ProjectsTabs, TABS_CONFIG } from "@widgets/ProjectsTabs";
import { useState, type FC } from "react";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { ProjectDetailContent } from "../ProjectDetailContent";
import "./style.css";

const isProjectCategory = (value: string | null): value is TProjectCategory =>
  TABS_CONFIG.some((tab) => tab.value === value);

export const ProjectsViewer: FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const navigate = useNavigate();

  const detailMatch = useMatch("/project/:category/:id");
  const isDetailView = Boolean(detailMatch);
  const detailCategory = detailMatch?.params.category;

  const [activeTab, setActiveTab] = useState<TProjectCategory>(
    isProjectCategory(categoryFromUrl) ? categoryFromUrl : "uiDesign",
  );

  const currentCategory: TProjectCategory =
    isDetailView && isProjectCategory(detailCategory ?? null)
      ? (detailCategory as TProjectCategory)
      : activeTab;

  const { data: projects, isLoading, error } = useProjectsList(currentCategory);
  const isFirstTabActive = currentCategory === TABS_CONFIG[0].value;

  const handleTabChange = (category: TProjectCategory) => {
    setActiveTab(category);
    if (isDetailView) {
      navigate(`/?category=${category}`);
    }
  };

  return (
    <div className="projects-viewer__wrapper">
      <ProjectsTabs active={currentCategory} onChange={handleTabChange} />

      {isDetailView && detailMatch ? (
        <ProjectDetailContent
          category={detailMatch.params.category as TProjectCategory}
          id={detailMatch.params.id as string}
          onBack={() => navigate(`/?category=${currentCategory}`)}
          data-square-left-corner={isFirstTabActive}
        />
      ) : (
        <>
          {isLoading && (
            <p className="text-muted-foreground">Загрузка проектов...</p>
          )}
          {!isLoading && error && (
            <p className="text-destructive">
              Не удалось загрузить проекты: {error}
            </p>
          )}
          {!isLoading && !error && (
            <div
              className="projects-viewer__grid"
              data-square-left-corner={isFirstTabActive}
            >
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${currentCategory}/${p.id}`}
                  className="projects-viewer__item"
                >
                  <img
                    src={p.thumbnail_url}
                    alt=""
                    className="projects-viewer__thumb"
                  />
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
