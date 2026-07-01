export interface IBaseProject {
  id: string;
  thumbnail_url: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUiDesignProject extends IBaseProject {
  mobile_pdf_url: string;
  desktop_pdf_url: string;
}

export interface IGraphicDesignProject extends IBaseProject {
  images: string[];
  title: string;
  description: string;
  materials: string | null;
  behance_url: string | null;
  dribbble_url: string | null;
}

export interface IIllustrationProject extends IBaseProject {
  images: string[];
  title: string;
  description: string;
  materials: string | null;
  behance_url: string | null;
  dribbble_url: string | null;
}

export type TAnyProject =
  | IUiDesignProject
  | IGraphicDesignProject
  | IIllustrationProject;

export type TProjectCategory = "uiDesign" | "graphicDesign" | "illustrations";
