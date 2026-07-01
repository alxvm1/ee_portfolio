import {
  useAdminProjectsList,
  type TAnyProject,
  type TProjectCategory,
} from "@entities/Project";
import { Badge, Button, Card, CardContent } from "@shared/ui";
import { type FC } from "react";
import EyeIcon from "@shared/assets/svg/common/eyeIcon.svg?react";
import ClosedEyeIcon from "@shared/assets/svg/common/closedEyeIcon.svg?react";
import "./style.css";

type TProjectsListProps = {
  category: TProjectCategory;
};

const getProjectLabel = (project: TAnyProject) =>
  "title" in project ? project.title : `Проект ${project.id.slice(0, 8)}`;

export const ProjectsList: FC<TProjectsListProps> = ({ category }) => {
  const {
    data: projects,
    isLoading,
    error,
    moveProject,
    deleteProjectItem,
    togglePublish,
  } = useAdminProjectsList(category);

  const handleDelete = (project: TAnyProject) => {
    if (!confirm(`Удалить "${getProjectLabel(project)}"?`)) return;
    deleteProjectItem(project.id);
  };

  return (
    <div className="projects-list">
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && error && <p>Не удалось загрузить проекты: {error}</p>}
      {!isLoading && !error && projects.length === 0 && (
        <p>В этой категории пока нет проектов</p>
      )}
      {!isLoading &&
        !error &&
        projects.map((project, index) => (
          <Card key={project.id} className="w-full">
            <CardContent className="projects-list__item">
              <div className="projects-list__item-info">
                <img
                  src={project.thumbnail_url}
                  alt=""
                  className="projects-list__thumb"
                />
                <div className="projects-list__item-meta">
                  <span className="projects-list__item-title">
                    {getProjectLabel(project)}
                  </span>
                  {!project.is_published && (
                    <Badge variant="outline">скрыт</Badge>
                  )}
                </div>
              </div>

              <div className="projects-list__controls">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    togglePublish(project.id, project.is_published)
                  }
                  aria-label={
                    project.is_published ? "Скрыть проект" : "Показать проект"
                  }
                >
                  {project.is_published ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <ClosedEyeIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => moveProject(index, "up")}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={index === projects.length - 1}
                  onClick={() => moveProject(index, "down")}
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(project)}
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
