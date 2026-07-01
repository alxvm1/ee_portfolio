import { projectModel } from "@entities/Project";
import { homePageModel } from "../../model";
import { ProjectsTabs, TABS_CONFIG } from "@widgets/ProjectsTabs";
import { useUnit } from "effector-react";
import { type FC, useEffect } from "react";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { ProjectDetailContent } from "../ProjectDetailContent";
import type { TProjectCategory } from "@entities/Project";
import "./style.css";
import { isProjectCategory } from "../../lib/isProjectCategory";
import { getGridStatus } from "../../lib/getGridStatus";

export const ProjectsViewer: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailMatch = useMatch("/project/:category/:id");
  const isDetailView = Boolean(detailMatch);
  const detailCategory = detailMatch?.params.category;

  const [activeTab, projects, isLoading, error] = useUnit([
    homePageModel.stores.$activeCategory,
    projectModel.stores.$projects,
    projectModel.stores.$isProjectsLoading,
    projectModel.stores.$projectsError,
  ]);

  const [homePageMounted, categorySelected] = useUnit([
    homePageModel.events.homePageMounted,
    homePageModel.events.categorySelected,
  ]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    homePageMounted({
      initialCategory: isProjectCategory(categoryFromUrl)
        ? categoryFromUrl
        : undefined,
    });
  }, [homePageMounted, searchParams]);

  const currentCategory: TProjectCategory =
    isDetailView && isProjectCategory(detailCategory ?? null)
      ? (detailCategory as TProjectCategory)
      : activeTab;

  const isFirstTabActive = currentCategory === TABS_CONFIG[0].value;

  const handleTabChange = (category: TProjectCategory) => {
    categorySelected(category);
    if (isDetailView) {
      navigate(`/?category=${category}`);
    }
  };

  if (isDetailView && detailMatch) {
    return (
      <div className="projects-viewer__wrapper">
        <ProjectsTabs active={currentCategory} onChange={handleTabChange} />
        <ProjectDetailContent
          category={detailMatch.params.category as TProjectCategory}
          id={detailMatch.params.id as string}
          onBack={() => navigate(`/?category=${currentCategory}`)}
          data-square-left-corner={isFirstTabActive}
        />
      </div>
    );
  }

  const status = getGridStatus(error, projects.length, isLoading);

  return (
    <div className="projects-viewer__wrapper">
      <ProjectsTabs active={currentCategory} onChange={handleTabChange} />

      {status === "error" && (
        <p className="text-destructive">
          Не удалось загрузить проекты: {error}
        </p>
      )}

      {status !== "error" && (
        <div
          className="projects-viewer__grid"
          data-square-left-corner={isFirstTabActive}
          data-is-loading={isLoading}
          data-is-empty={status === "empty"}
        >
          {status === "hasProjects" &&
            projects.map((p) => (
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

          {status === "empty" && (
            <p className="projects-viewer__empty">
              В выбранной категории нет проектов
            </p>
          )}
        </div>
      )}
    </div>
  );
};
