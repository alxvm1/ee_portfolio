import { LoginForm, signOut, useSession } from "@features/Auth";
import type { TProjectCategory } from "@entities/Project";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { Button } from "@shared/ui";
import { type FC, useState } from "react";
import { ProjectsList } from "./ui/ProjectsList";
import { TextProjectForm } from "./ui/TextProjectForm";
import { PdfProjectForm } from "./ui/PdfProjectForm";
import "./style.css";

const isTextCategory = (
  category: TProjectCategory,
): category is "graphicDesign" | "illustrations" =>
  category === "graphicDesign" || category === "illustrations";

const AdminPanel: FC = () => {
  const [activeTab, setActiveTab] = useState<TProjectCategory>(
    TABS_CONFIG[0].value,
  );

  const [isCreating, setIsCreating] = useState(false);
  const [listKey, setListKey] = useState(0);

  const handleTabChange = (category: TProjectCategory) => {
    setActiveTab(category);
    setIsCreating(false);
  };

  const handleCreated = () => {
    setIsCreating(false);
    setListKey((key) => key + 1);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1 className="admin-panel__title">Управление проектами</h1>
        <Button
          className="admin-panel__exit-button"
          variant="outline"
          onClick={() => signOut()}
        >
          Выйти
        </Button>
      </div>

      <div className="admin-panel__tabs">
        {TABS_CONFIG.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`admin-panel__tab${activeTab === tab.value ? " admin-panel__tab--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!isCreating && (
        <Button
          className="admin-panel__create-button"
          onClick={() => setIsCreating(true)}
        >
          + Добавить проект
        </Button>
      )}

      {isCreating ? (
        isTextCategory(activeTab) ? (
          <TextProjectForm category={activeTab} onCreated={handleCreated} />
        ) : (
          <PdfProjectForm onCreated={handleCreated} />
        )
      ) : (
        <ProjectsList key={listKey} category={activeTab} />
      )}
    </div>
  );
};

export const AdminPage: FC = () => {
  const { session, isLoading } = useSession();

  if (isLoading) return null;

  return session ? <AdminPanel /> : <LoginForm />;
};
